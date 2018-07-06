import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import TabList from './TabList';
import Task from './Task/Task';

export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      showPopMenu: false
    };
  }


  _setActiveIndex(index) {
    this.setState({index: index});
  }
  

	render() {
		return (
			<View style={styles.container}>
        { this.state.index === 0 && <Task />}
        { this.state.index === 1 && <Task />}
        { this.state.index === 2 && <Task />}

        <TabList activeIndex={this.state.index} setActiveIndex={this._setActiveIndex.bind(this)}/>
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
    backgroundColor: '#EFEFF4',
  },
});