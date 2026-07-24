# Light & Bright Theme Overhaul

## Context
The MorphOS frontend is a dark-glass theme. The user wants a **light & bright** frontend, taking the **palette** and **animated backgrounds** from two reference components:
- `light-pillar` (Three.js) — `#5227FF` (indigo-violet, top) → `#FF9FFC` (pink, bottom).
- `shader-background` (WebGL) — purple line `#6633CC`, dark-indigo/purple plasma.

Goal: flip the whole frontend (landing, workspace shell, renderer widgets, bento, dashboards) to a light lavender palette with indigo/pink/purple accents, and surface both animated WebGL backgrounds as ambient layers. Backend/AI/renderer contract untouched.

## Approach

### 1. Dependencies
- `add_dependency("three")` + `@types/three` for LightPillar. ShaderBackground is raw WebGL (no deps).

### 2. Animated background components (new)
- `src/components/backgrounds/ShaderBackground.tsx` — port verbatim (self-contained raw WebGL).
- `src/components/backgrounds/LightPillar.tsx` — port verbatim; defaults `topColor="#5227FF"`, `bottomColor="#FF9FFC"`.
- Integrate:
  - `BackgroundSystem.tsx` (landing) — add `<LightPillar intensity={0.5} pillarWidth={3.2} />` inside the existing `fixed inset-0` layer, wrapped `opacity-50 mix-blend-multiply pointer-events-none`, behind the orbs. Gives the signature indigo→pink pillar motion as a soft aura on the light landing.
  - `CryptoDashboardPage.tsx` — add `<ShaderBackground className="fixed inset-0 -z-10 opacity-25 mix-blend-multiply" />` so the plasma animation shows behind the light showcase cards.

### 3. Design tokens → light & bright (`src/index.css` `:root`)
- Backgrounds: `--background:#F5F3FF`, `--background-secondary:#EDE9FE`, `--surface:#FFFFFF`, `--surface-elevated:#FFFFFF`.
- Glass/card: `--card: rgba(255,255,255,0.65)`, `--card-border: rgba(82,39,255,0.10)`, `--card-border-hover: rgba(82,39,255,0.20)`, `--border: rgba(26,26,46,0.08)`, `--glass: rgba(255,255,255,0.6)`, `--glass-border: rgba(82,39,255,0.12)`.
- Text: `--text-primary:#1A1A2E`, `--text-secondary:#5B5B7A`, `--text-muted:#8E8EAA`.
- Brand: `--primary:#5227FF`, `--primary-hover:#6B3DFF`, `--primary-subtle: rgba(82,39,255,0.10)`, `--primary-glow:#5227FF`, `--primary-light:#B9A7FF`; `--secondary:#FF9FFC`; `--accent:#7C3AED`, `--accent-subtle: rgba(124,58,237,0.10)`.
- Status kept: `--success:#10B981`, `--warning:#F59E0B`, `--error:#EF4444`, `--destructive:#EF4444`.
- Viz: `--viz-1:#5227FF`, `--viz-2:#FF9FFC`, `--viz-3:#10B981`, `--viz-4:#F59E0B`, `--viz-5:#06B6D4`, `--viz-6:#7C3AED`.
- Shadows (lighter, indigo-tinted): `--elevation-1: 0 1px 2px rgba(26,26,46,0.06)`, `--elevation-2: 0 4px 16px rgba(82,39,255,0.08)`, `--elevation-3: 0 10px 30px rgba(82,39,255,0.12)`, `--elevation-4: 0 20px 50px rgba(82,39,255,0.18)`; `--shadow-color: 26,26,46`; `--glow-purple:82,39,255`, `--glow-cyan:6,182,212`, `--glow-success:16,185,129`, `--glow-error:239,68,68`; `--hover-overlay: rgba(82,39,255,0.04)`, `--active-overlay: rgba(82,39,255,0.08)`.
- CSS utilities: `.glass`/`.glass-strong` → light white glass; `.bg-grid` lines `rgba(82,39,255,0.05)`; `.bg-gradient-radial` indigo glow; `.btn-primary` `linear-gradient(135deg,#5227FF,#FF9FFC)` + indigo shadow; `.gradient-text-primary` indigo→pink; `.gradient-text-animated` indigo→purple→pink.

### 4. `tailwind.config.ts`
No color edits needed (colors map to vars; glow boxShadow reads `var(--glow-*)`). The token flip covers it.

### 5. `src/lib/theme/glass.ts`
`innerHighlight` `border-white/5` → `border-[var(--card-border)]`.

