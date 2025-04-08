"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDatabases } from "@/lib/mock-data"
import { Database, Plus, Trash2, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Database as DatabaseType } from "@/types"

export default function ConnectionsPage() {
  const router = useRouter()
  const [databases, setDatabases] = useState<DatabaseType[]>(mockDatabases)

  const handleDeleteDatabase = (id: string) => {
    setDatabases(databases.filter((db) => db.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-light">Database Connections</h1>
            <Button
              onClick={() => router.push("/connections/new")}
              className="bg-cognign-blue hover:bg-cognign-blue/90"
            >
              <Plus className="mr-2 h-4 w-4" strokeWidth={1.4} /> Add Connection
            </Button>
          </div>

          {databases.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {databases.map((db) => (
                <Card key={db.id} className="border-gray-400">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-cognign-blue" strokeWidth={1.4} />
                        <CardTitle className="font-light">{db.name}</CardTitle>
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
                    <CardDescription>
                      {db.type} • {db.host}:{db.port}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 text-sm">
                      <p>
                        <span className="font-medium">Database:</span> {db.database}
                      </p>
                      <p>
                        <span className="font-medium">Username:</span> {db.username}
                      </p>
                      <p>
                        <span className="font-medium">SSL:</span> {db.ssl ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-gray-400">
                        <RefreshCw className="mr-2 h-4 w-4" strokeWidth={1.4} />
                        Test
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-400 text-cognign-red hover:text-cognign-red"
                        onClick={() => handleDeleteDatabase(db.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" strokeWidth={1.4} />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-gray-400">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Database className="mb-4 h-12 w-12 text-muted-foreground" strokeWidth={1.4} />
                <h2 className="mb-2 text-xl font-light">No Connections</h2>
                <p className="mb-4 text-center text-muted-foreground">
                  You haven't added any database connections yet.
                </p>
                <Button
                  onClick={() => router.push("/connections/new")}
                  className="bg-cognign-blue hover:bg-cognign-blue/90"
                >
                  <Plus className="mr-2 h-4 w-4" strokeWidth={1.4} /> Add Connection
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
