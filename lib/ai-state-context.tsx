"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AiState, AiStateSchema, Transaction } from "./schemas";

interface AiStateContextType {
  state: AiState;
  updateState: (newState: Partial<AiState>) => void;
  logExpense: (amount: number, category: string, description: string) => void;
  isLoading: boolean;
}

const defaultState: AiState = {
  monthlyIncome: 0,
  totalExpenses: 0,
  riskAppetite: "Moderate",
  transactions: [],
  goals: [],
};

const AiStateContext = createContext<AiStateContextType | undefined>(undefined);

export function AiStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AiState>(defaultState);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount (mock persistence)
  useEffect(() => {
    const saved = localStorage.getItem("wealthsense_ai_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate with Zod before setting
        const validated = AiStateSchema.safeParse(parsed);
        if (validated.success) {
          setState(validated.data);
        }
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("wealthsense_ai_state", JSON.stringify(state));
    }
  }, [state, isLoading]);

  const updateState = (newState: Partial<AiState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const logExpense = (amount: number, category: string, description: string) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substring(7),
      amount,
      category,
      date: new Date().toISOString(),
      description,
    };

    setState((prev) => ({
      ...prev,
      totalExpenses: prev.totalExpenses + amount,
      transactions: [newTransaction, ...prev.transactions],
    }));
  };

  return (
    <AiStateContext.Provider value={{ state, updateState, logExpense, isLoading }}>
      {children}
    </AiStateContext.Provider>
  );
}

export function useAiState() {
  const context = useContext(AiStateContext);
  if (context === undefined) {
    throw new Error("useAiState must be used within an AiStateProvider");
  }
  return context;
}
