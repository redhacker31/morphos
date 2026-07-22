import { PROMPT_CORPUS } from "../library/promptCorpus";
import { StreamingPipeline } from "../pipeline/streamingPipeline";
import { ASTValidator } from "../../renderer/schema/astValidator";

export interface GoldenSnapshotResult {
  passed: boolean;
  count: number;
  failures: string[];
  snapshots: Array<{
    id: string;
    domain: string;
    title: string;
    nodeCount: number;
    layoutType: string;
    theme: string;
  }>;
}

export async function runGoldenAstSnapshotsTest(): Promise<GoldenSnapshotResult> {
  const failures: string[] = [];
  const snapshots: Array<{
    id: string;
    domain: string;
    title: string;
    nodeCount: number;
    layoutType: string;
    theme: string;
  }> = [];

  let count = 0;

  for (const preset of PROMPT_CORPUS) {
    count++;
    const res = await StreamingPipeline.run(preset.prompt);

    if (!res.success || !res.ast) {
      failures.push(`Preset ${preset.id} (${preset.title}) failed pipeline execution`);
      continue;
    }

    const validation = ASTValidator.validate(res.ast);
    if (!validation.isValid) {
      failures.push(`Preset ${preset.id} (${preset.title}) failed AppSchemaAST validation: ${validation.errors.join("; ")}`);
    }

    if (res.ast.nodes.length === 0) {
      failures.push(`Preset ${preset.id} (${preset.title}) produced empty AST nodes array`);
    }

    snapshots.push({
      id: preset.id,
      domain: preset.domain,
      title: res.ast.meta.title,
      nodeCount: res.ast.nodes.length,
      layoutType: res.ast.layout.type,
      theme: res.ast.meta.theme,
    });
  }

  return {
    passed: failures.length === 0,
    count,
    failures,
    snapshots,
  };
}
