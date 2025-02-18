"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollButtonProps {
  visible: boolean;
  onClick: () => void;
}

export function ScrollButton({ visible, onClick }: ScrollButtonProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-24 right-4 z-10"
        >
          <Button
            size="icon"
            className="rounded-full shadow-lg"
            onClick={onClick}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}