"use client"

import {
  Scatter,
  ScatterChart as RechartsScatterChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface ScatterChartProps {
  data: any
}

export function ScatterChart({ data }: ScatterChartProps) {
  return (
    <ChartContainer
      config={{
        dataset: {
          label: data.datasets[0].label,
          color: "#0000FF", // Cognign blue
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.2)" strokeWidth={1} />
          <XAxis
            type="number"
            dataKey="x"
            name="x"
            stroke="#000000"
            fontSize={12}
            tickLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
            axisLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="y"
            stroke="#000000"
            fontSize={12}
            tickLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
            axisLine={{ stroke: "rgba(0, 0, 0, 0.2)" }}
          />
          <ZAxis range={[60, 60]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            }}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter name={data.datasets[0].label} data={data.datasets[0].data} fill="#0000FF" shape="circle" />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
