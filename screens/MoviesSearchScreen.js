import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Colors from '../constants/Colors'
import SearchBarHeader from '../components/SearchBarHeader'
import HomeLogo from '../components/HomeLogo'
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { searchMovies } from '../store/actions/movies';


const MoviesSearchScreen = props => {
    const dispatch = useDispatch()

    const searchMoviesHandler = async (searchText) => {
        
        await dispatch(searchMovies(searchText));
    }
    return (
        <View style={{ flex: 1 }}>
            <SearchBarHeader onSearchPress={searchMoviesHandler} />
            <HomeLogo />
        </View>
    )
}
MoviesSearchScreen.navigationOptions = navData => {
    return {
        headerShown: false
    };
};
const styles = StyleSheet.create({

})

export default MoviesSearchScreen 
