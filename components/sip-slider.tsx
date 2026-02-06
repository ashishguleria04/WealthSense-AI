"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SIPSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
}

export function SIPSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  className,
}: SIPSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex justify-between items-end">
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
        <span className="text-lg font-bold text-foreground bg-accent/50 px-3 py-1 rounded-md min-w-[3rem] text-center">
          {unit}{value.toLocaleString()}
        </span>
      </div>
      
      <div className="relative w-full h-6 flex items-center">
        {/* Track Background */}
        <div className="absolute w-full h-2 bg-secondary rounded-full overflow-hidden">
          {/* Active Track */}
          <div 
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Range Input (Invisible overlay for interaction) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Custom Thumb (Visual Only) */}
        <div
            className="absolute h-5 w-5 bg-background border-2 border-primary rounded-full shadow-md pointer-events-none transition-all duration-150 ease-out z-20"
            style={{ 
                left: `calc(${percentage}% - 10px)` // align center of thumb
            }}
        />
      </div>
    </div>
  );
}
