# Rebuild MorphOS as a Vite + React + TS app at the workspace root

## Context
Enter's live preview can only run a Vite + React + TypeScript app located at the workspace root. This project's root has **no** `package.json`, `vite.config.ts`, or `index.html`; the only application lives in `apps/frontend/` and runs via `next dev --webpack` (Next.js 16). The dev server therefore has nothing to launch — this is the concrete, reproduced cause of the "failed to start live preview" error, **not** a transient platform issue. You chose to rebuild as a Vite+React+TS project at the root, porting the existing UI/components.

## Approach
Port the existing Next.js frontend (`apps/frontend`) into a single root Vite project under `src/`, swapping Next.js conventions for Vite/React equivalents. Legacy `apps/`, `packages/`, `tests/`, `docs/` stay on disk but are excluded from the root tsconfig/eslint so they never affect the build.

## Already done this turn (scaffolding in place)
- Copied `apps/frontend/{components,features,lib}` → `src/{components,features,lib}`
- Copied `apps/frontend/public` → `public`
- Stripped `"use client"` directives, converted `next/link` → `react-router-dom` `Link`, removed the `@next/next/no-img-element` comment
- Created root: `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `postcss.config.js`, `index.html`, `eslint.config.js`, `components.json`

## Remaining steps
1. Create root `package.json` — Vite 6 + React 19 + Tailwind 3 + framer-motion + lucide-react + radix + zod + react-router-dom + typescript-eslint. (Prior write was blocked by the build-config guard; will retry.)
2. Create root `tailwind.config.ts` — extend original tokens; add the missing `text` color group, `primary.hover/subtle`, `shadow.glow-error`, and `fontFamily.display` so existing classes like `text-text-primary`, `bg-primary-subtle`, `hover:bg-primary-hover`, `font-display` actually resolve.
3. Create `src/index.css` — full design system: `@tailwind base/components/utilities`; all `:root` tokens including the ones components reference but the original CSS lacked (`--primary-hover/subtle/glow/light`, `--success-glow`, `--card-border(-hover)`, `--background-secondary`, `--accent-subtle`, `--destructive`); and component utilities (`.glass`, `.glass-strong`, `.btn-primary`, `.bg-grid`, `.bg-gradient-radial`, `.gradient-text-primary(-animated)`, `.skeleton`, `.scrollbar-none`, `.animate-spin-slow`).
4. Create `src/main.tsx` — mounts `<App/>` inside `BrowserRouter`.
5. Create `src/App.tsx` — routes: `/` → LandingPage, `/workspace/:id` → WorkspacePage, `/design-system` → DesignSystemPage.
6. Create `src/pages/LandingPage.tsx` — from `app/(marketing)/page.tsx` + the marketing layout's Navbar/Footer.
7. Create `src/pages/WorkspacePage.tsx` — from `app/workspace/[id]/page.tsx`, replacing React 19 `use(params)` with react-router `useParams()`.
8. Create `src/pages/DesignSystemPage.tsx` — from `app/design-system/page.tsx`.
9. Drop the Convex provider entirely (mock URL only; **zero** real queries/mutations are used by any component — verified).

## Critical files
- New root config: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `eslint.config.js`
- Entry: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Pages: `src/pages/{LandingPage,WorkspacePage,DesignSystemPage}.tsx`
- Ported unchanged: `src/components/**`, `src/features/{renderer,ai-generator}/**`, `src/lib/**`
- Excluded from build: `apps/`, `packages/`, `tests/`, `docs/` (tsconfig `include: ["src"]` + eslint `ignores`)

## Scope notes
- `features/ai-evolution`, `features/collaboration`, `features/multi-agent` are dead code (not imported anywhere). They were copied into `src/features` as-is and are harmless; not wiring them up.
- No real backend exists — Convex was mock-only and the AI generator uses a `MockLLMProvider` that returns sample ASTs. The app is fully frontend.
- `react-router-dom` v6 `Link` uses `to` (replacing Next's `href`) — already converted in Hero/Navbar/CallToAction.

## Verification
- `pnpm install` succeeds
- `pnpm run dev` starts Vite on port 3000
- `/` renders Hero + Features + HowItWorks + ExampleApps + TechStack + WhyMorphOS + CallToAction with Navbar/Footer
- `/workspace/new` renders the AppShell + prompt studio; "Render Sample JSON AST Blueprint" renders the dynamic AST renderer
- `/design-system` renders the design sandbox
- `pnpm run build` completes without errors
