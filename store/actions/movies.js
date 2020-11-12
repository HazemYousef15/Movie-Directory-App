export const SEARCH_MOVIES = 'SEARCH_MOVIES'
export const RESET_DATA = 'RESET_DATA'


export const searchMovies = (searchText, page) => {
    return async (dispatch) => {
      const response = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=b3070a5d3abfb7c241d2688d066914e7&query=${searchText}&page=${page}`)
  
      const resData = await response.json();
  
      await dispatch({
        type: SEARCH_MOVIES,
        searchResults:resData.results,
        numOfPages:resData.total_pages,
        page:page
      })
    }
  }

  
  export const resetData = ()=>{
    return{
      type:RESET_DATA
    }
  }
