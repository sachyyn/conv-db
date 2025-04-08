import type { Database, Conversation, Insight, TableSchema } from "@/types"

export const mockDatabases: Database[] = [
  {
    id: "1",
    name: "Production DB",
    type: "postgres",
    host: "production.example.com",
    port: 5432,
    database: "production",
    username: "admin",
    password: "********",
    ssl: true,
    status: "active",
  },
  {
    id: "2",
    name: "Analytics DB",
    type: "mysql",
    host: "analytics.example.com",
    port: 3306,
    database: "analytics",
    username: "analyst",
    password: "********",
    ssl: false,
    status: "testing",
  },
]

export const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Sales analysis for Q4",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messages: [
      {
        id: "1",
        role: "user",
        content: "Show me sales trends for the last 6 months",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
                borderColor: "hsl(var(--chart-1))",
                backgroundColor: "hsl(var(--chart-1) / 0.1)",
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: "2",
    title: "Revenue Report",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    messages: [
      {
        id: "1",
        role: "user",
        content: "What was our Q1 2025 revenue?",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        sql: `SELECT SUM(amount) as total_revenue
FROM sales
WHERE sale_date BETWEEN '2025-01-01' AND '2025-03-31';`,
        visualization: {
          type: "bar",
          data: {
            labels: ["January", "February", "March"],
            datasets: [
              {
                label: "Revenue",
                data: [65000, 72000, 81000],
                backgroundColor: "hsl(var(--chart-1))",
              },
            ],
          },
        },
      },
    ],
  },
]

export const mockInsights: Insight[] = [
  {
    id: "1",
    title: "Monthly Revenue Trends",
    description: "Revenue trends over the past 12 months",
    visualization: {
      type: "line",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [
          {
            label: "Revenue",
            data: [42000, 45000, 48000, 51000, 53000, 57000, 60000, 65000, 70000, 65000, 72000, 81000],
            borderColor: "hsl(var(--chart-1))",
            backgroundColor: "hsl(var(--chart-1) / 0.1)",
          },
        ],
      },
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
]

export const mockTableSchema: TableSchema[] = [
  {
    name: "sales",
    columns: [
      {
        name: "id",
        type: "integer",
        isPrimary: true,
        isForeign: false,
      },
      {
        name: "customer_id",
        type: "integer",
        isPrimary: false,
        isForeign: true,
        references: {
          table: "customers",
          column: "id",
        },
      },
      {
        name: "product_id",
        type: "integer",
        isPrimary: false,
        isForeign: true,
        references: {
          table: "products",
          column: "id",
        },
      },
      {
        name: "sale_date",
        type: "timestamp",
        isPrimary: false,
        isForeign: false,
      },
      {
        name: "amount",
        type: "numeric",
        isPrimary: false,
        isForeign: false,
      },
      {
        name: "quantity",
        type: "integer",
        isPrimary: false,
        isForeign: false,
      },
    ],
  },
]

export const mockSuggestedQueries = [
  "Try asking about revenue trends",
  "Compare monthly sales growth",
  "Show top selling products",
  "Analyze customer retention",
]

export const mockUser = {
  id: "1",
  name: "Alex",
  email: "alex@example.com",
  image: "/placeholder.svg?height=32&width=32",
}
