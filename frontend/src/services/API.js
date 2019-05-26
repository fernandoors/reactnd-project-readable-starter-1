const API = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => {
  return fetch(`${API}/categories/`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}
export const getSingleCategory = (category) => {
  return fetch(`${API}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
}
export const getPosts = () => {
  return fetch(`${API}/posts/`, { headers })
    .then(res => res.json())
    .then(data => data)
}
export const getPostById = (id) => {
  return fetch(`${API}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const createPosts = (params) => {
  return fetch(`${API}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data)
}
export const updatePosts = (id, params) => {
  return fetch(`${API}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data)
}
export const votePosts = (id, params) => {
  return fetch(`${API}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data)
}
export const deletePosts = (id) => {
  return fetch(`${API}/posts/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())
    .then(data => data)
}
export const getPostsComments = async (id = ``) => {
  return await fetch(`${API}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
}
export const createComments = (params) => {
  return fetch(`${API}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data)
}
export const getComments = (id) => {
  return fetch(`${API}/comments/${id}`, 
    { headers })
    .then(res => res.json())
    .then(data => data)
}
export const voteComments = (id, params) => {
  return fetch(`${API}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data)
}
export const updateComments = (id, params) => {
  return fetch(`${API}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data)
}
export const deleteComments = (id) => {
  return fetch(`${API}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())
    .then(data => data)
}