"use client"

import { Pie, PieChart as RechartsPieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface PieChartProps {
  data: any
}

export function PieChart({ data }: PieChartProps) {
  // Using Cognign colors for the pie chart
  const COLORS = ["#FF4500", "#51DA4C", "#0000FF", "#FFF639", "#FF45FF", "#00FFFF"]

  const chartData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.datasets[0].data[index],
  }))

  return (
    <ChartContainer className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            stroke="#FFFFFF"
            strokeWidth={1}
          >
            {chartData.map((_: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
