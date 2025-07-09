"use client"

import type React from "react"

import { Search, Phone, Video, Info, Send, Smile, ImageIcon, Mic, Settings, ArrowLeft } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"

interface Conversation {
  id: number
  user: {
    name: string
    username: string
    avatar: string
    isOnline: boolean
    lastSeen?: string
  }
  lastMessage: {
    text: string
    time: string
    isRead: boolean
    isFromMe: boolean
  }
  unreadCount: number
}

interface Message {
  id: number
  text: string
  time: string
  isFromMe: boolean
  type: "text" | "image" | "voice"
  imageUrl?: string
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Navigate to user profile
  const handleProfileClick = (username: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    navigate(`/profile/${username}`)
  }

  const conversations: Conversation[] = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        username: "alexj_photo",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      lastMessage: {
        text: "Hey! How are you doing?",
        time: "2m",
        isRead: false,
        isFromMe: false,
      },
      unreadCount: 2,
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        username: "mike_chen",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
        lastSeen: "5m ago",
      },
      lastMessage: {
        text: "Thanks for sharing that photo!",
        time: "1h",
        isRead: true,
        isFromMe: true,
      },
      unreadCount: 0,
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        username: "emma_wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      lastMessage: {
        text: "See you tomorrow!",
        time: "3h",
        isRead: true,
        isFromMe: false,
      },
      unreadCount: 0,
    },
    {
      id: 4,
      user: {
        name: "Sarah Wilson",
        username: "sarah_wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
        lastSeen: "1h ago",
      },
      lastMessage: {
        text: "That sounds great!",
        time: "1d",
        isRead: true,
        isFromMe: true,
      },
      unreadCount: 0,
    },
  ]

  const messages: Message[] = [
    {
      id: 1,
      text: "Hey! How's your day going?",
      time: "10:30 AM",
      isFromMe: false,
      type: "text",
    },
    {
      id: 2,
      text: "Pretty good! Just finished a great workout. How about you?",
      time: "10:32 AM",
      isFromMe: true,
      type: "text",
    },
    {
      id: 3,
      text: "That's awesome! I'm just working on some new designs.",
      time: "10:35 AM",
      isFromMe: false,
      type: "text",
    },
    {
      id: 4,
      text: "/placeholder.svg?height=200&width=300",
      time: "10:36 AM",
      isFromMe: false,
      type: "image",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      text: "Wow, that looks amazing! 🔥",
      time: "10:38 AM",
      isFromMe: true,
      type: "text",
    },
    {
      id: 6,
      text: "Thanks! I'm really excited about this project.",
      time: "10:40 AM",
      isFromMe: false,
      type: "text",
    },
  ]

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-select first conversation on desktop
  useEffect(() => {
    if (conversations.length > 0 && !isMobile) {
      setSelectedConversation(conversations[0].id)
    }
  }, [isMobile])

  // Scroll to bottom when conversation changes or new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation, messages.length])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  const handleBackToConversations = () => {
    setSelectedConversation(null)
  }

  const showConversationsList = !selectedConversation || !isMobile
  const showChatArea = selectedConversation && (!isMobile || selectedConversation)

  return (
    <div className="h-screen bg-background overflow-hidden">
      <div className="h-full flex">
        {/* Conversations List */}
        <div
          className={`
          ${showConversationsList ? "flex" : "hidden"}
          ${isMobile ? "w-full" : "w-80 lg:w-96"}
          bg-card/50 backdrop-blur-sm border-r border-border flex-col
        `}
        >
          {/* Messages Header */}
          <div className="p-4 sm:p-6 border-b border-border/50 bg-card/80 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Messages</h1>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground text-sm transition-all"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`
                  p-3 sm:p-4 border-b border-border/30 cursor-pointer transition-all duration-200 hover:bg-muted/50 active:bg-muted/70
                  ${selectedConversation === conversation.id && !isMobile ? "bg-primary/10 border-l-4 border-l-primary" : ""}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={conversation.user.avatar || "/placeholder.svg"}
                      alt={conversation.user.name}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover ring-2 ring-primary/10 cursor-pointer hover:ring-primary/30 transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProfileClick(conversation.user.username)
                      }}
                    />
                    {conversation.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className="font-semibold text-foreground truncate text-sm sm:text-base cursor-pointer hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProfileClick(conversation.user.username)
                        }}
                      >
                        {conversation.user.name}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {conversation.lastMessage.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p
                        className={`
                        text-xs sm:text-sm truncate pr-2
                        ${conversation.lastMessage.isRead ? "text-muted-foreground" : "text-foreground font-medium"}
                      `}
                      >
                        {conversation.lastMessage.isFromMe ? "You: " : ""}
                        {conversation.lastMessage.text}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 shadow-md">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {showChatArea && selectedConv ? (
          <div
            className={`
            ${isMobile ? "w-full" : "flex-1"}
            flex flex-col bg-background min-w-0
          `}
          >
            {/* Chat Header */}
            <div className="p-4 sm:p-6 border-b border-border/50 flex items-center justify-between bg-card/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                {isMobile && (
                  <button
                    onClick={handleBackToConversations}
                    className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
                <div className="relative flex-shrink-0">
                  <img
                    src={selectedConv.user.avatar || "/placeholder.svg"}
                    alt={selectedConv.user.name}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover ring-2 ring-primary/10 cursor-pointer hover:ring-primary/30 transition-all"
                    onClick={() => handleProfileClick(selectedConv.user.username)}
                  />
                  {selectedConv.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>
                <div className="min-w-0">
                  <h2
                    className="font-semibold text-foreground text-base sm:text-lg truncate cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleProfileClick(selectedConv.user.username)}
                  >
                    {selectedConv.user.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {selectedConv.user.isOnline ? "Active now" : `Last seen ${selectedConv.user.lastSeen}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <button className="p-2 sm:p-3 hover:bg-muted rounded-full transition-colors">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                </button>
                <button className="p-2 sm:p-3 hover:bg-muted rounded-full transition-colors">
                  <Video className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                </button>
                <button
                  className="p-2 sm:p-3 hover:bg-muted rounded-full transition-colors"
                  onClick={() => handleProfileClick(selectedConv.user.username)}
                >
                  <Info className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-background to-muted/10 min-h-0">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`
                    max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md
                    ${
                      message.isFromMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-card-foreground border border-border/50"
                    }
                  `}
                  >
                    {message.type === "image" ? (
                      <img
                        src={message.imageUrl || "/placeholder.svg"}
                        alt="Shared image"
                        className="rounded-lg max-w-full h-auto"
                      />
                    ) : (
                      <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    )}
                    <p
                      className={`
                      text-xs mt-2 opacity-70
                      ${message.isFromMe ? "text-primary-foreground" : "text-muted-foreground"}
                    `}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 sm:p-6 border-t border-border/50 bg-card/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button className="p-2 sm:p-3 hover:bg-muted rounded-full transition-colors flex-shrink-0">
                  <ImageIcon className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2.5 sm:py-3 bg-muted/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground transition-all text-sm"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors">
                    <Smile className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <button className="p-2 sm:p-3 hover:bg-muted rounded-full transition-colors flex-shrink-0">
                  <Mic className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 sm:p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 flex-shrink-0"
                >
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : !isMobile ? (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
            <Card className="p-8 text-center border-0 shadow-lg bg-card/50 backdrop-blur-sm mx-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Your Messages</h3>
              <p className="text-muted-foreground">Send private messages to friends and family</p>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}
