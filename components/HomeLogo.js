import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/Colors'

const HomeLogo = props => {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 200, height: 123 }}
                source={require('../assets/mainLogo.png')}
            />
            <Text style={styles.title}>Movie Guide</Text>
            <Text style={styles.slogan}>Enjoy a Movie Night </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 25,
        color:Colors.blue
    },
    slogan: {
        fontSize: 15,
        color:Colors.red
    }
})

export default HomeLogo 
