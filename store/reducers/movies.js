import { SEARCH_MOVIES } from '../actions/movies';


const initialState = {
    movies: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
        return initialState

  }

  return state;
};
