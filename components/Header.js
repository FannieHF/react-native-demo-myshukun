import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<View style={styles.headerContainer}>
				{ this.props.left.back && <TouchableHighlight onPress={this.props.onBack} underlayColor='black'>
					<View style={styles.BackButtonContainer}>
            <Image style={styles.IconButton} source={require('../image/arrow_back.png')}/>
            <Text style={styles.headerTitle}>{this.props.left.text}</Text>
          </View>
				</TouchableHighlight>
        }
        <View style={styles.headerTitleContainer}>
					<Text style={styles.headerTitle}>{this.props.title}</Text>
				</View>
        { this.props.right.action === 'finish' && 
          <TouchableHighlight onPress={this.props.toggleMenu}  underlayColor='black' style={styles.moreIconButtonContainer}>
            <Text style={styles.headerTitle}>完成</Text>
          </TouchableHighlight>
        }
        { this.props.right.action === 'more' && 
          <TouchableHighlight onPress={this.props.toggleMenu}  underlayColor='black' style={styles.moreIconButtonContainer}>
            <Image style={styles.IconButton} source={require('../image/more.png')}/>
          </TouchableHighlight>
        }
			</View>
			)
	}
}
var styles = StyleSheet.create({
	headerContainer: {
		height: 70,
    marginTop: 0,
    paddingTop: 10,
		backgroundColor: 'rgb(26, 31, 33)',
		flexDirection: 'row',
    alignItems:'center',
    display: 'flex',
	},
	headerTitle: {
		fontSize: 18,
		marginLeft: 15,
		color: 'white'
	},
	BackButtonContainer: {
		alignItems:'center',
		justifyContent: 'flex-start',
    flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		height: 50,
	},
	headerTitleContainer: {
		alignItems:'center',
    flex: 1,
    flexGrow: 1,
  },
	moreIconButtonContainer: {
    alignItems:'center',
		justifyContent: 'flex-end',
    flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		height: 50,
	},
	IconButton: {
		width: 30,
		height: 30,		
		tintColor: 'white',
	},
});