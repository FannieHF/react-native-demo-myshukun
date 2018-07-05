import React, { Component } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
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
    TaskList: TaskList,
    TaskDetail: TaskDetail,
    TaskEdit: TaskEdit,
  },
  {
    initialRouteName: 'TaskList',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);
