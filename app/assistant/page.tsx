"use client";

import React from "react";
import { TamboProvider } from "@tambo-ai/react";
import { ChatInterface } from "@/components/assistant/chat-interface";
import { FinancialGoalCard, FinancialGoalCardSchema } from "@/components/assistant/financial-goal-card";

// Register components for the AI to use
const components = [
  {
    component: FinancialGoalCard,
    schema: FinancialGoalCardSchema,
    name: "financial_goal_card",
    description: "Display a financial goal progress card with target amount and deadline.",
  },
];

export default function AssistantPage() {
  return (
    <TamboProvider
      components={components}
      // Note: In production, you should use a backend proxy for security.
      // For development/demo, we assume environment variables are available or config handles it.
      // If Tambo requires an API key in the provider for client-side usage (not recommended for prod),
      // it would be passed here or via environment configuration handled by the SDK internally.
    >
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">WealthSense Assistant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your personal AI financial planner. Ask me to create goals, track expenses, or analyze your budget.
            I can generate interactive cards to help you visualize your progress.
          </p>
        </div>
        
        <ChatInterface />
        
        {/* 
            Note: In a real Tambo app, rendered components usually appear within the chat stream 
            or in a dedicated "canvas" area depending on the implementation pattern.
            The ChatInterface component we built handles the message stream.
            If Tambo renders components *outside* the stream (e.g. side-by-side), 
            we would place a <TamboCanvas /> or similar here.
            For now, we assume in-stream rendering or the ChatInterface handles it.
        */}
      </div>
    </TamboProvider>
  );
}
