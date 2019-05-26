import {
  ADD_COMMENTS,
  VOTE_COMMENTS,
  DELETE_COMMENTS,
  RECEIVE_POST_COMMENTS,
  EDIT_COMMENTS
} from "../actions/comments";

export default function comments(state = {}, action) {
  const filteredState = Object.values(state).map(comment => comment)
  switch (action.type) {
    case ADD_COMMENTS:
      return {
        ...state,
        [action.comments.id]: action.comments
      }
    case EDIT_COMMENTS:
      const update = (Object.values(state).map(comment => {
        if (comment.id === action.comments.id) {
          return action.comments
        }
        return comment
      }))
      return {
        ...update,
      }
    case VOTE_COMMENTS:
      return filteredState.map(comment =>
        (comment.id === action.comments.id)
          ? { ...comment, voteScore: action.comments.voteScore }
          : comment
      )
    case DELETE_COMMENTS:
      return filteredState.filter(comment =>
        comment.id !== action.id
      )
    case RECEIVE_POST_COMMENTS:
      return {
        ...action.comments
      }
    default:
      return state
  }
}

// export default comments