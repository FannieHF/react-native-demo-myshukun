import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  TextInput
} from 'react-native';
import Header from '../../Components/Header'

export default class TaskDetail extends Component {
  constructor(props){
		super(props);
		this.state = {
      text: this.props.navigation.state.params.content
		}
  }

  navigateBack() {
    this.props.navigation.goBack();
  }
  changeText(text) {
    this.setState({text})
    this.props.navigation.state.params.changeContent(text)
  }
  render() {

    const {state} = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Header 
          left={{ back: true, text: '编辑目标'  }} 
          title='目标描述' 
          right={{'action':'none'}}
          onBack = {this.navigateBack.bind(this)}  />

        <TextInput
          style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          onChangeText={this.changeText.bind(this)}
          value={this.state.text}
        />
      </View>

    );
  }
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
  },
})