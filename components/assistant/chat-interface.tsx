"use client";

import React, { useState } from "react";
import { useTamboThread } from "@tambo-ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

export function ChatInterface() {
  const { 
    thread: { messages }, 
    sendThreadMessage,
    streaming 
  } = useTamboThread();
  
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || streaming) return;

    const message = input;
    setInput("");
    await sendThreadMessage(message);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-xl overflow-hidden bg-background shadow-sm">
      <div className="bg-muted/30 p-4 border-b">
        <h2 className="font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          WealthSense Assistant
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-10">
              <p>Ask me to help you plan your financial goals.</p>
              <p className="text-sm mt-2">Try: "I want to save $20,000 for a car."</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={msg.id || i}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div className={`space-y-2 max-w-[80%]`}>
                {msg.content && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                )}
                
                {/* Render any components if present */}
                {/* This is a simplification; actual Tambo usage often involves inspecting 
                    msg.components or relying on a specific renderer if one exists.
                    However, standard Tambo flow often embeds components in the stream.
                    We will need to refine this based on exactly how Tambo exposes rendered components.
                    For now, assuming standard text, and we'll see if `renderedComponent` is available.
                */}
              </div>

              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {streaming && (
            <div className="flex gap-2 items-center text-muted-foreground text-sm ml-11">
              <span className="animate-pulse">Thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={streaming}
            className="flex-1"
          />
          <Button type="submit" disabled={streaming || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
