# MorphOS: Convex Backend Specification

**Status:** Approved for MVP
**Optimization:** Built for Hackathon Velocity (No unnecessary enterprise complexity).

---

## 1. Database Schema

### `applications`
- **Fields:** `_id`, `title` (string), `workspaceId` (string), `currentVersionId` (id("schemas"))
- **Indexes:** `by_workspace`

### `schemas`
- **Fields:** `_id`, `appId` (id("applications")), `version` (number), `ast_payload` (any/JSON)
- **Indexes:** `by_app_id`

### `messages`
- **Fields:** `_id`, `appId` (id("applications")), `role` ("user" | "ai"), `content` (string), `timestamp` (number)
- **Indexes:** `by_app_time`

---

## 2. Convex Functions (Queries & Mutations)

### `generateApplication(prompt: string)`
- **Type:** Action
- **Purpose:** Calls OpenAI, gets JSON AST, creates new `application` and `schema`.
- **Returns:** `appId`
- **Security:** Requires valid JWT.

### `updateApplication(appId: string, prompt: string)`
- **Type:** Action
- **Purpose:** Modifies existing app. Calls OpenAI with current AST context, saves new `schema` row, updates `currentVersionId`.
- **Returns:** `newVersionId`
- **Validation:** Fails if `appId` doesn't exist.

### `getApplication(appId: string)`
- **Type:** Query
- **Purpose:** Realtime subscription for the frontend to receive the latest AST.
- **Returns:** `{ application, currentSchema, messages }`
- **Realtime Behavior:** Pushes state instantly to Next.js whenever `currentVersionId` or `schemas` change.

### `sendMessage(appId: string, content: string, role: string)`
- **Type:** Mutation
- **Purpose:** Appends chat history.
- **Returns:** `messageId`

---

## 3. Realtime & Permissions
- **Realtime:** Entirely managed by Convex `useQuery`.
- **Permissions:** For MVP, simple Auth check (`ctx.auth.getUserIdentity()`). Complex RBAC is omitted for hackathon velocity.
- **Versioning:** Implicit. Every AI modification creates a new `schemas` row, meaning rollback is just updating the `currentVersionId` pointer on the `applications` table.
