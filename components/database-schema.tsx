"use client"

import type { TableSchema } from "@/types"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DatabaseSchemaProps {
  tables: TableSchema[]
  suggestedQueries: string[]
}

export function DatabaseSchema({ tables, suggestedQueries }: DatabaseSchemaProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedTable, setExpandedTable] = useState<string | null>(null)

  const filteredTables = tables.filter((table) => table.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <h2 className="mb-2 text-lg font-light">Database Schema</h2>
        <Input
          placeholder="Search tables..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-2">
          {filteredTables.map((table) => (
            <div key={table.name} className="rounded-md border border-gray-400">
              <button
                className="flex w-full items-center justify-between p-2 text-left hover:bg-muted/50"
                onClick={() => setExpandedTable(expandedTable === table.name ? null : table.name)}
              >
                <span className="font-medium">{table.name}</span>
                <ChevronRight
                  className={cn("h-4 w-4 transition-transform", expandedTable === table.name && "rotate-90")}
                  strokeWidth={1.4}
                />
              </button>
              {expandedTable === table.name && (
                <div className="border-t border-gray-400 p-2">
                  <ul className="space-y-1 text-sm">
                    {table.columns.map((column) => (
                      <li key={column.name} className="flex items-center justify-between">
                        <span className={cn(column.isPrimary && "font-medium", column.isForeign && "italic")}>
                          {column.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{column.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <h3 className="mb-2 text-sm font-light">Suggested Queries</h3>
        <ul className="space-y-2">
          {suggestedQueries.map((query, index) => (
            <li key={index}>
              <button className="w-full rounded-md border border-gray-400 p-2 text-left text-sm hover:bg-muted/50">
                {query}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
