import { SEARCH_MOVIES, RESET_DATA } from '../actions/movies';


const initialState = {
  searchResults: [],
  numOfPages: 0,
  page:1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {
        searchResults: state.searchResults.concat(action.searchResults),
        numOfPages: action.numOfPages,
        page:action.page
      }
    
      case RESET_DATA:
        return initialState

  }

  return state;
};
