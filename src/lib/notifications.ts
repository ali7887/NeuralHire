/* eslint-disable no-undef */
export type Notification={
  id:number
  text:string
}

export function getNotifications():Notification[]{

  const data = localStorage.getItem("notifications")

  if(!data) return []

  return JSON.parse(data)
}

export function addNotification(text:string){

  const list = getNotifications()

  list.push({
    id:Date.now(),
    text
  })

  localStorage.setItem(
    "notifications",
    JSON.stringify(list)
  )

}
