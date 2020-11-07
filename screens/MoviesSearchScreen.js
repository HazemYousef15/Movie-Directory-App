import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Colors from '../constants/Colors'
import SearchBarHeader from '../components/SearchBarHeader'
import HomeLogo from '../components/HomeLogo'
import { Ionicons } from '@expo/vector-icons';

const MoviesSearchScreen = props => {
    return (
        <View style={{ flex: 1 }}>
            <SearchBarHeader onSearchPress={()=>{}}/>
            <HomeLogo/>
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
