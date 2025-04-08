"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DatabaseIcon, CircleDot, Server } from "lucide-react"
import { cn } from "@/lib/utils"

type DatabaseType = "postgres" | "mysql" | "sqlserver"

interface DatabaseConnectionFormProps {
  onConnect: (data: any) => void
  onCancel: () => void
}

export function DatabaseConnectionForm({ onConnect, onCancel }: DatabaseConnectionFormProps) {
  const [step, setStep] = useState<"select" | "credentials" | "test">("select")
  const [dbType, setDbType] = useState<DatabaseType | null>(null)
  const [formData, setFormData] = useState({
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
    ssl: false,
  })

  const handleSelectDatabase = (type: DatabaseType) => {
    setDbType(type)
    setStep("credentials")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConnect({
      type: dbType,
      ...formData,
    })
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatabaseIcon className="h-6 w-6 text-cognign-blue" strokeWidth={1.4} />
          <h1 className="text-xl font-light">Connect Your Database</h1>
        </div>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-400">
          <div
            className={cn(
              "border-b-2 px-4 py-2 font-medium",
              step === "select" ? "border-cognign-blue" : "border-transparent text-muted-foreground",
            )}
          >
            Select Database
          </div>
          <div
            className={cn(
              "border-b-2 px-4 py-2 font-medium",
              step === "credentials" ? "border-cognign-blue" : "border-transparent text-muted-foreground",
            )}
          >
            Enter Credentials
          </div>
          <div
            className={cn(
              "border-b-2 px-4 py-2 font-medium",
              step === "test" ? "border-cognign-blue" : "border-transparent text-muted-foreground",
            )}
          >
            Test & Connect
          </div>
        </div>
      </div>

      {step === "select" && (
        <div className="grid grid-cols-3 gap-4">
          <button
            className="flex flex-col items-center justify-center rounded-lg border border-gray-400 p-6 hover:bg-muted/50"
            onClick={() => handleSelectDatabase("postgres")}
          >
            <CircleDot className="mb-4 h-12 w-12 text-cognign-red" strokeWidth={1.4} />
            <span className="font-medium">PostgreSQL</span>
          </button>
          <button
            className="flex flex-col items-center justify-center rounded-lg border border-gray-400 p-6 hover:bg-muted/50"
            onClick={() => handleSelectDatabase("mysql")}
          >
            <DatabaseIcon className="mb-4 h-12 w-12 text-cognign-green" strokeWidth={1.4} />
            <span className="font-medium">MySQL</span>
          </button>
          <button
            className="flex flex-col items-center justify-center rounded-lg border border-gray-400 p-6 hover:bg-muted/50"
            onClick={() => handleSelectDatabase("sqlserver")}
          >
            <Server className="mb-4 h-12 w-12 text-cognign-blue" strokeWidth={1.4} />
            <span className="font-medium">SQL Server</span>
          </button>
        </div>
      )}

      {step === "credentials" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="host">Host / IP Address</Label>
            <Input
              id="host"
              name="host"
              placeholder="e.g., localhost or 123.456.789.0"
              value={formData.host}
              onChange={handleInputChange}
              className="border-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port Number</Label>
            <Input
              id="port"
              name="port"
              placeholder="e.g., 5432"
              value={formData.port}
              onChange={handleInputChange}
              className="border-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="database">Database Name</Label>
            <Input
              id="database"
              name="database"
              placeholder="Enter database name"
              value={formData.database}
              onChange={handleInputChange}
              className="border-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              className="border-gray-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="border-gray-400"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ssl"
              name="ssl"
              checked={formData.ssl}
              onCheckedChange={(checked) => setFormData({ ...formData, ssl: checked as boolean })}
              className="border-gray-400 data-[state=checked]:bg-cognign-blue data-[state=checked]:border-cognign-blue"
            />
            <Label htmlFor="ssl">Enable SSL Connection</Label>
          </div>
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => setStep("select")} className="border-gray-400">
              Back
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={() => setStep("test")} className="border-gray-400">
                Test Connection
              </Button>
              <Button type="submit" className="bg-cognign-blue hover:bg-cognign-blue/90">
                Connect
              </Button>
            </div>
          </div>
        </form>
      )}

      {step === "test" && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-400 p-4">
            <h3 className="mb-2 font-light">Connection Details</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Type:</span> {dbType}
              </p>
              <p>
                <span className="font-medium">Host:</span> {formData.host}
              </p>
              <p>
                <span className="font-medium">Port:</span> {formData.port}
              </p>
              <p>
                <span className="font-medium">Database:</span> {formData.database}
              </p>
              <p>
                <span className="font-medium">Username:</span> {formData.username}
              </p>
              <p>
                <span className="font-medium">SSL:</span> {formData.ssl ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep("credentials")} className="border-gray-400">
              Back
            </Button>
            <Button
              type="button"
              onClick={() => onConnect({ type: dbType, ...formData })}
              className="bg-cognign-blue hover:bg-cognign-blue/90"
            >
              Connect
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
