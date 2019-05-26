export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const formatPost = (body, category, title, id = generateUID()) => ({
  body,
  "timestamp": Date.now(),
  "author": "User1",
  id,
  category,
  title,
})
export const formatComment = (body, parentId, id = generateUID()) => ({
  body,
  "timestamp": Date.now(),
  "author": "User1",
  id,
  parentId
})