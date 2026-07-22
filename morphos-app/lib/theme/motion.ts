import { Variants } from "framer-motion";

export const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]; // Standard smooth transition
export const easeOutBack: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, ease } },
    exit: { opacity: 0, transition: { duration: 0.2, ease } },
  } as Variants,

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3, ease } },
  } as Variants,

  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.3, ease } },
  } as Variants,

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: easeOutBack } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease } },
  } as Variants,

  hoverLift: {
    whileHover: { y: -4, transition: { duration: 0.2, ease } },
    whileTap: { y: 0, scale: 0.98, transition: { duration: 0.1 } },
  },

  buttonPress: {
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    whileTap: { scale: 0.96, transition: { duration: 0.1 } },
  },

  modalOpen: {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: easeOutBack } },
    exit: { opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.3, ease } },
  } as Variants,

  pageTransition: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease, staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2, ease } },
  } as Variants,

  floating: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  } as Variants,

  breathing: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  } as Variants,
  
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 0px rgba(139, 92, 246, 0)",
        "0 0 20px rgba(139, 92, 246, 0.4)",
        "0 0 0px rgba(139, 92, 246, 0)"
      ],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  } as Variants,
};
