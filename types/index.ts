export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Database {
  id: string
  name: string
  type: "postgres" | "mysql" | "sqlserver"
  host: string
  port: number
  database: string
  username: string
  password: string
  ssl: boolean
  status: "active" | "testing" | "error"
}

export interface Conversation {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messages: Message[]
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
  sql?: string
  visualization?: Visualization
}

export interface Visualization {
  type: "line" | "bar" | "pie" | "scatter"
  data: any
  options?: any
}

export interface Insight {
  id: string
  title: string
  description?: string
  visualization: Visualization
  createdAt: Date
  updatedAt: Date
}

export interface TableSchema {
  name: string
  columns: Column[]
}

export interface Column {
  name: string
  type: string
  isPrimary: boolean
  isForeign: boolean
  references?: {
    table: string
    column: string
  }
}
