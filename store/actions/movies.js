export const SEARCH_MOVIES = 'SEARCH_MOVIES'


export const searchMovies = (searchText) => {
    return async (dispatch) => {
      const response = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=b3070a5d3abfb7c241d2688d066914e7&query=${searchText}&page=1`)
  
      const resData = await response.json();
  
      console.log(resData)
      
      dispatch({
        type: SEARCH_MOVIES,
      })
    }
  }