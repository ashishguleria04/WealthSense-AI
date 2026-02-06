"use client";

import { useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SIPSlider } from "./sip-slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const data = useMemo(() => {
    const chartData = [];
    const monthlyRate = expectedReturn / 12 / 100;
    const totalMonths = years * 12;

    let totalInvested = 0;
    let currentValue = 0;

    for (let i = 0; i <= totalMonths; i++) {
        // Only add data points every year to keep chart clean, or for the last month
      if (i % 12 === 0 || i === totalMonths) {
          chartData.push({
            year: i / 12,
            invested: Math.round(totalInvested),
            value: Math.round(currentValue),
          });
      }

      // Calculate for next month
      currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);
      totalInvested += monthlyInvestment;
    }
    return chartData;
  }, [monthlyInvestment, years, expectedReturn]);

  const totalInvested = monthlyInvestment * years * 12;
  const totalValue = data[data.length - 1].value;
  const wealthGained = totalValue - totalInvested;

  return (
    <Card className="w-full max-w-2xl bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-xl">
          <span>SIP & Wealth Projector</span>
            <div className="flex items-center gap-1 text-sm font-normal text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
               <ArrowUpRight className="w-4 h-4 text-emerald-500" />
               Potential Growth
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Sliders Section */}
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
                 <SIPSlider
                    label="Monthly Investment"
                    value={monthlyInvestment}
                    min={500}
                    max={100000}
                    step={500}
                    unit="₹"
                    onChange={setMonthlyInvestment}
                />
                <SIPSlider
                    label="Time Period (Years)"
                    value={years}
                    min={1}
                    max={30}
                    unit=""
                    onChange={setYears}
                />
                 <SIPSlider
                    label="Expected Return (p.a)"
                    value={expectedReturn}
                    min={5}
                    max={30}
                    step={0.5}
                    unit="%"
                    onChange={setExpectedReturn}
                />
            </div>

            {/* Summary Section */}
             <div className="flex flex-col justify-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Invested Amount</p>
                    <p className="text-xl font-bold">₹{totalInvested.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                     <p className="text-sm text-muted-foreground">Est. Returns</p>
                     <p className="text-xl font-bold text-emerald-500">
                        +₹{wealthGained.toLocaleString()}
                     </p>
                </div>
                 <div className="space-y-1 border-t pt-3 border-border/50">
                     <p className="text-sm text-muted-foreground">Total Value</p>
                     <p className="text-3xl font-extrabold text-primary">
                        ₹{totalValue.toLocaleString()}
                     </p>
                </div>
            </div>
        </div>

        {/* Chart Section */}
        <div className="h-[250px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value}y`}
              />
              <YAxis 
                hide 
              />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--popover-foreground))",
                    borderRadius: "8px"
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: any) => [`₹${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                name="Projected Value"
              />
               <Area
                type="monotone"
                dataKey="invested"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                fillOpacity={0}
                strokeDasharray="5 5"
                name="Invested Amount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
