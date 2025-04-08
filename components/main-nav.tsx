"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Database } from "lucide-react"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      name: "Connections",
      href: "/connections",
      active: pathname === "/connections",
    },
    {
      name: "Insights",
      href: "/insights",
      active: pathname === "/insights",
    },
    {
      name: "Support",
      href: "/support",
      active: pathname === "/support",
    },
  ]

  return (
    <div className="mr-4 flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Database className="h-6 w-6 text-cognign-blue" />
        <span className="text-xl font-light">DataChat</span>
      </Link>
      <nav className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm transition-colors hover:text-cognign-red",
              item.active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
