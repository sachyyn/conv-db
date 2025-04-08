"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockConversations, mockDatabases, mockInsights, mockUser } from "@/lib/mock-data"
import { PlusIcon, LineChart, Download, Settings, Database } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [conversations] = useState(mockConversations)
  const [databases] = useState(mockDatabases)
  const [insights] = useState(mockInsights)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="mb-2 text-3xl font-light">Welcome back, {mockUser.name}!</h1>
            <p className="text-muted-foreground">Empower your data conversations with AI-driven insights</p>
            <Button
              size="lg"
              className="mt-6 bg-cognign-blue hover:bg-cognign-blue/90"
              onClick={() => router.push("/chat")}
            >
              Start New Chat
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-gray-400">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-light">Recent Conversations</h2>
                <div className="space-y-4">
                  {conversations.length > 0 ? (
                    conversations.map((conversation) => (
                      <Link key={conversation.id} href={`/chat/${conversation.id}`} className="block">
                        <div className="rounded-md border border-gray-400 p-3 hover:bg-muted/50">
                          <h3 className="font-medium">{conversation.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {conversation.createdAt.toLocaleString(undefined, {
                              timeStyle: "short",
                              dateStyle: "medium",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No recent conversations</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-400">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-light">Active Connections</h2>
                <div className="space-y-4">
                  {databases.map((db) => (
                    <div
                      key={db.id}
                      className="flex items-center justify-between rounded-md border border-gray-400 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-cognign-blue" strokeWidth={1.4} />
                        <div>
                          <h3 className="font-medium">{db.name}</h3>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          db.status === "active"
                            ? "bg-cognign-green/10 text-cognign-green"
                            : db.status === "testing"
                              ? "bg-cognign-yellow/10 text-cognign-orange"
                              : "bg-cognign-red/10 text-cognign-red"
                        }`}
                      >
                        {db.status === "active" ? "Active" : db.status === "testing" ? "Testing" : "Error"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-400">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-light">Saved Insights</h2>
                {insights.length > 0 ? (
                  insights.map((insight) => (
                    <div key={insight.id} className="space-y-2">
                      <div className="h-32 rounded-md bg-muted p-4">
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          Chart Preview
                        </div>
                      </div>
                      <h3 className="font-medium">{insight.title}</h3>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No saved insights</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Link href="/connections/new">
              <Button variant="outline" className="flex h-24 w-full items-center justify-center gap-2 border-gray-400">
                <PlusIcon className="h-5 w-5" strokeWidth={1.4} />
                <span>Connect Database</span>
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="outline" className="flex h-24 w-full items-center justify-center gap-2 border-gray-400">
                <LineChart className="h-5 w-5" strokeWidth={1.4} />
                <span>View Trends</span>
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="flex h-24 w-full items-center justify-center gap-2 border-gray-400">
                <Download className="h-5 w-5" strokeWidth={1.4} />
                <span>Download Report</span>
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" className="flex h-24 w-full items-center justify-center gap-2 border-gray-400">
                <Settings className="h-5 w-5" strokeWidth={1.4} />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-400 py-4 text-center text-sm text-muted-foreground">
        © 2025 DataChat. All rights reserved.
      </footer>
    </div>
  )
}
