import { z } from "zod";

export const TransactionSchema = z.object({
    id: z.string(),
    amount: z.number(),
    category: z.string(),
    date: z.string(), // ISO string
    description: z.string(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const AiStateSchema = z.object({
    monthlyIncome: z.number().default(0),
    totalExpenses: z.number().default(0),
    riskAppetite: z.enum(["Conservative", "Moderate", "Aggressive"]).default("Moderate"),
    transactions: z.array(TransactionSchema).default([]),
    goals: z.array(z.string()).default([]), // Simple strings for now
});

export type AiState = z.infer<typeof AiStateSchema>;
