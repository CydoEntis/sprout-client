import { motion } from "framer-motion";
import { ReactNode } from "react";

type LazyFadeInAnimation = {
  animationKey: string;
  children: ReactNode;
};

function LazyFadeInAnimation({ animationKey, children }: LazyFadeInAnimation) {
  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default LazyFadeInAnimation;
