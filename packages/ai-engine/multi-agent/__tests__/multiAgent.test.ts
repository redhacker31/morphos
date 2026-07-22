import { AgentRegistry } from "../registry/agentRegistry";
import { TaskPlanner } from "../planner/taskPlanner";
import { SharedContextEngine } from "../context/sharedContextEngine";
import { AgentBus } from "../communication/agentBus";
import { MemoryManager } from "../memory/memoryManager";
import { ConsensusEngine } from "../consensus/consensusEngine";
import { AgentOrchestrator } from "../orchestrator/agentOrchestrator";
import { AgentDiagnosticsEngine } from "../diagnostics/agentDiagnostics";
import { SALES_CRM_AST } from "../../renderer/samples/salesCrmAst";
import type { AppASTPayload } from "../../renderer/schema/astSchema";

export async function runMultiAgentTestSuite(): Promise<{ passed: boolean; testCount: number; failures: string[] }> {
  const failures: string[] = [];
  let testCount = 0;

  function assert(condition: boolean, testName: string) {
    testCount++;
    if (!condition) {
      failures.push(`Assertion failed in: ${testName}`);
    }
  }

  const baseAst: AppASTPayload = JSON.parse(JSON.stringify(SALES_CRM_AST));

  // Test 1: AgentRegistry
  const agents = AgentRegistry.listAll();
  assert(agents.length === 10, "AgentRegistry registered all 10 specialized AI agents");
  assert(AgentRegistry.get("ApplicationPlanner") !== undefined, "AgentRegistry get ApplicationPlanner");
  assert(AgentRegistry.get("PatchReviewer") !== undefined, "AgentRegistry get PatchReviewer");

  // Test 2: TaskPlanner Subtask Decomposition
  const subtasks = TaskPlanner.planGoal("Convert CRM dashboard into sidebar layout with Cyberpunk theme and customer table");
  assert(subtasks.length >= 3, "TaskPlanner goal decomposition check");
  assert(subtasks[0].assignedRole === "ApplicationPlanner", "TaskPlanner initial planner subtask");

  // Test 3: SharedContextEngine & AgentBus
  const contextEngine = new SharedContextEngine("Test Goal", baseAst);
  const bus = new AgentBus();

  let messageReceived = false as boolean;
  bus.subscribe((msg) => {
    if (msg.senderRole === "ApplicationPlanner") {
      messageReceived = true;
    }
  });

  bus.publish({
    id: "msg-1",
    senderRole: "ApplicationPlanner",
    recipientRole: "ALL",
    timestamp: Date.now(),
    messageType: "PROPOSAL",
    content: "Test message",
    confidence: 0.95,
  });

  assert(messageReceived, "AgentBus pub/sub messaging check");

  // Test 4: MemoryManager
  const memory = new MemoryManager();
  memory.recordMemory("architecture", "Adopted AST-OT collaboration model", ["architecture"]);
  assert(memory.getMemories("architecture").length === 1, "MemoryManager record and query");

  // Test 5: ConsensusEngine Multi-Agent Voting
  const consensus = await ConsensusEngine.evaluateProposals(
    [
      {
        id: "st-1",
        title: "Layout Edit",
        assignedRole: "LayoutArchitect",
        status: "completed",
        inputPrompt: "Switch layout",
        dependencies: [],
        outputPatches: [{ id: "p1", op: "UpdateTheme", newTheme: "cyberpunk-neon", description: "Apply cyberpunk" }],
      },
    ],
    contextEngine
  );
  assert(consensus.approved === true, "ConsensusEngine multi-agent voting approval");
  assert(consensus.approvalRatio > 0.7, "ConsensusEngine approval ratio threshold");

  // Test 6: AgentOrchestrator End-to-End Pipeline Execution
  const pipelineRes = await AgentOrchestrator.runGoal(
    "Convert layout to sidebar with Cyberpunk Neon theme",
    baseAst,
    { memoryManager: memory }
  );

  assert(pipelineRes.success === true, "AgentOrchestrator end-to-end execution success");
  assert(pipelineRes.updatedAst !== null, "AgentOrchestrator AST payload output");
  assert(pipelineRes.consensus.approved === true, "AgentOrchestrator consensus approval check");
  assert(pipelineRes.documentation.releaseNotes.length > 0, "AgentOrchestrator release notes generation");

  // Test 7: AgentDiagnosticsEngine
  const telemetry = AgentDiagnosticsEngine.evaluateTelemetry(pipelineRes);
  assert(telemetry.status === "OPTIMAL", "AgentDiagnosticsEngine telemetry status check");

  return {
    passed: failures.length === 0,
    testCount,
    failures,
  };
}
