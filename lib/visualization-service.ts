"use server"

export function generateVisualization(data: any, query: string): any {
  // In a real implementation, this would analyze the data and query to determine the best visualization
  // For now, we'll use simple rules

  if (query.toLowerCase().includes("trend") || query.toLowerCase().includes("over time")) {
    return {
      type: "line",
      data: {
        labels: data.rows.map((row: any) => {
          // Format date if it's a date
          if (row[data.columns[0]].includes("-")) {
            return new Date(row[data.columns[0]]).toLocaleDateString("en-US", {
              month: "short",
            })
          }
          return row[data.columns[0]]
        }),
        datasets: [
          {
            label: data.columns[1],
            data: data.rows.map((row: any) => row[data.columns[1]]),
            borderColor: "hsl(var(--chart-1))",
            backgroundColor: "hsl(var(--chart-1) / 0.1)",
          },
        ],
      },
    }
  } else if (data.columns.length === 1) {
    // Single value, no visualization needed
    return null
  } else if (data.rows.length <= 5) {
    return {
      type: "bar",
      data: {
        labels: data.rows.map((_: any, index: number) => `Item ${index + 1}`),
        datasets: [
          {
            label: data.columns[1],
            data: data.rows.map((row: any) => row[data.columns[1]]),
            backgroundColor: "hsl(var(--chart-1))",
          },
        ],
      },
    }
  } else {
    return {
      type: "line",
      data: {
        labels: data.rows.map((_: any, index: number) => `Item ${index + 1}`),
        datasets: [
          {
            label: data.columns[1],
            data: data.rows.map((row: any) => row[data.columns[1]]),
            borderColor: "hsl(var(--chart-1))",
            backgroundColor: "hsl(var(--chart-1) / 0.1)",
          },
        ],
      },
    }
  }
}
