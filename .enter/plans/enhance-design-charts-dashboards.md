# Enhance MorphOS Frontend — Design System + Charts + Dashboards

Refine the visual layer within the existing dark-glass aesthetic, rebuild the three chart widgets with **recharts**, and polish the dashboard layout + supporting widgets. No backend / AI / route changes.

## 1. Dependency
- Add `recharts` (latest, React 19–compatible) via `add_dependency`.

## 2. Design tokens — refine within dark-glass (`src/index.css` + `tailwind.config.ts`)
- **Data-viz series palette**: `--viz-1 … --viz-6` (purple / cyan / emerald / amber / rose / indigo) so all charts share a consistent, on-brand color ramp.
- **Chart gradients**: reusable SVG linear/radial gradient stops + utility classes for filled areas/bars.
- **Elevation scale**: `--elevation-1..4` shadow tokens; lightly refine `glass` / `glass-strong`.
- **Motion tokens**: `--ease-out`, `--dur-fast/normal/slow`; add keyframes `fade-up`, `pulse-glow` (recharts brings its own enter animations; these are for cards/stagger).
- **Metric typography**: tabular-nums + display font for KPI numbers.
- Map new tokens into `tailwind.config.ts` (colors, boxShadow, animation/keyframes).

## 3. Rebuild chart widgets with recharts — keep the props contract (`data` / `config`)
The `WidgetFactory` + AI-blueprint AST stay unchanged; each widget still reads `props.data` / `props.config` and keeps its `defaultData`/`defaultConfig`.
- **BarChartWidget** → `ResponsiveContainer` + recharts `BarChart`/`Bar`: vertical gradient fills, rounded tops, animated, minimal axis, custom dark-glass tooltip.
- **LineChartWidget** → `Area` + `Line` with gradient fill under the line, animated draw, dots, grid, custom tooltip.
- **PieChartWidget** → recharts `Pie` as a **donut** (innerRadius/outerRadius), segment gradient colors, legend with values, hover highlight, center label. (Replaces the current fake "bars-as-pie".)
- Honor existing `config.color` / `colors` / `xAxisKey` / `yAxisKey`; fall back to the new viz-series palette when absent. Responsive height via a container wrapper.

## 4. Dashboard + supporting widgets
- **`DashboardLayout`**: staggered `fade-up` mount per card, consistent row min-heights, refined responsive breakpoints, polished card elevation/hover.
- **`MetricCardWidget` / `StatGridWidget` / `ProgressWidget`**: align to refined tokens (tabular-nums, gradient accents, elevation) for visual consistency with the new charts.

## 5. Verify
- Dev server boots; a generated sample AST renders the new charts; generation/chat paths unchanged.

## Non-goals
- No backend, edge-function, AI, or routing changes. Chart widget props contract unchanged so AI-generated blueprints keep working.
