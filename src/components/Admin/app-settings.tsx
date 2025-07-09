"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Palette, Bell, Wrench, FileText, ToggleLeft } from "lucide-react"

export function AppSettings() {
  const [settings, setSettings] = useState({
    appName: "Social Media App",
    appDescription: "Connect with friends and share your moments",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    storiesEnabled: true,
    reelsEnabled: true,
    commentsEnabled: true,
    likesEnabled: true,
    sharingEnabled: true,
    darkModeEnabled: true,
    pushNotificationsEnabled: true,
    emailNotificationsEnabled: true,
    privacyPolicy: "",
    termsOfService: "",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">App Settings</h1>
          <p className="text-muted-foreground">Configure your social media platform</p>
        </div>
        <Button>Save All Changes</Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>Basic application configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input
                    id="appName"
                    value={settings.appName}
                    onChange={(e) => handleSettingChange("appName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appUrl">Application URL</Label>
                  <Input id="appUrl" placeholder="https://yourapp.com" defaultValue="https://socialmedia.app" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appDescription">Application Description</Label>
                <Textarea
                  id="appDescription"
                  value={settings.appDescription}
                  onChange={(e) => handleSettingChange("appDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Registration</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => handleSettingChange("registrationEnabled", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their email before accessing the app
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailVerificationRequired}
                    onCheckedChange={(checked) => handleSettingChange("emailVerificationRequired", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Theme & Branding</span>
              </CardTitle>
              <CardDescription>Customize the look and feel of your app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-500 rounded border"></div>
                    <Input defaultValue="#3B82F6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-500 rounded border"></div>
                    <Input defaultValue="#6B7280" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Allow users to switch to dark theme</p>
                </div>
                <Switch
                  checked={settings.darkModeEnabled}
                  onCheckedChange={(checked) => handleSettingChange("darkModeEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ToggleLeft className="h-5 w-5" />
                <span>Feature Toggles</span>
              </CardTitle>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Content Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Stories</Label>
                        <p className="text-sm text-muted-foreground">24-hour disappearing content</p>
                      </div>
                      <Switch
                        checked={settings.storiesEnabled}
                        onCheckedChange={(checked) => handleSettingChange("storiesEnabled", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Reels</Label>
                        <p className="text-sm text-muted-foreground">Short-form video content</p>
                      </div>
                      <Switch
                        checked={settings.reelsEnabled}
                        onCheckedChange={(checked) => handleSettingChange("reelsEnabled", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Comments</Label>
                        <p className="text-sm text-muted-foreground">Allow users to comment on posts</p>
                      </div>
                      <Switch
                        checked={settings.commentsEnabled}
                        onCheckedChange={(checked) => handleSettingChange("commentsEnabled", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Interaction Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Likes</Label>
                        <p className="text-sm text-muted-foreground">Allow users to like content</p>
                      </div>
                      <Switch
                        checked={settings.likesEnabled}
                        onCheckedChange={(checked) => handleSettingChange("likesEnabled", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Sharing</Label>
                        <p className="text-sm text-muted-foreground">Allow users to share content</p>
                      </div>
                      <Switch
                        checked={settings.sharingEnabled}
                        onCheckedChange={(checked) => handleSettingChange("sharingEnabled", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Privacy Policy & Terms</span>
              </CardTitle>
              <CardDescription>Manage legal documents and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                <Textarea
                  id="privacyPolicy"
                  placeholder="Enter your privacy policy content..."
                  value={settings.privacyPolicy}
                  onChange={(e) => handleSettingChange("privacyPolicy", e.target.value)}
                  rows={8}
                />
                <p className="text-sm text-muted-foreground">This will be displayed on your privacy policy page</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="termsOfService">Terms of Service</Label>
                <Textarea
                  id="termsOfService"
                  placeholder="Enter your terms of service content..."
                  value={settings.termsOfService}
                  onChange={(e) => handleSettingChange("termsOfService", e.target.value)}
                  rows={8}
                />
                <p className="text-sm text-muted-foreground">This will be displayed on your terms of service page</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline">Preview Privacy Policy</Button>
                <Button variant="outline">Preview Terms of Service</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>Configure how notifications are sent to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send push notifications to mobile devices</p>
                  </div>
                  <Switch
                    checked={settings.pushNotificationsEnabled}
                    onCheckedChange={(checked) => handleSettingChange("pushNotificationsEnabled", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotificationsEnabled}
                    onCheckedChange={(checked) => handleSettingChange("emailNotificationsEnabled", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Notification Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">Edit Welcome Email</Button>
                  <Button variant="outline">Edit Password Reset</Button>
                  <Button variant="outline">Edit New Follower</Button>
                  <Button variant="outline">Edit Post Liked</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>Maintenance Mode</span>
              </CardTitle>
              <CardDescription>Control access to your application during maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">When enabled, only admins can access the application</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>

              {settings.maintenanceMode && (
                <div className="space-y-4 p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                    <Textarea
                      id="maintenanceMessage"
                      placeholder="We're currently performing scheduled maintenance. Please check back soon!"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedTime">Estimated Completion Time</Label>
                    <Input id="estimatedTime" type="datetime-local" />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">45ms</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">1.2k</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
