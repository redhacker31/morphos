/**
 * Motion System Animation Presets for Framer Motion integration.
 */
export const WIDGET_ENTRY_MOTION = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
  transition: { duration: 0.25, ease: "easeOut" },
};

export const WIDGET_HOVER_MOTION = {
  whileHover: { y: -3, transition: { duration: 0.15, ease: "easeOut" } },
  whileTap: { scale: 0.98 },
};

export const LAYOUT_REORDER_SPRING = {
  layout: true,
  transition: { type: "spring", stiffness: 350, damping: 25 },
};
