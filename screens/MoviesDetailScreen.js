import React from 'react'

import { StyleSheet, Text, View, Image, ImageBackground, Button, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'

const MoviesDetailScreen = props => {
    const movieData = props.navigation.getParam('movieData')
    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground style={styles.bgImage} source={(movieData.backdrop_path)?{ uri: `http://image.tmdb.org/t/p/w500/${movieData.backdrop_path}` }:require('../assets/default-movie.png')} >
                        <Ionicons
                            onPress={() => { props.navigation.goBack(); }}
                            name="md-arrow-back"
                            size={25}
                            color="white"
                            style={{ marginTop: 15, marginLeft: 15 }}
                        />
                        <View style={styles.mainContainer}>
                            <Image style={styles.image} source={(movieData.poster_path)?{ uri: `http://image.tmdb.org/t/p/w92/${movieData.poster_path}` }:require('../assets/default-movie.png')} />
                            <View style={styles.textsContainer}>
                                <View>
                                    <Text style={styles.secondaryColor}> {(movieData.release_date) ? movieData.release_date.slice(0, 4) : ""} </Text>
                                    <Text style={styles.title}>{movieData.title}</Text>
                                </View>
                                <View style={styles.rateField}>
                                    <Ionicons style={styles.icon} name="md-star" size={32} color={Colors.lightBrown} />
                                    <Text style={styles.secondaryColor}> {movieData.vote_average}</Text>
                                </View>
                            </View>
                        </View>

                    </ImageBackground>
                </View>
                
                <View style={styles.overviewContainer}>
                <Text >overview:</Text>
                    <Text style={styles.overview}>{movieData.overview}</Text>
                </View>
            </ScrollView>
        </View>
    );
}


//hide default header
MoviesDetailScreen.navigationOptions = navData => {
    return {
        headerShown: false
    };
};


const win = Dimensions.get('window');
const ratio = win.width / 500;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    bgImage: {
        flex: 1,
        justifyContent: 'space-between',
        width: win.width,
        height: 281 * ratio,
    },
    image: {
        borderColor: Colors.blue,
        borderWidth: 1,
        borderRadius: 15,
        width: 92,
        height: 138
    },
    container: {
        height: (281 * ratio) + 135,
        width: "100%",
        backgroundColor: Colors.primary
    },
    mainContainer: {
        marginHorizontal: 15,
        marginBottom: 15,
        flexDirection: 'row',
    },
    textsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 20

    },
    secondaryColor: {
        color: Colors.lightBrown
    },
    title: {
        color: "white",
        fontSize: 20
    },
    rateField: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 5
    },
    overviewContainer: {
        padding: 30,
    },
    overview: {
        color:Colors.primary,
        fontSize:17,
    }
})

export default MoviesDetailScreen 
