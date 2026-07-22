import { ApplicationAnalyzer } from "../analyzer/appAnalyzer";
import { ContextEngine } from "../context/contextEngine";
import { IntentRecognizer } from "../intent/intentRecognizer";
import { ASTDiffPlanner } from "../planner/diffPlanner";
import { PatchValidator } from "../patcher/patchValidator";
import { PatchRepairEngine } from "../patcher/patchRepairEngine";
import { PatchApplier } from "../patcher/patchApplier";
import { HistoryManager } from "../history/historyManager";
import { UndoRedoEngine } from "../history/undoRedoEngine";
import { VersionComparer } from "../history/versionComparer";
import { SnapshotManager } from "../snapshots/snapshotManager";
import { EvolutionPipeline } from "../pipeline/evolutionPipeline";
import { SALES_CRM_AST } from "../../renderer/samples/salesCrmAst";
import type { AppASTPayload } from "../../renderer/schema/astSchema";

export async function runAIEvolutionTestSuite(): Promise<{ passed: boolean; testCount: number; failures: string[] }> {
  const failures: string[] = [];
  let testCount = 0;

  function assert(condition: boolean, testName: string) {
    testCount++;
    if (!condition) {
      failures.push(`Assertion failed in: ${testName}`);
    }
  }

  const baseAst: AppASTPayload = JSON.parse(JSON.stringify(SALES_CRM_AST));

  // Test 1: ApplicationAnalyzer
  const analysis = ApplicationAnalyzer.analyze(baseAst);
  assert(analysis.nodeCount > 0, "ApplicationAnalyzer nodeCount check");
  assert(analysis.layoutType === "dashboard", "ApplicationAnalyzer layoutType check");

  // Test 2: IntentRecognizer
  const intentTheme = IntentRecognizer.recognize("Switch theme to Cyberpunk Neon");
  assert(intentTheme.operation === "update-theme", "IntentRecognizer theme recognition");

  const intentMove = IntentRecognizer.recognize("Move the KPI cards above the chart");
  assert(intentMove.operation === "move-node", "IntentRecognizer move recognition");

  const intentReplace = IntentRecognizer.recognize("Replace the pie chart with a bar chart");
  assert(intentReplace.operation === "replace-widget", "IntentRecognizer replace recognition");

  // Test 3: ContextEngine
  const contextEngine = new ContextEngine();
  const resolved = contextEngine.resolveReference("Replace that chart", baseAst);
  assert(resolved.targetNodeId !== undefined, "ContextEngine target resolution");

  // Test 4: ASTDiffPlanner & PatchApplier (Theme Update)
  const themePlan = ASTDiffPlanner.planDiff("Switch the application to Cyberpunk Neon", baseAst, intentTheme, resolved);
  const themeAst = PatchApplier.applyPatches(baseAst, themePlan.proposedPatches);
  assert(themeAst.meta.theme === "cyberpunk-neon", "PatchApplier theme update result");

  // Test 5: ASTDiffPlanner & PatchApplier (Widget Replacement)
  const replacePlan = ASTDiffPlanner.planDiff("Replace the pie chart with a bar chart", baseAst, intentReplace, resolved);
  const replaceAst = PatchApplier.applyPatches(baseAst, replacePlan.proposedPatches);
  assert(replaceAst.nodes.some((n) => n.type === "bar-chart"), "PatchApplier widget replacement result");

  // Test 6: PatchValidator & PatchRepairEngine
  const invalidPatch: any = { id: "p1", op: "ReplaceWidget", targetNodeId: "invalid-id", replacementWidgetType: "unknown-widget" };
  const val = PatchValidator.validatePatch(invalidPatch, baseAst);
  assert(val.isValid === false, "PatchValidator invalid patch detection");

  const repair = PatchRepairEngine.repairPatches([invalidPatch], baseAst);
  assert(repair.success === true, "PatchRepairEngine auto-repair success");

  // Test 7: UndoRedoEngine
  const undoRedo = new UndoRedoEngine(baseAst);
  undoRedo.pushState(themeAst);
  assert(undoRedo.canUndo() === true, "UndoRedoEngine canUndo check");

  const undoneAst = undoRedo.undo();
  assert(undoneAst?.meta.theme === baseAst.meta.theme, "UndoRedoEngine undo state restoration");

  const redoneAst = undoRedo.redo();
  assert(redoneAst?.meta.theme === "cyberpunk-neon", "UndoRedoEngine redo state restoration");

  // Test 8: HistoryManager & VersionComparer
  const historyMgr = new HistoryManager(baseAst);
  historyMgr.recordVersion("Switch theme", themePlan.proposedPatches, themeAst, ["Updated theme"]);
  assert(historyMgr.getHistory().length === 2, "HistoryManager history logging check");

  const diffSummary = VersionComparer.compare(baseAst, themeAst);
  assert(diffSummary.themeChanged === true, "VersionComparer theme change detection");

  // Test 9: SnapshotManager
  const snapshotMgr = new SnapshotManager();
  const snap = snapshotMgr.createSnapshot("Pre-Edit Baseline", baseAst);
  assert(snap.name === "Pre-Edit Baseline", "SnapshotManager snapshot creation");
  const restored = snapshotMgr.restoreSnapshot(snap.id);
  assert(restored?.meta.theme === baseAst.meta.theme, "SnapshotManager snapshot restoration");

  // Test 10: EvolutionPipeline End-to-End Execution
  const pipelineRes = await EvolutionPipeline.evolve("Convert the dashboard into a sidebar layout", baseAst);
  assert(pipelineRes.success === true, "EvolutionPipeline execution success");
  assert(pipelineRes.updatedAst?.layout.type === "sidebar-main", "EvolutionPipeline layout evolution");
  assert(pipelineRes.explanation.length > 0, "EvolutionPipeline natural language explanation generation");

  return {
    passed: failures.length === 0,
    testCount,
    failures,
  };
}
