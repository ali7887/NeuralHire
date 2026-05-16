/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import { getNotifications } from "@/lib/notifications"
import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"

type Notification = {
  id: number
  text: string
}

export default function NotificationsPage() {

  const [items, setItems] = useState<Notification[]>([])

  useEffect(() => {
    setItems(getNotifications())
  }, [])

  return (

    <div style={{ padding: "30px" }}>

      <JobSeekerHeader />

      <h2>Notifications</h2>

      {items.length === 0 && (
        <p>No notifications yet</p>
      )}

      {items.map(n => (

        <div
          key={n.id}
          style={{
            border: "1px solid #ddd",
            padding: "14px",
            marginBottom: "10px",
            borderRadius: "8px",
            background: "#fafafa"
          }}
        >

          <p style={{ margin: 0 }}>
            {n.text}
          </p>

        </div>

      ))}

    </div>

  )
}
