# MorphOS: Phase 5 Real-Time Collaboration Engine Architecture

**Document Version:** 1.0.0-ENTERPRISE-FROZEN  
**Status:** APPROVED & PERMANENTLY LOCKED  
**Author:** Chief Distributed Systems Architect, Principal Collaboration Engineer, Principal AI Systems Architect, Technical Lead  
**Target Repository:** `MorphOS`  

---

## 1. Executive Summary

Phase 5 (Real-Time Collaboration Engine) for MorphOS enables multi-user concurrent co-creation, editing, reviewing, and commenting on applications in real time.

All real-time synchronization is driven exclusively by structured AST patch operations (`ASTPatchOperation[]`). **No React components, HTML strings, or DOM states are ever transmitted over the network.**

```
User A
  ↓ (AST Patch Operation: Move / UpdateProps / InsertNode)
Collaboration Gateway & Session Manager
  ↓
Presence Engine & Live Cursor Broadcaster
  ↓
AST Operational Transformation (AST-OT) Conflict Resolution Engine
  ↓
Patch Synchronization Engine
  ↓
Shared AppSchemaAST (JSON Blueprint)
  ↓
Dynamic Renderer (Phase 2 Execution Engine)
  ↓
All Connected Peer Clients
```

---

## 2. Architectural Decision Record (ADR): AST Operational Transformation (AST-OT)

### Decision Context
MorphOS requires a deterministic real-time synchronization model to reconcile concurrent modifications from multiple human collaborators and AI Evolution streams. We evaluated **CRDTs (Conflict-free Replicated Data Types)** versus **Operational Transformation (OT)**.

### Selected Model: AST-OT (Operational Transformation for Structured Tree Patches)
MorphOS formally adopts **AST Operational Transformation (AST-OT)** as the single, platform-wide real-time collaboration model.

#### Architectural Rationale:
1. **Patch-Centric Alignment:** MorphOS Phase 3 (AI Generation) and Phase 4 (AI Evolution) natively emit structured atomic patches (`InsertNode`, `DeleteNode`, `MoveNode`, `ReplaceWidget`, `UpdateProps`, `UpdateTheme`, `UpdateLayout`). AST-OT transforms these structured operations directly ($P_A' = \text{Transform}(P_A, P_B)$) to guarantee tree convergence:
   $$T \circ P_A \circ P_B' = T \circ P_B \circ P_A'$$
2. **Strict Schema & Semantic Integrity:** Text-based CRDTs can produce syntactically malformed JSON trees under concurrent structural moves/deletions. AST-OT explicitly enforces Zod `AppSchemaAST` validation rules during transformation, guaranteeing that invalid widget types or orphan node references are rejected before reaching the Dynamic Renderer.
3. **Reversibility & Multi-User Undo:** AST-OT enables precise multi-user undo stacks where a peer can invert their own patch sequence ($P_A^{-1}$) without clobbering concurrent peer edits ($P_B$).

---

## 3. Module Specifications

### 3.1 Collaboration Sessions & Session Manager (`session/sessionManager.ts`)
- Manages room lifecycle: create session, join session, leave session, reconnect, restore session, and track active room participants.

### 3.2 Presence Engine & Live Cursors (`presence/`)
- **`PresenceEngine`**: Tracks connected users, assigned peer colors, active widget selection, and idle/editing status.
- **`LiveCursorSelection`**: Broadcasts $(x, y)$ mouse coordinates and widget selection outlines across peers.

### 3.3 Patch Synchronization & Conflict Resolution (`sync/` & `conflict/`)
- **`PatchSyncEngine`**: Synchronizes atomic AST patches over real-time sessions.
- **`ConflictResolver`**: Implements AST-OT transformation rules to merge non-overlapping properties, resolve deletion vs update conflicts, and maintain deterministic tree state.

### 3.4 Comments & Activity Timeline (`comments/` & `timeline/`)
- **`CommentsEngine`**: Attaches review comments and threaded discussion replies to specific `AppSchemaAST` node IDs.
- **`ActivityTimeline`**: Logs real-time activity events (patch executions, peer join/leave, comments, undo/redo).

### 3.5 Permissions Layer (`permissions/permissionsLayer.ts`)
- Enforces Role-Based Access Control (RBAC):
  - **Owner**: Full edit, comment, snapshot restore, and role assignment rights.
  - **Editor**: Full AST edit and comment rights.
  - **Reviewer**: Comment and review thread rights; AST edits blocked.
  - **Viewer**: Read-only access; AST edits and comments blocked.

### 3.6 Collaboration Diagnostics (`diagnostics/collaborationDiagnostics.ts`)
- Monitors real-time peer telemetry: sync latency, patch throughput, conflict counts, failed messages, and connection health.
