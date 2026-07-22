# MorphOS: Architecture Decision Records (ADR)

**Status:** Approved for Hackathon Development
**Author:** MorphOS Architecture Team

This document outlines the core architectural decisions made while building the MorphOS prototype. The focus of these decisions is speed of iteration, demonstration impact, and prototype feasibility over long-term enterprise scalability.

---

## Index
- [ADR 001: Use Next.js App Router](#adr-001-use-nextjs-app-router)
- [ADR 002: Use React](#adr-002-use-react)
- [ADR 003: Use TypeScript](#adr-003-use-typescript)
- [ADR 004: Use Tailwind CSS](#adr-004-use-tailwind-css)
- [ADR 005: Use shadcn/ui](#adr-005-use-shadcnui)
- [ADR 006: Use Framer Motion](#adr-006-use-framer-motion)
- [ADR 007: Use Convex](#adr-007-use-convex)
- [ADR 008: Use JSON AST instead of HTML generation](#adr-008-use-json-ast-instead-of-html-generation)
- [ADR 009: Use Dynamic UI Rendering](#adr-009-use-dynamic-ui-rendering)
- [ADR 010: Use OpenAI Structured Outputs](#adr-010-use-openai-structured-outputs)
- [ADR 011: Use Zod Validation](#adr-011-use-zod-validation)
- [ADR 012: Use Recharts](#adr-012-use-recharts)
- [ADR 013: Use Single AI Orchestrator for MVP](#adr-013-use-single-ai-orchestrator-for-mvp)
- [ADR 014: Use Serverless Architecture](#adr-014-use-serverless-architecture)
- [ADR 015: Use Real-Time Synchronization by Default](#adr-015-use-real-time-synchronization-by-default)

---

## ADR 001: Use Next.js App Router

**Status:** Accepted
**Context:** We need a frontend framework that supports rapid prototyping and easy backend API routing.
**Problem:** Vanilla React requires setting up custom routers and bundlers, slowing down hackathon velocity.
**Decision:** We will use Next.js 15 with the App Router.
**Alternatives Considered:** Vite (SPA), Remix.
**Pros:** 
- Zero-config routing.
- Built-in API routes for webhooks.
- Seamless Vercel deployment.
**Cons:**
- Server Components add slight mental overhead for client-heavy animations.
**Why this decision was selected:** The tight integration with Vercel makes deploying a live hackathon URL instantly possible with zero devops.
**Future Evolution:** Keep for production, leveraging edge caching for public shared dashboards.

---

## ADR 002: Use React

**Status:** Accepted
**Context:** The dynamic UI generation engine needs a way to map abstract state to DOM nodes efficiently.
**Problem:** Direct DOM manipulation (Vanilla JS) is error-prone and hard to animate securely.
**Decision:** We will use React 19.
**Alternatives Considered:** Vue, Svelte.
**Pros:**
- Massive ecosystem (charts, icons, animations).
- Declarative state-driven UI fits perfectly with a JSON AST rendering engine.
**Cons:**
- React DOM diffing can be heavy if the JSON AST becomes massive.
**Why this decision was selected:** The component-based nature of React makes building the `ComponentResolver` trivial.
**Future Evolution:** Optimize heavy widget trees with `React.memo` or React Compiler.

---

## ADR 003: Use TypeScript

**Status:** Accepted
**Context:** The AI generates complex JSON data structures that dictate the entire UI.
**Problem:** Passing untyped JSON from an LLM into React props will cause silent runtime crashes during demos.
**Decision:** We will use strict TypeScript.
**Alternatives Considered:** Vanilla JavaScript.
**Pros:**
- IDE autocomplete catches prop mismatches instantly.
- Zod schemas automatically infer TypeScript types.
**Cons:**
- Slight boilerplate overhead during a fast-paced hackathon.
**Why this decision was selected:** A broken demo is unacceptable. Type safety guarantees that if the app compiles, the renderer won't crash on standard inputs.
**Future Evolution:** Auto-generate TS definitions from the Zod schema AST.

---

## ADR 004: Use Tailwind CSS

**Status:** Accepted
**Context:** MorphOS requires a premium, Apple-like aesthetic with glassmorphism.
**Problem:** Writing custom CSS modules or styled-components takes too much time to structure globally.
**Decision:** We will use Tailwind CSS.
**Alternatives Considered:** CSS Modules, Emotion, SCSS.
**Pros:**
- Ultra-fast styling without leaving the JSX file.
- Easy to map AI-generated layout properties (e.g., `span: 2`) directly to Tailwind classes (`col-span-2`).
**Cons:**
- JSX can become cluttered.
**Why this decision was selected:** Velocity. Tailwind allows us to copy-paste premium UI snippets and rapidly tweak glassmorphism utilities (`backdrop-blur`).
**Future Evolution:** Extract common widget wrappers into custom Tailwind `@apply` classes.

---

## ADR 005: Use shadcn/ui

**Status:** Accepted
**Context:** The app needs professional UI components (modals, dropdowns, inputs) for the surrounding OS shell.
**Problem:** Building accessible, highly polished base components from scratch burns valuable hackathon hours.
**Decision:** We will use shadcn/ui.
**Alternatives Considered:** Chakra UI, MUI, Headless UI.
**Pros:**
- Extreme customizability (components are copied into the repo, not installed as node modules).
- Perfect integration with Tailwind.
**Cons:**
- Initial setup overhead.
**Why this decision was selected:** It gives us Vercel/Linear-level polish out of the box while letting us brutally customize the CSS for our dark-glass theme.
**Future Evolution:** Expand the shadcn components into the dynamic widget library.

---

## ADR 006: Use Framer Motion

**Status:** Accepted
**Context:** A core value prop is that the AI builds the app "before your eyes".
**Problem:** CSS transitions are too rigid for complex, staggered, layout-shifting animations when new widgets are added dynamically.
**Decision:** We will use Framer Motion.
**Alternatives Considered:** React Spring, CSS Animations.
**Pros:**
- `AnimatePresence` makes animating components mounting/unmounting trivial.
- `layoutId` allows smooth reordering of widgets.
**Cons:**
- Adds ~30kb to the JS bundle.
**Why this decision was selected:** The "wow" factor of a hackathon demo relies heavily on physics-based, fluid animations when the AI alters the layout.
**Future Evolution:** Remove heavy variants and use pure CSS for simple hovers to optimize performance.

---

## ADR 007: Use Convex

**Status:** Accepted
**Context:** MorphOS requires a database, API routes, and real-time WebSockets to simulate collaborative editing.
**Problem:** Spinning up Postgres, setting up Prisma, and configuring Socket.io takes 10+ hours and is hard to deploy cleanly.
**Decision:** We will use Convex.
**Alternatives Considered:** Supabase, Firebase, custom Node+Socket.io server.
**Pros:**
- Zero-config real-time out of the box (`useQuery` is instantly reactive).
- Built-in Node.js Actions for securely calling OpenAI APIs.
**Cons:**
- Vendor lock-in.
**Why this decision was selected:** Convex allows a single developer to build a real-time multiplayer backend in minutes, which is exactly what a hackathon demands.
**Future Evolution:** Keep Convex as the core engine; utilize Convex HTTP actions for public webhooks.

---

## ADR 008: Use JSON AST instead of HTML generation

**Status:** Accepted
**Context:** The LLM needs to output a UI structure.
**Problem:** Asking an LLM to output raw React code or HTML introduces immense security risks (XSS) and frequent syntax errors that break the app.
**Decision:** The AI will ONLY generate a JSON Abstract Syntax Tree (AST).
**Alternatives Considered:** Generating HTML strings, generating raw React components.
**Pros:**
- 100% deterministic parsing.
- Impossible to execute malicious JavaScript.
**Cons:**
- Restricts the AI to only using pre-built components in our library.
**Why this decision was selected:** It guarantees the app will not crash during a live demo. We control the renderer; the AI only controls the data.
**Future Evolution:** Allow the AI to output sandboxed CSS to style components further.

---

## ADR 009: Use Dynamic UI Rendering

**Status:** Accepted
**Context:** The frontend must transform the AI's JSON AST into a beautiful UI.
**Problem:** Hardcoding UI limits the generative nature of the OS.
**Decision:** Implement a recursive React rendering engine that maps JSON types to React components.
**Alternatives Considered:** Next.js Server Actions returning JSX.
**Pros:**
- Infinite flexibility.
- Instant client-side updates during real-time multiplayer edits without server roundtrips for HTML.
**Cons:**
- Requires building a custom mapping engine.
**Why this decision was selected:** It completely separates concerns. The AI manages the "state" in Convex; the React client purely observes and renders that state.
**Future Evolution:** Implement a drag-and-drop editor that manually updates the same JSON AST.

---

## ADR 010: Use OpenAI Structured Outputs

**Status:** Accepted
**Context:** The LLM must output the JSON AST perfectly every time.
**Problem:** Standard LLM JSON mode often hallucinates keys, forgets arrays, or wraps JSON in markdown blocks, breaking `JSON.parse`.
**Decision:** We will use OpenAI `gpt-4o` with the new Structured Outputs API.
**Alternatives Considered:** Standard JSON mode + prompt engineering, Anthropic Claude 3.5.
**Pros:**
- Guarantees 100% adherence to our JSON schema.
- Eliminates the need for complex "Repair Agents" during the hackathon.
**Cons:**
- Tied to OpenAI.
**Why this decision was selected:** Reliability is the #1 priority for the demo. Structured Outputs ensure the renderer never receives a corrupted AST.
**Future Evolution:** Support Anthropic Claude with tool-calling as a fallback.

---

## ADR 011: Use Zod Validation

**Status:** Accepted
**Context:** We must ensure the data coming from the database/AI is safe before rendering.
**Problem:** TypeScript only protects compile-time. We need runtime guarantees.
**Decision:** We will use Zod to validate all schemas.
**Alternatives Considered:** Yup, Joi, manual `if` checks.
**Pros:**
- Shared validation schemas between Convex backend and Next.js frontend.
- Infers TypeScript types instantly.
**Cons:**
- Adds slight runtime processing delay.
**Why this decision was selected:** Passing a validated Zod object directly to the Dynamic Renderer ensures zero runtime crashes.
**Future Evolution:** Use Zod schemas to automatically generate OpenAI Structured Output definitions.

---

## ADR 012: Use Recharts

**Status:** Accepted
**Context:** Dashboards require beautiful, animated data visualizations.
**Problem:** Building charts from raw SVG is impossible in a weekend.
**Decision:** We will use Recharts (or Chart.js wrapped in React).
**Alternatives Considered:** D3.js, Chart.js, Visx.
**Pros:**
- Declarative React components (fits our JSON renderer perfectly).
- Handles responsive resizing automatically.
**Cons:**
- Styling is somewhat rigid compared to raw D3.
**Why this decision was selected:** Speed of implementation. Mapping `{ type: "line_chart" }` to a `<LineChart>` component takes 5 lines of code.
**Future Evolution:** Move to raw D3 or Visx for highly bespoke, interactive charts.

---

## ADR 013: Use Single AI Orchestrator for MVP

**Status:** Accepted
**Context:** Processing natural language into a UI schema.
**Problem:** A multi-agent architecture (Intent Agent -> Planner Agent -> Layout Agent) is too complex to orchestrate reliably in a 48-hour hackathon.
**Decision:** We will use a Single AI Orchestrator (one monolithic prompt to `gpt-4o`).
**Alternatives Considered:** Full multi-agent LangChain/AutoGen pipeline.
**Pros:**
- Half the latency (one network call instead of three).
- Much easier to debug.
**Cons:**
- May struggle with highly complex, multi-page app generation requests.
**Why this decision was selected:** Speed and simplicity. For a demo, a single well-crafted system prompt using Structured Outputs is sufficient to generate a dashboard.
**Future Evolution:** Break into the Multi-Agent pipeline defined in the TDD for enterprise scalability.

---

## ADR 014: Use Serverless Architecture

**Status:** Accepted
**Context:** We need to host the application.
**Problem:** Managing containers (Docker) or EC2 instances requires devops work.
**Decision:** Next.js on Vercel + Convex Cloud.
**Alternatives Considered:** AWS EC2, DigitalOcean Droplets.
**Pros:**
- Push-to-deploy.
- Auto-scaling without configuration.
**Cons:**
- Serverless cold starts (mitigated by Convex's always-on WebSockets).
**Why this decision was selected:** We have zero devops engineers. Vercel + Convex handles 100% of the infrastructure.
**Future Evolution:** Dedicated instances if LLM proxying requires long-running background workers.

---

## ADR 015: Use Real-Time Synchronization by Default

**Status:** Accepted
**Context:** Dashboards and schemas are shared among users.
**Problem:** Traditional polling or manual refresh buttons ruin the "magic" of an AI OS.
**Decision:** All queries to the AST will be real-time subscriptions (`useQuery` in Convex).
**Alternatives Considered:** SWR/React Query with 5-second polling.
**Pros:**
- Massive "wow" factor when one user tells the AI to add a chart, and it instantly animates onto a second user's screen.
**Cons:**
- Higher active connection count on the server.
**Why this decision was selected:** The primary value prop of MorphOS is instant, collaborative software. Real-time sync proves this instantly.
**Future Evolution:** Implement full OT (Operational Transformation) or CRDTs for collaborative code editing inside the widgets.

---
*End of ADR Document.*
