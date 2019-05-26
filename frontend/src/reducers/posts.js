import { RECEIVE_POSTS, ADD_POST, VOTE_POST, DELETE_POST, ORDER_POST, EDIT_POST, POST_COMMENT } from "../actions/posts";
let update = []
export default function posts(state = {}, action) {
  const filteredState = Object.values(state).map(post => post)
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts
      }
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    case EDIT_POST:
      update = (Object.values(state).map(post =>{
        if(post.id=== action.post.id){
          return action.post
        }
        return post
      }))
      return {
        ...update,
      }
    case POST_COMMENT:
      update = (Object.values(state).map(post =>{
        if(post.id=== action.id){
          if(action.add) return {...post, commentCount: post.commentCount+1}
          return {...post, commentCount: post.commentCount-1}
        }
        return post
      }))
      return {
        ...update,
      }
    case VOTE_POST:
      return filteredState.map(post =>
        (post.id === action.post.id)
          ? { ...post, voteScore: action.post.voteScore }
          : post
      )
    case DELETE_POST:
      return filteredState.filter(post =>
        post.id !== action.id
      )
    case ORDER_POST:
      switch(action.order){
        case 'date':
          return Object.values(state).sort((a, b) => b.timestamp - a.timestamp)
        case 'more':
          return Object.values(state).sort((a, b) => b.voteScore - a.voteScore)
        case 'less':
          return Object.values(state).sort((a, b) => a.voteScore - b.voteScore)
        default:
          return state
      }
    default:
      return state
  }
}

// export default posts