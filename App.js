import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Main from './components/Main'

class App extends Component{
	render() {
		//PopMenu必须放在最后，否则会被<Main>的内容阻挡
		return (
      <View style={styles.container}>
        <Main />
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