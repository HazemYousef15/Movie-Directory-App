import { ADD_SEARCH, SET_SEARCH_HISTPRY } from '../actions/searchHistory';

const initialState = {
    SearchHistory: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_HISTPRY:
            return {
                SearchHistory: action.SearchHistory.map(item => item.searchText)
            }
        case ADD_SEARCH:
            
            // check if search history store include the comming search text to not duplicate it
            let serchHistoryList = (!state.SearchHistory.includes(action.searchText)) ?
                [action.searchText].concat(state.SearchHistory) :
                state.SearchHistory

            //delete first search text from the search history store if size قeaches 10  
            //if not textToDelete would be empty string (delete nothing)
            const index = serchHistoryList.indexOf(action.textToDelete)

            if (index > -1) {
                serchHistoryList.splice(index, 1);
            }
            return {
                SearchHistory: serchHistoryList
            };
        default:
            return state;
    }
};
