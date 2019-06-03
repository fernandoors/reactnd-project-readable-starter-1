import { RECEIVE_POSTS, RECEIVE_POSTS_BY_ID, ADD_POST, VOTE_POST, DELETE_POST, ORDER_POST, EDIT_POST, POST_COMMENT } from "../actions/posts";
let update = []
export default function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts
    case RECEIVE_POSTS_BY_ID:
      return action.posts
    case ADD_POST:
      return [
        ...state,
        action.post
      ]
    case EDIT_POST:
      update = state.map(post => {
        if (post.id === action.post.id) {
          return action.post
        }
        return post
      })
      return [
        ...update,
      ]
    case POST_COMMENT:
      update = state.filter(post => post.id === action.id).map(result => {
        if (action.add) result.commentCount = result.commentCount + 1
        else result.commentCount = result.commentCount - 1
        return result
      })
      return update
    case VOTE_POST:
      return state.map(post =>
        (post.id === action.post.id)
          ? action.post
          : post
      )
    case DELETE_POST:
      return state.filter(post =>
        post.id !== action.id
      )
    case ORDER_POST:
      switch (action.order) {
        case 'date':
          return state.map(post => post).sort((a, b) => b.timestamp - a.timestamp)
        case 'more':
          return state.map(post => post).sort((a, b) => b.voteScore - a.voteScore)
        case 'less':
          return state.map(post => post).sort((a, b) => a.voteScore - b.voteScore)
        default:
          return state
      }
    default:
      return state
  }
}