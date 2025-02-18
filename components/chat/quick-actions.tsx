"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BrainCircuit, HelpCircle, Image, Sparkles, Wand2 } from "lucide-react";

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const actions = [
  {
    icon: Image,
    label: "Create image",
    message: "Can you create an image for me?",
  },
  {
    icon: Sparkles,
    label: "Surprise me",
    message: "Surprise me with something interesting!",
  },
  {
    icon: BrainCircuit,
    label: "Brainstorm",
    message: "Let's brainstorm some ideas.",
  },
  {
    icon: HelpCircle,
    label: "Get advice",
    message: "I need some advice.",
  },
  {
    icon: Wand2,
    label: "Help me write",
    message: "Can you help me write something?",
  },
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 p-4 max-w-3xl mx-auto w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="bg-background/5 hover:bg-background/10 border-0 h-auto min-w-[200px] flex gap-3 items-center justify-start px-6 py-4"
          onClick={() => onActionClick(action.message)}
        >
          <action.icon className="h-5 w-5" />
          <span className="text-sm font-normal">{action.label}</span>
        </Button>
      ))}
    </motion.div>
  );
}