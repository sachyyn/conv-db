"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUser } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [user, setUser] = useState(mockUser)
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailUpdates: false,
    autoSaveInsights: true,
    defaultVisualization: "line",
    language: "en",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-2xl font-light">Settings</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3 border-gray-400">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card className="border-gray-400">
                <CardHeader>
                  <CardTitle className="font-light">Profile Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="bg-cognign-blue text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm" className="border-gray-400">
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="border-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="border-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                      <SelectTrigger id="language" className="border-gray-400">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-cognign-blue hover:bg-cognign-blue/90">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appearance">
              <Card className="border-gray-400">
                <CardHeader>
                  <CardTitle className="font-light">Appearance</CardTitle>
                  <CardDescription>Customize how DataChat looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                      className="data-[state=checked]:bg-cognign-blue data-[state=checked]:border-cognign-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-visualization">Default Visualization</Label>
                    <Select
                      value={settings.defaultVisualization}
                      onValueChange={(value) => handleSettingChange("defaultVisualization", value)}
                    >
                      <SelectTrigger id="default-visualization" className="border-gray-400">
                        <SelectValue placeholder="Select visualization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="scatter">Scatter Plot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-cognign-blue hover:bg-cognign-blue/90">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card className="border-gray-400">
                <CardHeader>
                  <CardTitle className="font-light">Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications within the application</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={settings.notifications}
                      onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                      className="data-[state=checked]:bg-cognign-blue data-[state=checked]:border-cognign-blue"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-updates">Email Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive updates and insights via email</p>
                    </div>
                    <Switch
                      id="email-updates"
                      checked={settings.emailUpdates}
                      onCheckedChange={(checked) => handleSettingChange("emailUpdates", checked)}
                      className="data-[state=checked]:bg-cognign-blue data-[state=checked]:border-cognign-blue"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-save">Auto-Save Insights</Label>
                      <p className="text-sm text-muted-foreground">Automatically save generated insights</p>
                    </div>
                    <Switch
                      id="auto-save"
                      checked={settings.autoSaveInsights}
                      onCheckedChange={(checked) => handleSettingChange("autoSaveInsights", checked)}
                      className="data-[state=checked]:bg-cognign-blue data-[state=checked]:border-cognign-blue"
                    />
                  </div>
                  <Button className="bg-cognign-blue hover:bg-cognign-blue/90">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t border-gray-400 py-4 text-center text-sm text-muted-foreground">
        © 2025 DataChat. All rights reserved.
      </footer>
    </div>
  )
}
