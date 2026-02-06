import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target } from "lucide-react";
import { z } from "zod";

export const FinancialGoalCardSchema = z.object({
  title: z.string().describe("The name of the financial goal (e.g., 'House Down Payment')"),
  targetAmount: z.number().describe("The total amount needed for the goal"),
  currentAmount: z.number().describe("The amount currently saved"),
  deadline: z.string().describe("The target date for the goal (YYYY-MM-DD)"),
});

export type FinancialGoalCardProps = z.infer<typeof FinancialGoalCardSchema>;

export const FinancialGoalCard: React.FC<FinancialGoalCardProps> = ({ 
  title, 
  targetAmount, 
  currentAmount, 
  deadline 
}) => {
  const progress = Math.min(100, (currentAmount / targetAmount) * 100);

  return (
    <Card className="w-full max-w-md shadow-lg border-2 border-primary/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Goal</p>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              {title}
            </CardTitle>
          </div>
          <div className="text-right">
             <span className="text-sm font-medium text-muted-foreground">Target</span>
             <p className="font-bold text-primary">${targetAmount.toLocaleString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">${currentAmount.toLocaleString()} saved</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
          <span>Target Date</span>
          <span className="font-medium text-foreground">{new Date(deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <Button className="w-full group">
          Contribute Funds
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
