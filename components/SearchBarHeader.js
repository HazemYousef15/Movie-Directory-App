import React, { useState } from 'react'
import { StyleSheet, View, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

const SearchBarHeader = props => {
    const [searchText, setSearchText] = useState("")
    return (
        <View>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <View style={styles.header}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        placeholderTextColor="gray"
                        onChangeText={text => { 
                            setSearchText(text) 
                        }}
                        value={searchText}
                    />
                    <TouchableOpacity onPress={() => {props.onSearchPress(searchText)}} style={styles.iconButton} activeOpacity={0.5}>
                        <Ionicons name="md-search" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexDirection: "row",
        padding: 5,
        height: 35,
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 18,
        justifyContent: 'space-between'
    },
    input: {
        paddingLeft: 15,
        width: "85%"
    },
    iconButton: {
        backgroundColor: Colors.secondary,
        width: '8%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }
})

export default SearchBarHeader 
