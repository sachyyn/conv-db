"use client"
import { Header } from "@/components/header"
import { DatabaseConnectionForm } from "@/components/database-connection-form"
import { useRouter } from "next/navigation"

export default function NewConnectionPage() {
  const router = useRouter()

  const handleConnect = (data: any) => {
    console.log("Connection data:", data)
    // In a real app, we would save the connection to the database
    router.push("/connections")
  }

  const handleCancel = () => {
    router.push("/connections")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-6">
        <DatabaseConnectionForm onConnect={handleConnect} onCancel={handleCancel} />
      </main>
    </div>
  )
}
