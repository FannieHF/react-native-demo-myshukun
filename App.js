import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Header from './components/Header'
import Main from './components/Main'
import PopMenu from './components/PopMenu'
import TabList from './components/TabList'

class App extends Component{
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
      <View style={styles.container}>
        <Header toggleMenu={this._toggleMenu.bind(this)} left={{'back': true, 'text': '目标'}} right={{'action':'more'}} />
        <Main />
        { this.state.showPopMenu?(<PopMenu />): null}
			</View>
    );
	}
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});