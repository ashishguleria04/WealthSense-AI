"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ExpenseToastProps {
  amount: number;
  category: string;
  onUndo?: () => void;
  visible: boolean;
  onDismiss: () => void;
}

export function ExpenseToast({ amount, category, onUndo, visible, onDismiss }: ExpenseToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-background border border-border/50 text-foreground px-4 py-3 rounded-full shadow-lg backdrop-blur-md bg-opacity-80"
        >
            <div className="flex items-center gap-2">
                <div className="bg-emerald-500/20 text-emerald-500 rounded-full p-1">
                    <CheckCircle2 size={16} />
                </div>
                <div className="flex flex-col text-sm">
                    <span className="font-medium">Expense Logged</span>
                    <span className="text-muted-foreground text-xs">
                        ₹{amount} for {category}
                    </span>
                </div>
            </div>
            
            {onUndo && (
                <button 
                    onClick={onUndo}
                    className="text-xs font-semibold text-primary hover:underline px-2"
                >
                    Undo
                </button>
            )}

            <button 
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors"
            >
                <X size={16} />
            </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
