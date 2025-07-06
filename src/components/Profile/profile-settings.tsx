"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { X, User, Lock, Bell, Eye, Shield, Trash2 } from "lucide-react"

interface ProfileSettingsProps {
  isOpen: boolean
  onClose: () => void
  profile: any
}

export default function ProfileSettings({ isOpen, onClose, profile }: ProfileSettingsProps) {
  const [activeSection, setActiveSection] = useState("profile")
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
  })

  const sections = [
    { id: "profile", label: "Edit Profile", icon: User },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "visibility", label: "Visibility", icon: Eye },
    { id: "security", label: "Security", icon: Shield },
    { id: "account", label: "Account", icon: Trash2 },
  ]

  if (!isOpen) return null

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Name</label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Username</label>
        <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Bio</label>
        <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Location</label>
        <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Website</label>
        <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      {[
        { label: "Private Account", description: "Only followers can see your posts" },
        { label: "Hide Activity Status", description: "Don't show when you're active" },
        { label: "Hide Story Views", description: "Don't show who viewed your stories" },
        { label: "Allow Message Requests", description: "Let people message you" },
      ].map((setting, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{setting.label}</p>
            <p className="text-sm text-muted-foreground">{setting.description}</p>
          </div>
          <Switch />
        </div>
      ))}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Settings</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
            {/* Sidebar */}
            <div className="md:col-span-1 border-r border-border p-4">
              <div className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id ? "bg-foreground text-background" : "hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{section.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-6">
              <h3 className="text-lg font-semibold mb-6">{sections.find((s) => s.id === activeSection)?.label}</h3>

              {activeSection === "profile" && renderProfileSettings()}
              {activeSection === "privacy" && renderPrivacySettings()}
              {activeSection === "notifications" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Notification settings coming soon</p>
                </div>
              )}
              {activeSection === "visibility" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Visibility settings coming soon</p>
                </div>
              )}
              {activeSection === "security" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Security settings coming soon</p>
                </div>
              )}
              {activeSection === "account" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Account management coming soon</p>
                </div>
              )}

              {activeSection === "profile" && (
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
