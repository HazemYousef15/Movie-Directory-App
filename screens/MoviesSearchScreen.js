import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Colors from '../constants/Colors'
import SearchBarHeader from '../components/SearchBarHeader'
import HomeLogo from '../components/HomeLogo'
import MovieItem from '../components/MovieItem'


import { useDispatch, useSelector } from 'react-redux'
import { searchMovies, resetData } from '../store/actions/movies'
import { addSearchText, loadSearchHistory } from '../store/actions/searchHistory'



const MoviesSearchScreen = props => {
    const dispatch = useDispatch()


    //data got from the store 
    const searchResults = useSelector(state => state.movies.searchResults)
    const numberOfPages = useSelector(state => state.movies.numOfPages)
    const searchHistory = useSelector(state => state.searchHisrory.SearchHistory)
    const pageNumber = useSelector(state => state.movies.page)


    const [searchText, setSearchText] = useState("")
    const [renderHomeLogo, setRenderHomeLogo] = useState(true)
    const [showSearchHistory, setShowSearchHistory] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showNoMoviesMsg, setShowNoMoviesMsg] = useState(false)

    //load search history
    useEffect(() => {
        dispatch(loadSearchHistory());
    }, [dispatch]);


    const searchMoviesHandler = async (text) => {
        Keyboard.dismiss()
        //reset booleans needed 
        setShowSearchHistory(false)
        setRenderHomeLogo(false)

        setSearchText(text)

        if (text === '') {
            setRenderHomeLogo(true)
            return
        }

        //reset search results in the store to empty
        await dispatch(resetData())

        //handle loading spinner
        setIsLoading(true)
        await dispatch(searchMovies(text, 1))
        setIsLoading(false)

    }


    //handle if ther is no search results and add search text to history and delete one if got to 10 
    useEffect(() => {
        setShowNoMoviesMsg(false)
        if (numberOfPages !== 0) {
            let textToDelete = ''
            if (searchHistory.length >= 10) {
                textToDelete = searchHistory[searchHistory.length - 1]
            }
             dispatch(addSearchText(searchText, textToDelete))

        }
        else {
            setShowNoMoviesMsg(true)
        }
    }, [numberOfPages])


    //pagination
    const loadMoreHandler = async () => {
        if (pageNumber < numberOfPages) {
            await dispatch(searchMovies(searchText, pageNumber + 1))
        }
    }


    //navigate to movie detail screen
    const SelectMovieItemHandler = (MovieItemData) => {
        props.navigation.navigate('MovieDetail', {
            movieData: MovieItemData
        });
    };



    const onSearchFieldPress = () => {
        setShowSearchHistory(true)
    }


    const MovieFlatList = <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreHandler}
        renderItem={itemData => <MovieItem
            movieData={itemData.item}
            onSelect={() => { SelectMovieItemHandler(itemData.item) }}
        />}
    />


    const SearchHistoryFlatList = <FlatList
        data={searchHistory}
        keyExtractor={item => item.toString()}
        renderItem={itemData => <TouchableOpacity onPress={() => { searchMoviesHandler(itemData.item.toString()) }} style={{ width: "100%", height: 60, paddingLeft: 20, justifyContent: 'center' }}>
            <Text style={{ color: Colors.primary, fontSize: 17 }}>{itemData.item.toString()}</Text>
        </TouchableOpacity>}
    />


    return (
        <View style={styles.screen}>
            <SearchBarHeader onSearchBTNPress={searchMoviesHandler} onSearchTXTPress={onSearchFieldPress} />
            {showSearchHistory ?
                <View>
                    {SearchHistoryFlatList}
                </View> :
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    {renderHomeLogo ? <HomeLogo /> :
                        <View style={{ flex: 1 }}>
                            {isLoading ?
                                <View style={styles.centered}>
                                    <ActivityIndicator size="large" color={Colors.red} />
                                </View> :
                                <View style={{ flex: 1 }}>
                                    {showNoMoviesMsg ?
                                        <View style={styles.centered}>
                                            <Text style={{ color: Colors.primary, fontSize: 20 }}>No movies found</Text>
                                        </View> :
                                        <View>
                                            {MovieFlatList}
                                        </View>
                                    }
                                </View>
                            }
                        </View>
                    }
                </TouchableWithoutFeedback>
            }
        </View>
    )
}


//hide default header
MoviesSearchScreen.navigationOptions = navData => {
    return {
        headerShown: false
    };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default MoviesSearchScreen 
