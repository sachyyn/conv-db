"use client"

import type { Message } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Copy, Download, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LineChart } from "./charts/line-chart"
import { BarChart } from "./charts/bar-chart"
import { PieChart } from "./charts/pie-chart"
import { ScatterChart } from "./charts/scatter-chart"
import { useUser } from "@clerk/nextjs"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { user } = useUser()
  const isUser = message.role === "user"

  const renderVisualization = () => {
    if (!message.visualization) return null

    switch (message.visualization.type) {
      case "line":
        return <LineChart data={message.visualization.data} />
      case "bar":
        return <BarChart data={message.visualization.data} />
      case "pie":
        return <PieChart data={message.visualization.data} />
      case "scatter":
        return <ScatterChart data={message.visualization.data} />
      default:
        return null
    }
  }

  return (
    <div className={cn("mb-4 flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-3xl", isUser && "flex-row-reverse")}>
        <div className={cn("mt-1", isUser ? "ml-4" : "mr-4")}>
          <Avatar className="h-8 w-8">
            {isUser ? (
              <>
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                <AvatarFallback className="bg-cognign-blue text-white">
                  {user?.firstName?.charAt(0).toUpperCase() ||
                    user?.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </>
            ) : (
              <>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="DataChat" />
                <AvatarFallback className="bg-cognign-red text-white">DC</AvatarFallback>
              </>
            )}
          </Avatar>
        </div>
        <div>
          <div className={cn("rounded-lg px-4 py-2", isUser ? "bg-cognign-blue text-white" : "bg-muted")}>
            <p>{message.content}</p>
          </div>

          {message.sql && !isUser && (
            <Card className="mt-2 overflow-hidden border border-gray-400">
              <pre className="overflow-x-auto bg-muted p-4 text-xs font-mono">
                <code>{message.sql}</code>
              </pre>
              <div className="flex border-t border-gray-400 bg-background p-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  <Copy className="mr-1 h-3 w-3" strokeWidth={1.4} />
                  Copy SQL
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Download className="mr-1 h-3 w-3" strokeWidth={1.4} />
                  Download CSV
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Save className="mr-1 h-3 w-3" strokeWidth={1.4} />
                  Save Insight
                </Button>
              </div>
            </Card>
          )}

          {message.visualization && !isUser && (
            <div className="mt-2 h-64 w-full overflow-hidden rounded-lg border border-gray-400 bg-background p-4">
              {renderVisualization()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
