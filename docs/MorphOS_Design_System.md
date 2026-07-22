# MorphOS: Design System & Component Specification

**Status:** Approved for MVP
**Aesthetic:** Dark Mode, Premium SaaS, Glassmorphism, Neon Accents.

---

## 1. Design Tokens

### Colors
- **Background:** `#09090B` (Deep Charcoal)
- **Surface (Glass):** `rgba(25, 25, 30, 0.6)`
- **Primary Accent:** `#00C8FF` (Electric Sky Blue)
- **Secondary Accent:** `#FF4D4D` (Neon Red)
- **Success:** `#39FF14` (Neon Green)
- **Text:** `#FFFFFF` (Primary), `#A1A1AA` (Muted)

### Typography
- **Headings:** `Space Grotesk`, Tracking: tight.
- **Body:** `Inter`, Tracking: normal.

### Effects
- **Glassmorphism:** `backdrop-filter: blur(24px)` with a `1px solid rgba(255,255,255,0.05)` border.
- **Shadows:** `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4)`

---

## 2. Animation & Motion Principles
- **Progressive Reveal:** UI elements fade and slide up sequentially (`delay: index * 0.1s`).
- **Spring Physics:** Framer Motion spring (`stiffness: 300, damping: 30`).
- **Glow States:** Buttons pulse with a soft box-shadow on hover.

---

## 3. MVP Components Specification

### 1. Dashboard (The Canvas)
- **Purpose:** Wraps the grid layout.
- **Props:** `schema` (JSON AST).
- **Behavior:** Parses `layoutParams` into CSS Grid coordinates.

### 2. KPI Card
- **Purpose:** Highlights top-level metrics.
- **Props:** `title`, `value`, `trend`.
- **Animations:** Number counts up from 0 on mount using `requestAnimationFrame`.
- **Empty State:** Shows `$0` and gray neutral trend line.

### 3. Chart Card (Line / Pie)
- **Purpose:** Data visualization using `chart.js`.
- **Props:** `title`, `datasets`, `labels`.
- **Loading State:** Shimmering skeleton block matching dimensions.
- **Animations:** Canvas draws paths sequentially on mount (Chart.js `animation.duration: 2000`).

### 4. Table
- **Purpose:** List views (e.g., invoices, logs).
- **Props:** `headers`, `rows`.
- **Styling:** Subtle alternating row backgrounds, glowing pill badges for "Status" columns.

### 5. AI Chat Copilot
- **Purpose:** The conversational editor.
- **State:** `chatHistory`, `isTyping`.
- **Behavior:** Locks input while `isTyping === true`. Shows animated dots while awaiting Convex action. 
- **Keyboard Navigation:** Press `Enter` to submit.

### 6. Generation Timeline
- **Purpose:** Keeps user engaged during the 5-second AI generation window.
- **Props:** `currentStep` (0-6).
- **Animations:** Connecting lines fill with a glowing gradient as steps complete. Checkmarks bounce in.

### 7. Button
- **Purpose:** Primary CTAs.
- **Props:** `variant` (primary, secondary, glow).
- **Animations:** Glow variant tracks mouse position to create a particle trail (implemented in `handleBtnMouseMove`).

---

## 4. Responsive Behavior
- **Desktop (>1024px):** 12-column grid, persistent sidebars.
- **Tablet (768px-1024px):** 8-column grid, chat panel shrinks.
- **Mobile (<768px):** 1-column grid, charts stack vertically, sidebar moves to bottom nav. (Deprioritized for Hackathon demo).
