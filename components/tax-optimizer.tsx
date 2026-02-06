"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";

export function TaxOptimizer({ income = 1200000 }: { income?: number }) {
  // Simplified tax calculation for demo
  const calculateTax = (income: number, regime: "old" | "new") => {
    let tax = 0;
    if (regime === "new") {
        // New Regime (FY 24-25 approximate slabs)
        // 0-3L: 0
        // 3-7L: 5% (Rebate u/s 87A makes it 0 if net income <= 7L)
        // ... simplified for demo
        if (income <= 700000) return 0;
        // Flat logic for demo visuals
        tax = (income - 300000) * 0.10; 
    } else {
        // Old Regime
        // 0-2.5L: 0
        // Deductions of 1.5L (80C) assumed
        const taxable = Math.max(0, income - 150000); // 80C
        if (taxable <= 500000) return 0;
        tax = (taxable - 250000) * 0.20; // Rough average
    }
    return Math.round(tax);
  };

  const oldRegimeTax = calculateTax(income, "old");
  const newRegimeTax = calculateTax(income, "new");
  const savings = Math.abs(oldRegimeTax - newRegimeTax);
  const betterRegime = oldRegimeTax < newRegimeTax ? "Old Regime" : "New Regime";

  return (
    <Card className="w-full max-w-md bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
            Tax Saver 
            <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">FY 2024-25</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
            <div className={`flex-1 p-4 rounded-xl border ${betterRegime === "Old Regime" ? "bg-emerald-500/10 border-emerald-500/50" : "bg-secondary/50 border-transparent"}`}>
                <div className="text-sm text-muted-foreground mb-1">Old Regime</div>
                <div className="text-2xl font-bold">₹{oldRegimeTax.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    {betterRegime === "Old Regime" && <Check size={12} className="text-emerald-500" />}
                    With 80C
                </div>
            </div>
            <div className={`flex-1 p-4 rounded-xl border ${betterRegime === "New Regime" ? "bg-emerald-500/10 border-emerald-500/50" : "bg-secondary/50 border-transparent"}`}>
                <div className="text-sm text-muted-foreground mb-1">New Regime</div>
                <div className="text-2xl font-bold">₹{newRegimeTax.toLocaleString()}</div>
                 <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    {betterRegime === "New Regime" && <Check size={12} className="text-emerald-500" />}
                    Default
                </div>
            </div>
        </div>

        <div className="bg-primary/10 text-primary p-4 rounded-lg flex items-start gap-3">
            <Info className="shrink-0 mt-0.5" size={18} />
            <div>
                <p className="font-semibold text-sm">Recommendation: {betterRegime}</p>
                <p className="text-sm opacity-90">
                    You could save <span className="font-bold">₹{savings.toLocaleString()}</span> by switching to the {betterRegime}.
                </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
