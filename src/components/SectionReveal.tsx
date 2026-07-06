import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

type SectionRevealProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export default function SectionReveal({ id, className = "", children }: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
