import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, FileQuestion, BookOpen, Mail } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-2xl font-light">Support</h1>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-gray-400">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-light">
                  <MessageSquare className="h-5 w-5 text-cognign-red" strokeWidth={1.4} />
                  Live Chat
                </CardTitle>
                <CardDescription>Chat with our support team in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">Available Monday to Friday, 9am to 5pm EST</p>
                <Button className="w-full bg-cognign-blue hover:bg-cognign-blue/90">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="border-gray-400">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-light">
                  <FileQuestion className="h-5 w-5 text-cognign-green" strokeWidth={1.4} />
                  FAQ
                </CardTitle>
                <CardDescription>Browse our frequently asked questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">Find answers to common questions about DataChat</p>
                <Button variant="outline" className="w-full border-gray-400">
                  View FAQ
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-400">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-light">
                  <BookOpen className="h-5 w-5 text-cognign-blue" strokeWidth={1.4} />
                  Documentation
                </CardTitle>
                <CardDescription>Explore our detailed documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Learn how to use DataChat with our comprehensive guides
                </p>
                <Button variant="outline" className="w-full border-gray-400">
                  Read Docs
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-gray-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-light">
                <Mail className="h-5 w-5 text-cognign-red" strokeWidth={1.4} />
                Contact Us
              </CardTitle>
              <CardDescription>Send us a message and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <Input id="name" placeholder="Enter your name" className="border-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" className="border-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subject
                  </label>
                  <Input id="subject" placeholder="Enter subject" className="border-gray-400" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <Textarea id="message" placeholder="Enter your message" className="min-h-[150px] border-gray-400" />
                </div>
                <Button type="submit" className="bg-cognign-blue hover:bg-cognign-blue/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-gray-400 p-6">
            <h2 className="mb-4 text-xl font-light">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">How do I connect to my database?</h3>
                <p className="text-sm text-muted-foreground">
                  You can connect to your database by going to the Connections page and clicking on "Add Connection".
                  Follow the steps to enter your database credentials.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Is my data secure?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we take security seriously. All connections are encrypted and we never store your database
                  credentials. We only store the metadata needed to establish connections.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium">What types of databases are supported?</h3>
                <p className="text-sm text-muted-foreground">
                  Currently, we support PostgreSQL, MySQL, and SQL Server. We are working on adding support for more
                  database types in the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-400 py-4 text-center text-sm text-muted-foreground">
        © 2025 DataChat. All rights reserved.
      </footer>
    </div>
  )
}
