import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridLoader from "react-spinners/GridLoader";
const Loader = ({
  size = 24,
  bg = "transparent",
  index = 11,
  loading,
  effect = true,
}) => {
  return (
    <AnimatePresence exitBeforeEnter={effect}>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          className="loader"
          style={{ backgroundColor: bg, zIndex: index }}
        >
          <GridLoader
            color={"#2575e6"}
            loading={loading}
            size={10}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
