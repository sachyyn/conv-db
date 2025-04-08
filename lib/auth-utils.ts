import { currentUser } from "@clerk/nextjs/server"
import type { User } from "@/types"

export async function getCurrentUser(): Promise<User | null> {
  const user = await currentUser()

  if (!user) {
    return null
  }

  return {
    id: user.id,
    name: user.fullName || "",
    email: user.primaryEmailAddress?.emailAddress || "",
    image: user.imageUrl,
  }
}
