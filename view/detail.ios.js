import React,{ Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import Header from '../components/Header';

@withMappedNavigationProps()
class Notification extends Component{
  constructor(props){
		super(props);
		this.state = {
			showPopMenu: false
		}
	}

	_toggleMenu() {
    this.setState({
      showPopMenu: !this.state.showPopMenu
    });
  }


	render() {
		//PopMenu必须放在最后，否则会被<Main>的内容阻挡
		return (
    <View style={{flex: 1}}>
			<Header toggleMenu={this._toggleMenu.bind(this)}/>
      <Text style={styles.headerTitle}>微信(243)</Text>
      <TouchableHighlight onPress={()=>{}} underlayColor='black' style={styles.headerIconButtonContainer}>
        <Image style={styles.headerIconButton} source={require('../image/search.png')}/>
      </TouchableHighlight>
    </View>
    )
	}
}

var styles = StyleSheet.create({
	headerContainer: {
		height: 50,
		marginTop:100,
		backgroundColor: 'rgb(26, 31, 33)',
		flexDirection: 'row',
		alignItems:'center',
	},
	headerTitle: {
		fontSize: 18,
		marginLeft: 15,
		color: 'white'
	},
	headerTitleContainer: {
		flex: 1
	},
	headerIconButtonContainer: {
		alignItems:'center',
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 10,
		height: 50,
		width:50
	},
	headerIconButton: {
		width: 20,
		height: 20,		
		tintColor: 'white',
	},
});

export default Notification;
