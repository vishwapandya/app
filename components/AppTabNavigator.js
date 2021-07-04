import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import PostScreen from '../screens/PostScreen';
import UploadScreen from '../screens/UploadScreen';

export const AppTabNavigator = createBottomTabNavigator({
  Post:{
    screen: PostScreen,
    navigationOptions:{
      tabBarLabel:'Post'
    }
  },
  Upload:{
    screen: UploadScreen,
    navigationOptions:{
      tabBarLabel:'Upload'
    }
  }
})