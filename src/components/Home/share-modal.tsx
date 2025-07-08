"use client"

import { X, Link, Send } from "lucide-react"
import type { Post } from "../../types/post"

interface Friend {
  id: string
  username: string
  avatar: string
  isOnline?: boolean
}

interface ShareModalProps {
  post: Post
  onClose: () => void
}

export default function ShareModal({ post, onClose }: ShareModalProps) {
  const friends: Friend[] = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
    username: `friend_${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i + 300}`,
    isOnline: Math.random() > 0.5,
  }))

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/post/${post.id}`)
    // You could add a toast notification here
    console.log("Link copied to clipboard")
  }

  const handleSendToFriend = (friendId: string) => {
    console.log(`Sending post ${post.id} to friend ${friendId}`)
    // Handle sending logic here
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Share post</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Link Option */}
        <div className="p-4 border-b">
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Link className="w-5 h-5 text-gray-600" />
            </div>
            <span className="font-medium">Copy link</span>
          </button>
        </div>

        {/* Send to Friends */}
        <div className="p-4">
          <h4 className="font-medium mb-3 text-gray-700">Send to friends</h4>
          <div className="max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => handleSendToFriend(friend.id)}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="relative">
                    <img
                      src={friend.avatar || "/placeholder.svg"}
                      alt={friend.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {friend.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{friend.username}</p>
                    <p className="text-xs text-gray-500">{friend.isOnline ? "Online" : "Offline"}</p>
                  </div>
                  <Send className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
