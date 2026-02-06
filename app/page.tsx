"use client";

import { AiStateProvider, useAiState } from "@/lib/ai-state-context";
import { VibeChart } from "@/components/vibe-chart";
import { BudgetTracker } from "@/components/budget-tracker";
import { SIPCalculator } from "@/components/sip-calculator";
import { ExpenseLogger } from "@/components/expense-logger";
import { TaxOptimizer } from "@/components/tax-optimizer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, Wallet, PieChart, TrendingUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function ChatInterface() {
  const { state } = useAiState();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, component?: React.ReactNode }>>([
    { 
        role: 'assistant', 
        content: "Hey! I'm WealthSense. I see you're eyeing that new iPhone. Let's see if we can make it happen without broke vibes.",
    }
  ]);

  // Demo interactions
  const handleSendMessage = () => {
    // Determine what to show based on state or random for demo
    // Cycle through components
    const nextComponentIndex = messages.filter(m => m.component).length;
    
    let responseComponent = null;
    let responseText = "";

    switch(nextComponentIndex % 4) {
        case 0:
            responseText = "Here's your current financial vibe. Looking balanced!";
            responseComponent = <VibeChart income={state.monthlyIncome || 50000} expenses={state.totalExpenses || 20000} />;
            break;
        case 1:
            responseText = "If you invested that iPhone money instead, here's what it could look like in 5 years.";
            responseComponent = <SIPCalculator />;
            break;
        case 2:
            responseText = "Your budget is tracking well. Want to log that coffee?";
            responseComponent = (
                <div className="flex flex-col gap-4">
                    <BudgetTracker />
                    <ExpenseLogger />
                </div>
            );
            break;
        case 3:
             responseText = "Tax season is coming. Check this optimization strategy.";
             responseComponent = <TaxOptimizer />;
             break;
    }

    setMessages(prev => [
        ...prev, 
        { role: 'user', content: "Show me my stats" },
        { role: 'assistant', content: responseText, component: responseComponent }
    ]);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-80 bg-secondary/20 border-r border-border flex-col p-4 gap-4">
        <div className="flex items-center gap-2 px-2 py-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">W</div>
            <span className="font-bold text-xl tracking-tight">WealthSense AI</span>
        </div>
        
        <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                <Wallet className="mr-2 h-4 w-4" />
                Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                <PieChart className="mr-2 h-4 w-4" />
                Budget
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                <TrendingUp className="mr-2 h-4 w-4" />
                Investments
            </Button>
        </div>

        <div className="mt-auto">
             <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-2">Monthly Vibe</p>
                <VibeChart income={50000} expenses={25000} className="w-full scale-75 -ml-4" />
             </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border flex items-center px-6 justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
              <span className="font-semibold">Financial Assistant</span>
              <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">US</AvatarFallback>
              </Avatar>
          </header>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((m, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn("flex gap-4", m.role === 'user' ? "flex-row-reverse" : "flex-row")}
                    >
                        {m.role === 'assistant' && (
                            <Avatar className="h-8 w-8 mt-1 border border-border">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                            </Avatar>
                        )}
                        
                        <div className={cn("flex flex-col gap-2 max-w-[85%]", m.role === 'user' && "items-end")}>
                            {m.content && (
                                <div className={cn("px-4 py-2.5 rounded-2xl text-sm leading-relaxed", 
                                    m.role === 'user' 
                                        ? "bg-primary text-primary-foreground rounded-br-sm" 
                                        : "bg-secondary text-secondary-foreground rounded-tl-sm"
                                )}>
                                    {m.content}
                                </div>
                            )}
                            
                            {m.component && (
                                <div className="mt-2">
                                    {m.component}
                                
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background">
              <div className="max-w-3xl mx-auto relative flex items-center gap-2">
                {isDanger && (
                    <div className="absolute -top-10 left-0 right-0 flex items-start gap-2 text-xs text-rose-400 bg-rose-500/10 p-2 rounded-md">
                        <AlertCircle size={14} className="mt-0.5" />
                        <p>You're approaching your limit! Slow down on "Eating Out".</p>
                    </div>
                )}
                  <input 
                    className="flex-1 bg-secondary/50 border border-border rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                    placeholder="Ask about your budget, SIPs, or taxes..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="icon" className="rounded-full h-10 w-10 shrink-0" onClick={handleSendMessage}>
                      <Send size={18} />
                  </Button>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-3">
                WealthSense AI can make mistakes. Consider checking important financial decisions.
              </p>
          </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AiStateProvider>
      <ChatInterface />
    </AiStateProvider>
  );
}
