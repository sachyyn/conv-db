"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Mic, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSend, isLoading = false }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-gray-400 bg-background p-4">
      <Button type="button" size="icon" variant="ghost" className="flex-shrink-0">
        <Paperclip className="h-5 w-5" strokeWidth={1.4} />
        <span className="sr-only">Attach file</span>
      </Button>
      <div className="relative flex-1">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="min-h-[56px] resize-none border-gray-400 pr-12"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
        <div className="absolute bottom-1 right-1 flex items-center gap-1">
          <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
            <Mic className="h-4 w-4" strokeWidth={1.4} />
            <span className="sr-only">Voice input</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            className={cn(
              "h-8 w-8 bg-cognign-blue hover:bg-cognign-blue/90",
              (!input.trim() || isLoading) && "opacity-50",
            )}
            disabled={!input.trim() || isLoading}
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
