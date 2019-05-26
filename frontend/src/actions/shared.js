import { getPosts, getCategories } from "../services/API";
import { receivePosts } from "./posts";
import { receiveCategories } from "./categories";

export function handleInitialData() {
  
  return dispatch => {
    return (
      getPosts().then(posts =>dispatch(receivePosts(posts)))
      .then(getCategories()
        .then(categories => dispatch(receiveCategories(categories))))
  )}
}