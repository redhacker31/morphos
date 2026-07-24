import * as XLSX from "xlsx";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// Vite resolves the worker as a URL string at build time.
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { AppASTPayload } from "@/features/renderer/schema/astSchema";

GlobalWorkerOptions.workerSrc = workerUrl as string;

export type ParsedFileType = "spreadsheet" | "pdf";

export interface ParsedFile {
  fileName: string;
  fileType: ParsedFileType;
  /** Tabular data (spreadsheet only). */
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  numericColumns: string[];
  /** Extracted text (PDF only). */
  text?: string;
  /** Compact, LLM-ready description of the file contents. */
  summary: string;
}

function detectFileType(file: File): ParsedFileType {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") return "pdf";
  return "spreadsheet";
}

function isNumeric(value: unknown): boolean {
  if (typeof value === "number") return isFinite(value);
  if (typeof value !== "string") return false;
  const s = value.replace(/[$,€£%\s]/g, "");
  return s !== "" && isFinite(Number(s));
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const s = value.replace(/[$,€£%\s]/g, "");
    const n = Number(s);
    return isFinite(n) ? n : 0;
  }
  return 0;
}

async function parseSpreadsheet(file: File): Promise<ParsedFile> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
  });

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const numericColumns = columns.filter((col) => {
    const sample = rows.slice(0, 25);
    const filled = sample.filter((r) => r[col] !== "" && r[col] != null);
    if (filled.length === 0) return false;
    const numericCount = filled.filter((r) => isNumeric(r[col])).length;
    return numericCount / filled.length >= 0.7;
  });

  const sampleRows = rows.slice(0, 5);
  const summary = [
    `Spreadsheet "${file.name}" with ${rows.length} row(s) and ${columns.length} column(s).`,
    `Columns: ${columns.join(", ")}.`,
    numericColumns.length
      ? `Numeric columns: ${numericColumns.join(", ")}.`
      : "No clearly numeric columns detected.",
    `Sample rows (JSON):\n${JSON.stringify(sampleRows, null, 2)}`,
  ].join("\n");

  return {
    fileName: file.name,
    fileType: "spreadsheet",
    columns,
    rows,
    rowCount: rows.length,
    numericColumns,
    summary,
  };
}

async function parsePdf(file: File): Promise<ParsedFile> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise;
  const maxPages = Math.min(pdf.numPages, 20);
  let text = "";
  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? (item as { str: string }).str : ""))
      .join(" ");
    text += pageText + "\n";
  }
  text = text.trim();
  const excerpt = text.slice(0, 3000);
  const summary = [
    `PDF document "${file.name}" with ${pdf.numPages} page(s).`,
    `Extracted text (first ${excerpt.length} characters):\n${excerpt}`,
  ].join("\n");

  return {
    fileName: file.name,
    fileType: "pdf",
    columns: [],
    rows: [],
    rowCount: 0,
    numericColumns: [],
    text,
    summary,
  };
}

/** Parse an uploaded file into a structured, LLM-ready result. */
export async function parseFile(file: File): Promise<ParsedFile> {
  const type = detectFileType(file);
  return type === "pdf" ? parsePdf(file) : parseSpreadsheet(file);
}

/**
 * Inject the real parsed file data into a generated AST so the rendered
 * dashboard reflects the uploaded file (table rows + chart from a numeric
 * column). Falls back to the original AST for PDFs (text already in prompt).
 */
export function injectFileData(
  ast: AppASTPayload,
  parsed: ParsedFile
): AppASTPayload {
  if (parsed.fileType !== "spreadsheet" || parsed.rows.length === 0) {
    return ast;
  }

  const tableRows = parsed.rows.slice(0, 50);
  const columns = parsed.columns;
  const numericCol = parsed.numericColumns[0];
  const labelCol = columns[0];

  const chartData = numericCol
    ? parsed.rows.slice(0, 12).map((r, i) => ({
        name: String(r[labelCol] ?? `Row ${i + 1}`),
        value: toNumber(r[numericCol]),
      }))
    : [];

  return {
    ...ast,
    meta: {
      ...ast.meta,
      title: ast.meta?.title || parsed.fileName,
    },
    nodes: ast.nodes.map((node) => {
      if (node.type === "data-table") {
        return {
          ...node,
          props: {
            ...node.props,
            data: tableRows,
            config: {
              ...(node.props?.config ?? {}),
              columns,
            },
          },
        };
      }
      if (
        (node.type === "bar-chart" || node.type === "line-chart") &&
        chartData.length > 0
      ) {
        return {
          ...node,
          props: {
            ...node.props,
            data: chartData,
            config: {
              ...(node.props?.config ?? {}),
              xAxisKey: "name",
              yAxisKey: "value",
            },
          },
        };
      }
      return node;
    }),
  };
}
