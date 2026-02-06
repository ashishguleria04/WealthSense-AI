"use client";

import { useAiState } from "@/lib/ai-state-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function BudgetTracker() {
  const { state } = useAiState();
  
  // Calculate total spent based on transactions in state
  const totalSpent = state.transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const budgetLimit = state.monthlyIncome * 0.5; // Assume 50% needs rule for now or static
  const percentage = Math.min((totalSpent / budgetLimit) * 100, 100);
  
  const isDanger = percentage > 85;

  return (
    <Card className="w-full max-w-sm bg-card/50 backdrop-blur-sm border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
            <span>Monthly Budget</span>
            <span className={cn("text-xs px-2 py-1 rounded-full bg-secondary", isDanger && "bg-rose-500/20 text-rose-500")}>
                {percentage.toFixed(0)}% Used
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-mono font-medium">₹{totalSpent.toLocaleString()} / ₹{budgetLimit.toLocaleString()}</span>
            </div>

            <div className="relative h-3 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div 
                    className={cn("absolute h-full rounded-full transition-colors", isDanger ? "bg-rose-500" : "bg-primary")}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
            
            {isDanger && (
                 <div className="flex items-start gap-2 text-xs text-rose-400 mt-2 bg-rose-500/10 p-2 rounded-md">
                    <AlertCircle size={14} className="mt-0.5" />
                    <p>You're approaching your limit! Slow down on "Eating Out".</p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
