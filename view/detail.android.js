import React from 'react';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import { View, Text } from 'react-native';

@withMappedNavigationProps()
export default class Detail extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen Android</Text>
      </View>
    );
  }
}