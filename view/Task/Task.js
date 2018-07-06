import React, { Component } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import InputPage from './InputPage'
import DimenPage from './DimenPage'
import OwnerPage from './OwnerPage'
import { createStackNavigator } from 'react-navigation';    

export default class Task extends Component {
  render() {
    let {width, height} = Dimensions.get('window');
    height = height - 60 // - header - tab
    return (
      <View style={{ flex: 1, width: width, height: height }}>
        <RootStack />
      </View>
    );
  }
};


const RootStack = createStackNavigator(
  {
    TaskList,
    TaskDetail,
    TaskEdit,
    InputPage,
    DimenPage,
    OwnerPage,
  },
  {
    initialRouteName: 'TaskList',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);
