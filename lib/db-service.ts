"use server"

import type { TableSchema } from "@/types"
import { mockTableSchema } from "./mock-data"

export async function getTableSchema(databaseId: string): Promise<TableSchema[]> {
  // In a real implementation, this would query the database to get the schema
  // For now, we'll return mock data
  return mockTableSchema
}

export async function executeQuery(databaseId: string, sql: string): Promise<any> {
  // In a real implementation, this would execute the SQL query against the database
  // For now, we'll return mock data

  if (sql.includes("date_trunc('month', sale_date)")) {
    return {
      columns: ["month", "total_sales"],
      rows: [
        { month: "2024-10-01", total_sales: 12000 },
        { month: "2024-11-01", total_sales: 19000 },
        { month: "2024-12-01", total_sales: 25000 },
        { month: "2025-01-01", total_sales: 18000 },
        { month: "2025-02-01", total_sales: 22000 },
        { month: "2025-03-01", total_sales: 30000 },
      ],
    }
  } else if (sql.includes("SUM(amount) as total_revenue")) {
    return {
      columns: ["total_revenue"],
      rows: [{ total_revenue: 218000 }],
    }
  } else {
    return {
      columns: ["id", "customer_id", "product_id", "sale_date", "amount", "quantity"],
      rows: [
        { id: 1, customer_id: 101, product_id: 201, sale_date: "2025-03-15", amount: 1200, quantity: 2 },
        { id: 2, customer_id: 102, product_id: 202, sale_date: "2025-03-16", amount: 850, quantity: 1 },
        { id: 3, customer_id: 103, product_id: 203, sale_date: "2025-03-17", amount: 3200, quantity: 4 },
        { id: 4, customer_id: 104, product_id: 204, sale_date: "2025-03-18", amount: 1500, quantity: 3 },
        { id: 5, customer_id: 105, product_id: 205, sale_date: "2025-03-19", amount: 950, quantity: 1 },
      ],
    }
  }
}
