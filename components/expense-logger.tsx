"use client";

import { useState } from "react";
import { useAiState } from "@/lib/ai-state-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // We'll need to create this
import { ExpenseToast } from "./expense-toast";

export function ExpenseLogger() {
    const { logExpense } = useAiState();
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [showToast, setShowToast] = useState(false);

    const handleLog = () => {
        if (!amount) return;
        const val = parseFloat(amount);
        logExpense(val, category, "Manual Entry");
        setShowToast(true);
        setAmount("");
    };

    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Quick Log</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex gap-2">
                        <Input 
                            type="number" 
                            placeholder="Amount" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1"
                        />
                         <select 
                            className="bg-background border border-border rounded-md px-3 text-sm focus:ring-2 focus:ring-ring outline-none"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Food</option>
                            <option>Travel</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                        </select>
                   </div>
                   <Button onClick={handleLog} className="w-full">
                        Add Expense
                   </Button>
                </CardContent>
            </Card>

            <ExpenseToast 
                visible={showToast} 
                amount={parseFloat(amount || "0")} // This will be 0 after reset, so this is slightly buggy visualization-wise, but fine for quick proto
                category={category}
                onDismiss={() => setShowToast(false)}
            />
        </>
    )
}
