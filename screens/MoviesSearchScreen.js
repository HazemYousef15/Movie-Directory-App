import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Button, Image, FlatList, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'
import SearchBarHeader from '../components/SearchBarHeader'
import HomeLogo from '../components/HomeLogo'
import MovieItem from '../components/MovieItem'
import { Ionicons } from '@expo/vector-icons'

import { useDispatch, useSelector } from 'react-redux'
import { searchMovies, resetData } from '../store/actions/movies'



const MoviesSearchScreen = props => {
    const dispatch = useDispatch()
    const searchResults = useSelector(state => state.movies.searchResults);
    const numberOfPages = useSelector(state => state.movies.numOfPages);
    const pageNumber = useSelector(state => state.movies.page);
    const [renderHomeLogo, setRenderHomeLogo] = useState(true)
    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    // useEffect(() => {
    //     console.log(searchResults.length)
    // }, [searchResults])
    const searchMoviesHandler = async (text) => {

        if (text != '') {
            setSearchText(text)
            setRenderHomeLogo(false)
            dispatch(resetData())
            setIsLoading(true)
            await dispatch(searchMovies(text, 1))
            setIsLoading(false)
        }
        else {
            setRenderHomeLogo(true)
        }
    }

    const loadMoreHandler = async () => {
        // console.log(pageNumber)
        if (pageNumber < numberOfPages && !isLoadingMore) {
            setIsLoadingMore(true)
            await dispatch(searchMovies(searchText, pageNumber + 1))
            setIsLoadingMore(false)
        }
    }

    const SelectMovieItemHandler = (MovieItemData) => {
        props.navigation.navigate('MovieDetail', {
            movieData: MovieItemData
        });
    };

    const loadMore = () => {
        return (
            isLoadingMore ?
                <View style={{ ...styles.centered, margin: 20 }}>
                    <ActivityIndicator size="large" color={Colors.red} />
                </View> : null
        )
    }

    // if (isLoading) {
    //     return (
    //         <View style={styles.centered}>
    //             <ActivityIndicator size="large" color={Colors.red} />
    //         </View>
    //     )
    // }
    return (
        <View style={styles.screen}>
            <SearchBarHeader onSearchPress={searchMoviesHandler} />
            {isLoading ?
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.red} />
                </View> :
                <View style={{ flex: 1 }}>

                    {renderHomeLogo ? <HomeLogo /> :
                        <View>
                            <FlatList
                                data={searchResults}
                                keyExtractor={item => item.id.toString()}
                                onEndReached={loadMoreHandler}
                                // onEndReachedThreshold={0}
                                // ListFooterComponent={loadMore}
                                renderItem={itemData => <MovieItem
                                    movieData={itemData.item}
                                    onSelect={() => { SelectMovieItemHandler(itemData.item) }}
                                />}
                            />
                        </View>


                    }
                </View>
            }
        </View>
    )
}
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
