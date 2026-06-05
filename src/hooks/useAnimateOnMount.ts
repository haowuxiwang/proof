/**
 * Stagger reveal variants for Motion.
 * Use with motion.div components that need staggered entrance.
 *
 * Usage:
 *   <motion.div variants={staggerItem}>Item</motion.div>
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};
