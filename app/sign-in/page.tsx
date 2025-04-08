import { SignIn } from "@clerk/nextjs"
import { Database } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mb-8 flex items-center space-x-2">
        <Database className="h-8 w-8 text-cognign-blue" />
        <span className="text-2xl font-light">DataChat</span>
      </div>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-cognign-blue hover:bg-cognign-blue/90",
            card: "border border-gray-400",
            headerTitle: "font-light",
            headerSubtitle: "text-muted-foreground",
          },
        }}
      />
    </div>
  )
}
