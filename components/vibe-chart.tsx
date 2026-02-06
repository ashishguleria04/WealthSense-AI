"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface VibeChartProps {
  income: number;
  expenses: number;
  className?: string;
}

export function VibeChart({ income, expenses, className }: VibeChartProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const ratio = income > 0 ? Math.min(expenses / income, 1) : 0;
  const percentage = Math.round(ratio * 100);

  // Determine color based on ratio
  // < 30% : Safe (Green)
  // 30% - 70% : Moderate (Yellow/Orange)
  // > 70% : Danger (Red)
  let colorClass = "text-emerald-500";
  if (ratio > 0.5) colorClass = "text-yellow-500";
  if (ratio > 0.8) colorClass = "text-rose-500";

  // SVG Configuration
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ratio * circumference;

  if (!mounted) return null;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="relative w-40 h-40">
        {/* Background Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted/20"
          />
          {/* Progress Ring */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            className={cn("transition-colors duration-500", colorClass)}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold tracking-tighter">
            {percentage}%
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
            Spent
          </span>
        </div>
      </div>
    </div>
  );
}
