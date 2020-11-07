import { Platform } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MoviesDetailsScreen from '../screens/MoviesDetailScreen';
import MoviesSearchScreen from '../screens/MoviesSearchScreen';

import Colors from '../constants/Colors';

const AppNavigator = createStackNavigator(
  {
    MoviesSearch: MoviesSearchScreen,
    MovieDetail: MoviesDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        height:75
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(AppNavigator);
