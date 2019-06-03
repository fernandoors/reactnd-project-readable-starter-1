import { getComments, createComments, voteComments, deleteComments, getPostsComments, getPosts, updateComments } from "../services/API";
import { receivePosts, postComment } from "./posts";

// CONSTANTS
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const EDIT_COMMENTS = 'EDIT_COMMENTS'
export const DELETE_COMMENTS = 'DELETE_COMMENTS'
export const VOTE_COMMENTS = 'VOTE_COMMENTS'


// ACTIONS
export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

export function saveComment(comments) {
  return {
    type: ADD_COMMENTS,
    comments
  }
}
export function updateComment(comments) {
  return {
    type: EDIT_COMMENTS,
    comments
  }
}
export function setVoteComment(comments) {
  return {
    type: VOTE_COMMENTS,
    comments
  }
}
export function setDeleteComment({ id }) {
  return {
    type: DELETE_COMMENTS,
    id
  }
}
export function setPostComment(comments) {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments
  }
}

// THUNK
export const loadComment = () => {
  return dispatch => {
    getComments().then(comments => dispatch(receiveComments(comments)))
  }
}

export const handleSaveComment = (comment) => {
  return (dispatch, getState) => {
    const state = getState()
    const isUpdate = state.comments.filter(comments => comments.id.includes(comment.id))
    if (!!isUpdate.length) {
      return updateComments(comment.id, comment)
        .then(comment => dispatch(updateComment(comment)))
        .catch(error => console.error(error))
    }
    createComments(comment)
      .then(comment => dispatch(saveComment(comment)))
      .then(() => dispatch(postComment(comment.parentId, true)))
      .catch(error => console.error(error))
  }
}

export const handleVoteComment = (id, params) => {
  return dispatch => {
    voteComments(id, params)
      .then(comment => dispatch(setVoteComment(comment)))
  }
}

export const handleDeleteComment = (id) => {
  return dispatch => {
    deleteComments(id)
      .then(comment => {
        dispatch(setDeleteComment(comment))
        dispatch(postComment(comment.parentId))
      })
      .then(getPosts().then(posts => dispatch(receivePosts(posts))))
  }
}
export const handlePostComment = (id) => {
  if (id === '') return dispatch => dispatch(setPostComment({}))
  return dispatch => {
    getPostsComments(id)
      .then(comment => dispatch(setPostComment(comment)))
  }
}
