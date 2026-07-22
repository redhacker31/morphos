import { ASTValidator } from "../features/renderer/schema/astValidator";
import { INVENTORY_MANAGEMENT_AST } from "../features/renderer/samples/inventoryManagementAst";
import { ADMIN_DASHBOARD_AST } from "../features/renderer/samples/adminDashboardAst";

console.log("=== INVENTORY_MANAGEMENT_AST Validation ===");
const r1 = ASTValidator.validate(INVENTORY_MANAGEMENT_AST);
console.log("Valid:", r1.isValid);
if (!r1.isValid) console.log("Errors:", JSON.stringify(r1.errors, null, 2));

console.log("\n=== ADMIN_DASHBOARD_AST Validation ===");
const r2 = ASTValidator.validate(ADMIN_DASHBOARD_AST);
console.log("Valid:", r2.isValid);
if (!r2.isValid) console.log("Errors:", JSON.stringify(r2.errors, null, 2));

// Test PromptParser for 'employee'
import { PromptParser } from "../features/ai-generator/pipeline/promptParser";
console.log("\n=== PromptParser 'employee' ===");
const r3 = PromptParser.parse("Create an employee performance portal");
console.log("Domain:", r3.domain);

// Test repair with empty nodes
import { ASTRepairEngine } from "../features/ai-generator/pipeline/astRepairEngine";
console.log("\n=== ASTRepairEngine with empty nodes ===");
const r4 = ASTRepairEngine.repair({ meta: { title: "Test" }, layout: { type: "dashboard", columns: 12, gap: 16 }, nodes: [] });
console.log("Success:", r4.success);
console.log("Errors:", r4.errors);
