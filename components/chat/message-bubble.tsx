"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
}

export function MessageBubble({ content, isUser }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative flex items-start gap-4",
        isUser && "justify-end"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[85%] text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}