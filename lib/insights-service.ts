"use server"

export function generateInsights(data: any, query: string): string[] {
  // In a real implementation, this would analyze the data and generate insights
  // For now, we'll return mock insights

  if (query.toLowerCase().includes("sales") && query.toLowerCase().includes("trend")) {
    return [
      "Sales increased by 15% over the last quarter",
      "March shows the highest sales volume in the period",
      "There was a slight dip in January, likely due to post-holiday slowdown",
    ]
  } else if (query.toLowerCase().includes("revenue") && query.toLowerCase().includes("q1")) {
    return [
      "Q1 2025 revenue totaled $218,000",
      "This represents a 12% increase compared to Q1 2024",
      "March was the strongest month, contributing 45% of quarterly revenue",
    ]
  } else {
    return [
      "The average transaction amount is $1,540",
      "Customer 103 made the largest purchase at $3,200",
      "Most sales occurred in the latter half of March",
    ]
  }
}
