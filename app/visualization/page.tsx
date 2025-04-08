"use client"

import { useState } from "react"
import { ChatHeader } from "@/components/chat-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { ScatterChart } from "@/components/charts/scatter-chart"
import { ArrowUpDown, BarChartIcon, LineChartIcon, PieChartIcon, Share2, Download, RefreshCw, Plus } from "lucide-react"

export default function VisualizationPage() {
  const [chartType, setChartType] = useState<"line" | "bar" | "pie" | "scatter">("line")
  const [dateRange, setDateRange] = useState<"7" | "30" | "90" | "custom">("30")
  const [selectedSeries, setSelectedSeries] = useState({
    revenue: true,
    costs: true,
    profit: true,
  })

  const chartData = {
    line: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [65000, 72000, 81000, 85000, 92000, 100000],
          borderColor: "#FF4500",
          backgroundColor: "rgba(255, 69, 0, 0.1)",
        },
      ],
    },
    bar: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [65000, 72000, 81000, 85000, 92000, 100000],
          backgroundColor: "#51DA4C",
        },
      ],
    },
    pie: {
      labels: ["Product A", "Product B", "Product C", "Product D"],
      datasets: [
        {
          label: "Sales",
          data: [42, 28, 18, 12],
          backgroundColor: ["#FF4500", "#51DA4C", "#0000FF", "#FFF639"],
        },
      ],
    },
    scatter: {
      labels: [],
      datasets: [
        {
          label: "Sales vs Marketing",
          data: [
            { x: 10, y: 20 },
            { x: 15, y: 25 },
            { x: 20, y: 30 },
            { x: 25, y: 35 },
            { x: 30, y: 40 },
            { x: 35, y: 45 },
          ],
        },
      ],
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <LineChart data={chartData.line} />
      case "bar":
        return <BarChart data={chartData.bar} />
      case "pie":
        return <PieChart data={chartData.pie} />
      case "scatter":
        return <ScatterChart data={chartData.scatter} />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader title="Data Visualization & Insights" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-gray-400 p-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-light">Date Range</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input type="text" placeholder="mm/dd/yyyy" className="border-gray-400 text-sm" />
                  <span className="flex items-center justify-center text-sm text-muted-foreground">to</span>
                  <Input type="text" placeholder="mm/dd/yyyy" className="border-gray-400 text-sm" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={dateRange === "7" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateRange("7")}
                    className={`text-xs ${dateRange !== "7" && "border-gray-400"}`}
                  >
                    Last 7 days
                  </Button>
                  <Button
                    variant={dateRange === "30" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateRange("30")}
                    className={`text-xs ${dateRange !== "30" && "border-gray-400"}`}
                  >
                    Last 30 days
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-400 text-xs">
                    This quarter
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-light">Chart Type</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  className={`flex flex-col items-center justify-center p-4 ${chartType !== "line" && "border-gray-400"}`}
                  onClick={() => setChartType("line")}
                >
                  <LineChartIcon className="mb-1 h-5 w-5" strokeWidth={1.4} />
                  <span className="text-xs">Line</span>
                </Button>
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  className={`flex flex-col items-center justify-center p-4 ${chartType !== "bar" && "border-gray-400"}`}
                  onClick={() => setChartType("bar")}
                >
                  <BarChartIcon className="mb-1 h-5 w-5" strokeWidth={1.4} />
                  <span className="text-xs">Bar</span>
                </Button>
                <Button
                  variant={chartType === "pie" ? "default" : "outline"}
                  className={`flex flex-col items-center justify-center p-4 ${chartType !== "pie" && "border-gray-400"}`}
                  onClick={() => setChartType("pie")}
                >
                  <PieChartIcon className="mb-1 h-5 w-5" strokeWidth={1.4} />
                  <span className="text-xs">Pie</span>
                </Button>
                <Button
                  variant={chartType === "scatter" ? "default" : "outline"}
                  className={`flex flex-col items-center justify-center p-4 ${chartType !== "scatter" && "border-gray-400"}`}
                  onClick={() => setChartType("scatter")}
                >
                  <ArrowUpDown className="mb-1 h-5 w-5" strokeWidth={1.4} />
                  <span className="text-xs">Scatter</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-light">Data Series</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="revenue"
                    checked={selectedSeries.revenue}
                    onCheckedChange={(checked) =>
                      setSelectedSeries({
                        ...selectedSeries,
                        revenue: checked as boolean,
                      })
                    }
                    className="border-gray-400 data-[state=checked]:bg-cognign-red data-[state=checked]:border-cognign-red"
                  />
                  <Label htmlFor="revenue">Revenue</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="costs"
                    checked={selectedSeries.costs}
                    onCheckedChange={(checked) =>
                      setSelectedSeries({
                        ...selectedSeries,
                        costs: checked as boolean,
                      })
                    }
                    className="border-gray-400 data-[state=checked]:bg-cognign-green data-[state=checked]:border-cognign-green"
                  />
                  <Label htmlFor="costs">Costs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="profit"
                    checked={selectedSeries.profit}
                    onCheckedChange={(checked) =>
                      setSelectedSeries({
                        ...selectedSeries,
                        profit: checked as boolean,
                      })
                    }
                    className="border-gray-400 data-[state=checked]:bg-cognign-blue data-[state=checked]:border-cognign-blue"
                  />
                  <Label htmlFor="profit">Profit Margin</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-light">Export & Share</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start border-gray-400">
                  <Download className="mr-2 h-4 w-4" strokeWidth={1.4} />
                  Export as PNG
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-gray-400">
                  <Download className="mr-2 h-4 w-4" strokeWidth={1.4} />
                  Export as PDF
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-gray-400">
                  <Share2 className="mr-2 h-4 w-4" strokeWidth={1.4} />
                  Share Link
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="h-full rounded-lg border border-gray-400 bg-card p-4">
              <div className="h-full">{renderChart()}</div>
            </div>
          </div>

          <div className="border-t border-gray-400 p-4">
            <h3 className="mb-4 text-lg font-light">Key Insights</h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-400 p-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-cognign-green" strokeWidth={1.4} />
                  <p className="font-medium">Sales increased by 15% over the last quarter</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  <button className="text-cognign-blue hover:underline">Tell me more</button>
                </p>
              </div>
              <div className="rounded-lg border border-gray-400 p-4">
                <div className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-cognign-blue" strokeWidth={1.4} />
                  <p className="font-medium">Consistent growth pattern observed in Q1 2025</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  <button className="text-cognign-blue hover:underline">Tell me more</button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-64 border-l border-gray-400 p-4">
          <h3 className="mb-2 text-sm font-light">Annotations</h3>
          <div className="space-y-2">
            <div className="rounded-lg border border-gray-400 p-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Peak in March</h4>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    className="h-4 w-4"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Highest revenue point noted during spring campaign</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full border-gray-400">
            Add Annotation
          </Button>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex gap-2">
        <Button
          size="icon"
          className="rounded-full bg-cognign-green hover:bg-cognign-green/90 shadow-lg"
          onClick={() => {}}
        >
          <RefreshCw className="h-5 w-5" strokeWidth={1.4} />
          <span className="sr-only">Refresh</span>
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-cognign-red hover:bg-cognign-red/90 shadow-lg"
          onClick={() => {}}
        >
          <Plus className="h-5 w-5" strokeWidth={1.4} />
          <span className="sr-only">More options</span>
        </Button>
      </div>
    </div>
  )
}
