"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockInsights } from "@/lib/mock-data"
import { LineChart, BarChart, PieChart, Plus, Trash2, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Insight } from "@/types"

export default function InsightsPage() {
  const router = useRouter()
  const [insights, setInsights] = useState<Insight[]>(mockInsights)

  const handleDeleteInsight = (id: string) => {
    setInsights(insights.filter((insight) => insight.id !== id))
  }

  const getIconForVisualizationType = (type: string) => {
    switch (type) {
      case "line":
        return <LineChart className="h-5 w-5" strokeWidth={1.4} />
      case "bar":
        return <BarChart className="h-5 w-5" strokeWidth={1.4} />
      case "pie":
        return <PieChart className="h-5 w-5" strokeWidth={1.4} />
      default:
        return <LineChart className="h-5 w-5" strokeWidth={1.4} />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-light">Saved Insights</h1>
            <Button onClick={() => router.push("/chat")} className="bg-cognign-blue hover:bg-cognign-blue/90">
              <Plus className="mr-2 h-4 w-4" strokeWidth={1.4} /> Create New Insight
            </Button>
          </div>

          {insights.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight) => (
                <Card key={insight.id} className="overflow-hidden border-gray-400">
                  <div className="h-40 bg-muted p-4">
                    <div className="flex h-full items-center justify-center text-muted-foreground">Chart Preview</div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getIconForVisualizationType(insight.visualization.type)}
                        <h2 className="font-light">{insight.title}</h2>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" strokeWidth={1.4} />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-cognign-red hover:text-cognign-red"
                          onClick={() => handleDeleteInsight(insight.id)}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    {insight.description && <p className="text-sm text-muted-foreground">{insight.description}</p>}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Created{" "}
                      {insight.createdAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-gray-400">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <LineChart className="mb-4 h-12 w-12 text-muted-foreground" strokeWidth={1.4} />
                <h2 className="mb-2 text-xl font-light">No Saved Insights</h2>
                <p className="mb-4 text-center text-muted-foreground">
                  You haven't saved any insights yet. Start a chat to create insights.
                </p>
                <Button onClick={() => router.push("/chat")} className="bg-cognign-blue hover:bg-cognign-blue/90">
                  <Plus className="mr-2 h-4 w-4" strokeWidth={1.4} /> Create New Insight
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <footer className="border-t border-gray-400 py-4 text-center text-sm text-muted-foreground">
        © 2025 DataChat. All rights reserved.
      </footer>
    </div>
  )
}
