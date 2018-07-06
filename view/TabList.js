import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import Tab from './Tab';

export default class TabList extends Component {

	_setActiveIndex(index) {
		this.props.setActiveIndex(index);
	}

	render() {
		var {width} = Dimensions.get('window');
		return (<View style={[styles.tabContainer, {width: width}]}>
				<Tab title="目标" icon="task" isActive={this.props.activeIndex===0} setActiveIndex={this._setActiveIndex.bind(this, 0)}/>
				<Tab title="执行" icon="task" isActive={this.props.activeIndex===1}  setActiveIndex={this._setActiveIndex.bind(this, 1)}/>
				<Tab title="我" icon="me" isActive={this.props.activeIndex===2} setActiveIndex={this._setActiveIndex.bind(this, 2)} />
			</View>)
	}
}

var styles = StyleSheet.create({
	tabContainer: {
		height: 60,
		borderTopWidth: 1 ,
		borderTopColor: '#CCCCCC',
		backgroundColor: '#F7F7FA',
		flexDirection: 'row',
	}
})