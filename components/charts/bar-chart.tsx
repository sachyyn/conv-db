"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface BarChartProps {
  data: any
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ChartContainer
      config={{
        dataset: {
          label: data.datasets[0].label,
          color: "#51DA4C", // Cognign green
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
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
          <Bar dataKey="value" fill="#51DA4C" name={data.datasets[0].label} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
