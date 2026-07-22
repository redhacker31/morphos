import { ASTValidator } from "../schema/astValidator";
import { ASTNormalizer } from "../schema/astNormalizer";
import { ASTTraversalEngine } from "../core/astTraversal";
import { WidgetRegistry } from "../registry/widgetRegistry";
import { PipelineOrchestrator } from "../core/pipeline";
import { SALES_CRM_AST } from "../samples/salesCrmAst";

/**
 * MorphOS Dynamic Renderer Self-Checking Verification Suite
 */
export function runRendererTestSuite(): { passed: boolean; testCount: number; failures: string[] } {
  const failures: string[] = [];
  let testCount = 0;

  function assert(condition: boolean, testName: string) {
    testCount++;
    if (!condition) {
      failures.push(`Assertion failed in: ${testName}`);
    }
  }

  // Test 1: ASTValidator
  const valResult = ASTValidator.validate(SALES_CRM_AST);
  assert(valResult.isValid === true, "ASTValidator valid payload check");
  assert(valResult.errors.length === 0, "ASTValidator zero errors check");

  // Test 2: ASTValidator Invalid Payload
  const invalidVal = ASTValidator.validate({ meta: {} });
  assert(invalidVal.isValid === false, "ASTValidator invalid payload check");

  // Test 3: ASTNormalizer
  const rawAst: any = {
    version: "1.0.0",
    meta: { title: "Test App", theme: "dark-glass" },
    layout: { type: "grid", columns: 12, gap: 16 },
    nodes: [
      {
        id: "00000000-0000-0000-0000-000000000001",
        type: "metric-card",
      },
    ],
  };
  const normalized = ASTNormalizer.normalize(rawAst);
  assert(normalized.nodes[0].title === "Untitled Widget", "ASTNormalizer title repair");
  assert(normalized.nodes[0].gridPosition?.w === 6, "ASTNormalizer grid w default");

  // Test 4: ASTTraversalEngine
  const mockNode: any = {
    id: "root",
    type: "container",
    children: [
      { id: "child-1", type: "heading" },
      { id: "child-2", type: "metric-card" },
    ],
  };
  const visited: string[] = [];
  ASTTraversalEngine.traverse(mockNode, (n) => visited.push(n.id));
  assert(visited.length === 3, "ASTTraversalEngine node count");

  // Test 5: WidgetRegistry
  const registry = WidgetRegistry.getInstance();
  assert(registry.has("bar-chart") === true, "WidgetRegistry bar-chart check");
  assert(registry.has("metric-card") === true, "WidgetRegistry metric-card check");

  // Test 6: PipelineOrchestrator
  const pipeline = PipelineOrchestrator.execute(SALES_CRM_AST);
  assert(pipeline.success === true, "PipelineOrchestrator success check");

  return {
    passed: failures.length === 0,
    testCount,
    failures,
  };
}
