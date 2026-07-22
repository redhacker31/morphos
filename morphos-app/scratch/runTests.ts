import { runAIGeneratorTestSuite } from "../features/ai-generator/__tests__/aiGenerator.test";
import { runGoldenAstSnapshotsTest } from "../features/ai-generator/__tests__/goldenAstSnapshots.test";
import { EvalBenchmarkEngine } from "../features/ai-generator/library/evalBenchmark";
import { runAIEvolutionTestSuite } from "../features/ai-evolution/__tests__/aiEvolution.test";
import { runCollaborationTestSuite } from "../features/collaboration/__tests__/collaboration.test";
import { runMultiAgentTestSuite } from "../features/multi-agent/__tests__/multiAgent.test";

async function main() {
  console.log("=== Phase 3: AI Generation Engine Test Suite ===");
  const unitResults = runAIGeneratorTestSuite();
  console.log(`Unit Tests Passed: ${unitResults.passed}`);
  console.log(`Total Assertions: ${unitResults.testCount}`);
  if (unitResults.failures.length > 0) {
    console.error("Failures:", unitResults.failures);
  }

  console.log("\n=== Phase 3: Golden AST Snapshots Test ===");
  const goldenResults = await runGoldenAstSnapshotsTest();
  console.log(`Golden Snapshots Passed: ${goldenResults.passed}`);
  console.log(`Evaluated Corpus Items: ${goldenResults.count}`);
  if (goldenResults.failures.length > 0) {
    console.error("Failures:", goldenResults.failures);
  }

  console.log("\n=== Phase 3: Benchmark Evaluation Suite ===");
  const benchResults = await EvalBenchmarkEngine.runBenchmark();
  console.log(`Benchmark Passed: ${benchResults.passed}`);
  console.log(`Total Prompts: ${benchResults.totalPrompts}`);
  console.log(`Successful Generations: ${benchResults.successfulGenerations}`);
  console.log(`Average Generation Time: ${benchResults.averageGenerationTimeMs}ms`);
  console.log(`Average Confidence Score: ${benchResults.averageConfidenceScore}`);

  console.log("\n=== Phase 4: AI Application Evolution Engine Test Suite ===");
  const evolutionResults = await runAIEvolutionTestSuite();
  console.log(`Phase 4 Evolution Tests Passed: ${evolutionResults.passed}`);
  console.log(`Total Assertions: ${evolutionResults.testCount}`);
  if (evolutionResults.failures.length > 0) {
    console.error("Failures:", evolutionResults.failures);
  }

  console.log("\n=== Phase 5: Real-Time Collaboration Engine Test Suite ===");
  const collabResults = await runCollaborationTestSuite();
  console.log(`Phase 5 Collaboration Tests Passed: ${collabResults.passed}`);
  console.log(`Total Assertions: ${collabResults.testCount}`);
  if (collabResults.failures.length > 0) {
    console.error("Failures:", collabResults.failures);
  }

  console.log("\n=== Phase 6: Autonomous Multi-Agent Intelligence Test Suite ===");
  const multiAgentResults = await runMultiAgentTestSuite();
  console.log(`Phase 6 Multi-Agent Tests Passed: ${multiAgentResults.passed}`);
  console.log(`Total Assertions: ${multiAgentResults.testCount}`);
  if (multiAgentResults.failures.length > 0) {
    console.error("Failures:", multiAgentResults.failures);
  }

  const allPassed =
    unitResults.passed &&
    goldenResults.passed &&
    benchResults.passed &&
    evolutionResults.passed &&
    collabResults.passed &&
    multiAgentResults.passed;

  if (allPassed) {
    console.log("\nSUCCESS: All Phase 3, 4, 5, & 6 MorphOS Engine tests passed cleanly!");
    process.exit(0);
  } else {
    console.error("\nFAILURE: Test failures detected.");
    process.exit(1);
  }
}

main();
