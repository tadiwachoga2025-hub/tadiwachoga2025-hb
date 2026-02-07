"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { ChurnDataPoint } from "./types";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface ChurnChartProps {
  data: ChurnDataPoint[];
  currentMonth?: string;
  className?: string;
}

export function ChurnChart({ data, currentMonth, className }: ChurnChartProps) {
  const option = useMemo(() => {
    const months = data.map((d) => d.month);
    const predicted = data.map((d) => d.predicted);
    const actual = data.map((d) => d.actual);
    const markerMonth = currentMonth ?? months[Math.floor(months.length / 2)];

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: "#FFFFFF",
        borderColor: "#E0E0E0",
        textStyle: { color: "#333333", fontSize: 12 },
        confine: true,
        formatter: (params: Array<{ seriesName: string; data: number; axisValue: string }>) => {
          const month = params[0]?.axisValue ?? "";
          const predictedPoint = params.find((p) => p.seriesName === "Predicted");
          const actualPoint = params.find((p) => p.seriesName === "Actual");
          return `
            <div style="font-weight:600;margin-bottom:6px;">${month}</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="width:8px;height:8px;border-radius:999px;background:#FFC300;"></span>
              <span>Predicted: <strong>${predictedPoint?.data ?? "-"}</strong></span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="width:8px;height:8px;border-radius:999px;background:#16b364;"></span>
              <span>Actual: <strong>${actualPoint?.data ?? "-"}</strong></span>
            </div>
          `;
        },
      },
      legend: {
        bottom: 0,
        left: "center",
        data: ["Predicted", "Actual"],
        itemWidth: 12,
        itemHeight: 12,
        icon: "circle",
        textStyle: { color: "#595959", fontSize: 12 },
      },
      grid: { left: 12, right: 16, top: 24, bottom: 48, containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: months,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#E0E0E0" } },
        axisLabel: { color: "#595959", fontSize: 12, margin: 12 },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#595959", fontSize: 12, margin: 12 },
        splitLine: { lineStyle: { color: "#E0E0E0" } },
        min: (value: { min: number }) => Math.max(0, value.min - 5),
        max: (value: { max: number }) => value.max + 5,
        splitNumber: 5,
      },
      series: [
        {
          name: "Predicted",
          type: "bar",
          data: predicted,
          barWidth: 8,
          barGap: "-35%",
          itemStyle: {
            color: "#FFC300",
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: { focus: "series" },
          animationDelay: (idx: number) => idx * 20,
          z: 3,
        },
        {
          name: "Actual",
          type: "bar",
          data: actual,
          barWidth: 8,
          itemStyle: {
            color: "#16b364",
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: { focus: "series" },
          animationDelay: (idx: number) => idx * 20 + 120,
          z: 4,
          markLine: {
            symbol: "none",
            lineStyle: { color: "#595959", type: "dashed" },
            data: [{ xAxis: markerMonth }],
            label: { show: false },
          },
        },
      ],
      animationEasing: "cubicOut",
      animationDuration: 1200,
    };
  }, [data, currentMonth]);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-portfolio-text">Incident Trend Analysis</h3>
      </div>
      <div className="rounded-lg bg-portfolio-bg p-4">
        <ReactECharts option={option} style={{ height: 320, width: "100%" }} opts={{ renderer: "svg" }} />
      </div>
    </div>
  );
}
