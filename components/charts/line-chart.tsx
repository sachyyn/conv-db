"use client"

import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface LineChartProps {
  data: any
}

export function LineChart({ data }: LineChartProps) {
  return (
    <ChartContainer
      config={{
        dataset: {
          label: data.datasets[0].label,
          color: "#FF4500", // Cognign red
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data.labels.map((label: string, index: number) => ({
            name: label,
            value: data.datasets[0].data[index],
          }))}
          margin={{ top: 24, right: 24, bottom: 24, left: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.2)" strokeWidth={1} />
          <XAxis
            dataKey="name"
            stroke="#000000"
            fontSize={12}
            tickLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
            axisLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
          />
          <YAxis
            stroke="#000000"
            fontSize={12}
            tickLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
            axisLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF4500"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1, fill: "#FFFFFF", stroke: "#FF4500" }}
            activeDot={{ r: 6, strokeWidth: 1, fill: "#FFFFFF", stroke: "#FF4500" }}
            name={data.datasets[0].label}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
