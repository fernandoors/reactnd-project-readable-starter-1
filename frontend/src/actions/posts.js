import { getPosts, createPosts, votePosts, deletePosts, updatePosts } from "../services/API";

// CONSTANTS
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const POST_COMMENT = 'POST_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const ORDER_POST = 'ORDER_POST'

// ACTIONS
export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function savePost(post) {
  return {
    type: ADD_POST,
    post
  }
}
export function updatePost(post) {
  return {
    type: EDIT_POST,
    post
  }
}
export function postComment(id, add = false) {
  return {
    type: POST_COMMENT,
    id,
    add
  }
}
export function setVotePost(post) {
  return {
    type: VOTE_POST,
    post
  }
}
export function setDeletePost({ id }) {
  return {
    type: DELETE_POST,
    id
  }
}
export function handleOrderPost(order) {
  return {
    type: ORDER_POST,
    order
  }
}

// THUNK
export const loadPost = () => {
  return dispatch => {
    getPosts().then(posts => dispatch(receivePosts(posts)))
  }
}

export const handleSavePost = (post) => {
  return (dispatch, getState) => {
    const state = getState()
    const isUpdate = Object.values(state.posts).filter(posts => posts.id.includes(post.id))
    if(!!isUpdate.length){
     return updatePosts(post.id, post)
        .then(post => dispatch(updatePost(post)))
        .then(() => dispatch(handleOrderPost('date')))
        .catch(error => console.error(error))
    }
    createPosts(post)
      .then(post => dispatch(savePost(post)))
      .then(() => dispatch(handleOrderPost('date')))
      .catch(error => console.error(error))
  }
}

export const handleVotePost = (id, params) => {
  return dispatch => {
    votePosts(id, params)
      .then(post => dispatch(setVotePost(post)))
  }
}

export const handleDeletePost = id => {
  return dispatch => {
    deletePosts(id)
      .then(post => dispatch(setDeletePost(post)))
  }
}