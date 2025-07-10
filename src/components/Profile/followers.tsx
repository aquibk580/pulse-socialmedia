"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FollowersDialog } from "./followers-dialog"

export default function FollowersPage() {
  const navigate = useNavigate()
  const { username } = useParams<{ username: string }>()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    navigate(`/profile/${username}`)
  }

  if (!username) {
    return <div>Username not found</div>
  }

  return (
    <FollowersDialog
      isOpen={isOpen}
      onClose={handleClose}
      userId="current-user-id" // Replace with actual user ID
      username={username}
      initialTab="followers"
    />
  )
}
