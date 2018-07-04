import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Card from './Card';
import TabList from './TabList';

export default class Main extends Component {
	render() {
		return (
			<View style={styles.container}>
        <View style={styles.mainPart}>
          <Card />
        </View>

        <TabList/>
      </View>
    )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainPart : {
    flex: 1,
  },
});