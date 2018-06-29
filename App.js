import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import Detail from './view/detail'

@withMappedNavigationProps()
class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Single Page Calendar"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details');
          }}
        />
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Detail,
  },
  {
    initialRouteName: 'Home',
  }
);
