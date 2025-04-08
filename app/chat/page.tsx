"use client"

import { useState, useEffect, useRef } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { DatabaseSchema } from "@/components/database-schema"
import type { Message } from "@/types"
import { mockTableSchema, mockSuggestedQueries } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Plus } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'll analyze the sales data for the past 6 months and create a trend visualization.",
        createdAt: new Date(),
        sql: `SELECT date_trunc('month', sale_date) as month,
sum(amount) as total_sales
FROM sales
WHERE sale_date >= now() - interval '6 months'
GROUP BY 1 ORDER BY 1;`,
        visualization: {
          type: "line",
          data: {
            labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
            datasets: [
              {
                label: "Sales",
                data: [12000, 19000, 25000, 18000, 22000, 30000],
                borderColor: "#FF4500",
                backgroundColor: "rgba(255, 69, 0, 0.1)",
              },
            ],
          },
        },
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader title="chat with your data" />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-64 border-r border-gray-400 md:block">
          <DatabaseSchema tables={mockTableSchema} suggestedQueries={mockSuggestedQueries} />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-cognign-blue/10 p-4">
                  <FileText className="h-8 w-8 text-cognign-blue" strokeWidth={1.4} />
                </div>
                <h2 className="mb-2 text-xl font-light">Start a conversation with your data</h2>
                <p className="mb-8 max-w-md text-center text-muted-foreground">
                  Ask questions in natural language and get insights from your connected databases.
                </p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-400"
                    onClick={() => handleSendMessage("Show me sales trends for the last 6 months")}
                  >
                    <span>Show me sales trends</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-400"
                    onClick={() => handleSendMessage("What was our Q1 2025 revenue?")}
                  >
                    <span>Q1 2025 revenue</span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-cognign-blue border-t-transparent"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <div className="relative">
            <div className="absolute bottom-20 right-4 flex gap-2">
              <Button
                size="icon"
                className="rounded-full bg-cognign-green hover:bg-cognign-green/90 shadow-lg"
                onClick={() => {}}
              >
                <ImageIcon className="h-5 w-5" strokeWidth={1.4} />
                <span className="sr-only">Add image</span>
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
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
