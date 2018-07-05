import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Tab extends Component {


	render() {
		var source;
		switch(this.props.icon){
      case "task":
				source = require('../image/toc.png');
				break;
			case "me":
				source = require('../image/me.png');
				break;
			default: 

		}
		
		return (
      <TouchableOpacity style={styles.tab} onPress={this.props.setActiveIndex}>

				<View style={styles.iconContainer}>
					<Image resizeMode='contain' style={[styles.icon, this.props.isActive?{tintColor: 'green'}: null]} source={source} />
				</View>
				<View style={styles.titleContainer}>
					<Text style={[styles.title, this.props.isActive?{color: 'green'}: null]}>{this.props.title}</Text> 
				</View>
			</TouchableOpacity>)
	}

}

var styles = StyleSheet.create({
	tab: {
    flex: 1,
    height: 50,
	},
	iconContainer: {
		flex: 3,
		justifyContent: 'center',
    alignItems: 'center',
	},
	titleContainer: {
		flex: 2,
		justifyContent: 'center',
    alignItems: 'center',
	},
	title:{
		color: '#7F8389',
		fontSize: 12,
	},
	icon: {
		width: 20,
		height: 20,
	}
})