"use client"

import { X, Link, Flag, EyeOff, User, Bookmark, UserMinus } from "lucide-react"
import type { Post } from "../../types/post"

interface PostOptionsModalProps {
  post: Post
  isFollowing: boolean
  onClose: () => void
  onFollow: () => void
}

export default function PostOptionsModal({ post, isFollowing, onClose, onFollow }: PostOptionsModalProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/post/${post.id}`)
    console.log("Link copied to clipboard")
    onClose()
  }

  const handleReport = () => {
    console.log(`Reporting post ${post.id}`)
    onClose()
  }

  const handleNotInterested = () => {
    console.log(`Not interested in post ${post.id}`)
    onClose()
  }

  const handleAboutAccount = () => {
    console.log(`About account ${post.user.username}`)
    onClose()
  }

  const handleSave = () => {
    console.log(`Saving post ${post.id}`)
    onClose()
  }

  const handleUnfollow = () => {
    onFollow()
    onClose()
  }

  const options = [
    {
      icon: Link,
      label: "Copy link",
      action: handleCopyLink,
      color: "text-gray-700",
    },
    {
      icon: Bookmark,
      label: "Save",
      action: handleSave,
      color: "text-gray-700",
    },
    {
      icon: EyeOff,
      label: "Not interested",
      action: handleNotInterested,
      color: "text-gray-700",
    },
    {
      icon: User,
      label: "About this account",
      action: handleAboutAccount,
      color: "text-gray-700",
    },
    ...(isFollowing
      ? [
          {
            icon: UserMinus,
            label: "Unfollow",
            action: handleUnfollow,
            color: "text-red-600",
          },
        ]
      : []),
    {
      icon: Flag,
      label: "Report",
      action: handleReport,
      color: "text-red-600",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Post options</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="py-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="flex items-center space-x-3 w-full p-4 hover:bg-gray-50 transition-colors"
            >
              <option.icon className={`w-5 h-5 ${option.color}`} />
              <span className={`font-medium ${option.color}`}>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Cancel */}
        <div className="border-t">
          <button
            onClick={onClose}
            className="w-full p-4 text-center font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
