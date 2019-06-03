import { getCategories } from "../services/API";
import { receiveCategories } from "./categories";

export function handleInitialData() {
  
  return dispatch => {
    return (
      getCategories()
        .then(categories => dispatch(receiveCategories(categories))))
    }
}