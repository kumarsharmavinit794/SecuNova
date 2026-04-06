import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

const PageTransition = ({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
