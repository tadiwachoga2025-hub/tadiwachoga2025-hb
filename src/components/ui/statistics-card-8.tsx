"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge-2";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}
    >
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

type StatCard = {
  icon: typeof Users;
  iconColor: string;
  title: string;
  badge: {
    color: string;
    icon: typeof TrendingUp;
    iconColor: string;
    text: string;
  };
  value: number | string;
  dateRange: string;
};

const cards: StatCard[] = [
  {
    icon: Users,
    iconColor: "text-portfolio-primary",
    title: "Guards On Duty",
    badge: {
      color: "bg-portfolio-growth-light text-portfolio-growth",
      icon: TrendingUp,
      iconColor: "text-portfolio-growth",
      text: "+24",
    },
    value: 1247,
    dateRange: "Last 24 hours",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-portfolio-primary",
    title: "Site Coverage Rate",
    badge: {
      color: "bg-portfolio-growth-light text-portfolio-growth",
      icon: TrendingUp,
      iconColor: "text-portfolio-growth",
      text: "+1.2%",
    },
    value: "98.5%",
    dateRange: "Rolling 30 days",
  },
  {
    icon: Video,
    iconColor: "text-portfolio-primary",
    title: "Avg Compliance Score",
    badge: {
      color: "bg-portfolio-stable-light text-portfolio-stable",
      icon: TrendingUp,
      iconColor: "text-portfolio-stable",
      text: "+0.8%",
    },
    value: "85/100",
    dateRange: "Rolling 90 days",
  },
  {
    icon: AlertTriangle,
    iconColor: "text-portfolio-primary",
    title: "Open Incidents",
    badge: {
      color: "bg-portfolio-growth-light text-portfolio-growth",
      icon: TrendingDown,
      iconColor: "text-portfolio-growth",
      text: "-5",
    },
    value: 12,
    dateRange: "Last 7 days",
  },
];

export function StatisticsCard8({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4", className)}>
      {cards.map((card, i) => (
        <Card key={i} className="h-full border-portfolio-border shadow-sm">
          <CardContent className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <card.icon className={cn("size-6", card.iconColor)} />
              <Badge className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", card.badge.color)}>
                <card.badge.icon className={cn("w-3 h-3", card.badge.iconColor)} />
                {card.badge.text}
              </Badge>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {card.title}
                </div>
                <div className="text-3xl font-bold text-foreground mb-6">
                  {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
                </div>
              </div>
              <div className="pt-3 border-t border-border text-xs text-muted-foreground font-medium">
                {card.dateRange}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function StatisticCard8() {
  return <StatisticsCard8 />;
}
