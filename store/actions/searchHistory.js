
import { insertSearchText, fetchSearchTexts, deleteSearchText } from '../../helpers/localDP';

export const ADD_SEARCH = 'ADD_SEARCH';
export const SET_SEARCH_HISTPRY = 'SET_SEARCH_HISTPRY';

export const addSearchText = (searchText, textToDelete) => {
    return async dispatch => {

        try {
            const deleteResult = await deleteSearchText(textToDelete);
            const insertResult = await insertSearchText(searchText);
            //   console.log(insertResult);
            dispatch({
                type: ADD_SEARCH, searchText: searchText, textToDelete:textToDelete
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadSearchHistory = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchSearchTexts();
            dispatch({ type: SET_SEARCH_HISTPRY, SearchHistory: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};
