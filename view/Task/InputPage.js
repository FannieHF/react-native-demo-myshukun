import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  TextInput
} from 'react-native';
import Header from '../../Components/Header'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TaskDetail extends Component {
  constructor(props){
		super(props);
		this.state = {
      text: this.props.description
		}
  }

  navigateBack() {
    this.props.navigation.goBack();
    this.props.updateContent({ description: this.state.text})
  }
  changeText(text) {
    this.setState({text})
    this.props.changeContent(text)
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
          numberOfLines = {6}
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
    paddingTop: 20,
    paddingBottom: 20,
  },
})