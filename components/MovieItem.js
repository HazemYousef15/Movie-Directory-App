import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

const MovieItem = props => {
    // useEffect(() => {
    //     console.log(props.movieData.release_date)
    // }, [props])

    return (
        <TouchableOpacity style={styles.mainContainer} onPress={props.onSelect} activeOpacity={0.7}>
            <Image style={styles.image} source={{ uri: `http://image.tmdb.org/t/p/w92/${props.movieData.poster_path}` }} />
            <View style={styles.textsContainer}>
                <View>
                    <Text style={styles.secondaryColor}> {(props.movieData.release_date)?props.movieData.release_date.slice(0,4):""} </Text>
                    <Text style={styles.title}>{props.movieData.title}</Text>
                </View>
                <View style={styles.rateField}>
                    <Ionicons style={styles.icon} name="md-star" size={32} color={Colors.blue} />
                    <Text style={styles.secondaryColor}> {props.movieData.vote_average}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary,
        flexDirection: 'row',
        padding: 10,
        width: "100%",
        height: 150
    },
    image: {
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 15,
        width: 92,
        height: "100%"
    },
    textsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10
    },
    secondaryColor: {
        color: Colors.secondary
    },
    title: {
        color: Colors.primary,
        fontSize: 20
    },
    rateField: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 5
    }
})

export default MovieItem 
