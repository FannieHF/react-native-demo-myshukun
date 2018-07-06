import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
	container: {
		height: 50,
		backgroundColor: 'rgb(26, 31, 33)', 
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'black'
	},
	title: {
		paddingLeft: 30,
		fontSize: 15,
		color: 'white',
		flexWrap: 'nowrap'
	}
});

export default class PopMenuItem extends Component{
	render() {
		return (
			<TouchableHighlight underlayColor='#222222' style={styles.container} onPress={this.props.onPress} >
				<Text style={styles.title}>{this.props.title}</Text>
			</TouchableHighlight>
			)
	}
}