### 6. Hardcoded dark-utility sweep (per file, `replace_all` where uniform; PRESERVE `text-white` on vivid gradient buttons/avatars)
- `text-white` → `text-[var(--text-primary)]` (keep on gradient buttons, avatar letters, `.btn-primary`).
- `text-zinc-200/300` → `text-[var(--text-secondary)]`; `text-zinc-400` → `text-[var(--text-muted)]`; `placeholder-zinc-500` → `placeholder-[var(--text-muted)]`.
- `bg-white/5`,`bg-white/10`,`bg-white/[0.03]`,`bg-white/[0.06]` → `bg-[var(--card)]`.
- `border-white/10/15/20` → `border-[var(--card-border)]` (hover → `border-[var(--card-border-hover)]`).
- `bg-[#070a12]`,`bg-[#0e1322]`,`bg-[#1A1A1A]`,`bg-[#070a12]/90` → `bg-[var(--background)]` / `bg-[var(--surface-elevated)]/80`.
- gradient headline `from-emerald-400 via-teal-300 to-cyan-400` → `from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]`.
- Keep vivid icon-chip colors (red/cyan/emerald/amber) — they pop on light.

**Files to sweep (grouped):**
- Landing (10): `Navbar`,`Hero`,`Features`,`HowItWorks`,`ExampleApps`,`TechStack`,`WhyMorphOS`,`CallToAction`,`Footer`,`pages/LandingPage`.
- Workspace shell (14): `layout/AppShell`,`layout/CommandPalette`,`workspace/Sidebar`,`workspace/TopNav`,`workspace/WorkspaceSurface`,`workspace/EmptyWorkspace`,`workspace/PromptInput`,`workspace/PromptHistory`,`workspace/RecentProjects`,`workspace/QuickStart`,`workspace/TemplateGallery`,`workspace/SettingsPanel`,`workspace/ChatPanel`,`workspace/FileUpload`.
- Pages (3): `WorkspacePage`,`CryptoDashboardPage`,`DesignSystemPage`.
- Renderer: `widgets/charts/{Bar,Line,Pie}ChartWidget`,`widgets/charts/chartUtils`,`widgets/data/{MetricCard,StatGrid,Progress,DataTable,Badge}Widget`,`widgets/forms/*`,`widgets/presentation/*`,`widgets/layout/*`,`errors/{RendererErrorBoundary,WidgetErrorBoundary}`,`factory/widgetFactory`,`core/rendererEngine`.
- Bento: `dashboard/CryptoBentoDashboard` (`text-white`→text token, `bg-white/5`→card, `border-white/10`→card-border).
- UI primitives: `ui/{button,badge,dialog,StatusBar,Logo,EmptyState,GradientText}`, `primitives/*` (mostly token-driven).

### 7. Chart internals (`chartUtils.tsx`)
- `CHART_TICK` → `#5B5B7A`; `CHART_GRID` → `rgba(82,39,255,0.08)`; `CHART_CURSOR` → `rgba(82,39,255,0.06)`; `CHART_SURFACE` → `#FFFFFF`.
- `ChartTooltip` → `bg-white/90 border-[var(--card-border)]`.
- Chart card chrome `border-white/10` → `border-[var(--card-border)]`.

## Critical files
`src/index.css`, `tailwind.config.ts`, `src/lib/theme/glass.ts`, `src/components/ui/BackgroundSystem.tsx`, `src/components/backgrounds/*` (new), `src/components/charts/chartUtils.tsx`, plus the sweep list above.

## Verification
- `pnpm exec vite` boots; no new TDZ (`Cannot access … before initialization`).
- Landing: light lavender bg + indigo→pink LightPillar aura; dark text; gradient headline indigo→pink.
- `/workspace/new`: light shell, dark text, no white-on-white.
- Bento + bar/line/pie: light cards, vivid series, readable tooltips.
- `/dashboard`: ShaderBackground motion behind light cards.
- Lint + `vite build` pass at turn end.

## Implementation checklist
- [ ] Install `three` + `@types/three`.
- [ ] Add `backgrounds/ShaderBackground.tsx` + `backgrounds/LightPillar.tsx`.
- [ ] Flip `:root` tokens + CSS utilities in `src/index.css`.
- [ ] Update `glass.ts` innerHighlight.
- [ ] Integrate LightPillar into `BackgroundSystem`; ShaderBackground into `CryptoDashboardPage`.
- [ ] Update `chartUtils.tsx` light chart internals.
- [ ] Sweep landing (10 files).
- [ ] Sweep workspace shell (14 files).
- [ ] Sweep pages (3) + bento.
- [ ] Sweep renderer widgets + errors + factory.
- [ ] Sweep UI primitives.
- [ ] Boot + verify.

## Verification checklist
- [ ] `pnpm exec vite` boots clean.
- [ ] Landing renders light bg with animated indigo→pink pillar; headline gradient indigo→pink.
- [ ] `/workspace/new` renders light shell, dark text, no invisible text.
- [ ] Bento + bar/line/pie charts render on white cards with readable tooltips.
- [ ] `/dashboard` shows ShaderBackground motion behind light cards.
- [ ] No `text-white` remains on plain light backgrounds (only on vivid gradient buttons/avatars).
- [ ] Lint + `vite build` pass.
