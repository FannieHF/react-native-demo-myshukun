import React, { Component } from 'react';
import {
  StyleSheet, 
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Header from '../../Components/Header'
import RadioButtons from '../../Components/RadioBtns'
import config from '../../config'

export default class OwnerPage extends Component {
  constructor(props){
		super(props);
		this.state = {
      options: [],
      checkListOption: this.props.navigation.state.params.checkListOption,
		}
  }

  componentWillMount() {
    return fetch(config.api.getOwners, {
      headers: config.header, 
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 0) {
        this.setState({
          options: responseJson.value,
        });

        console.log(responseJson.value)
      } else {
        console.error(responseJson);
      }

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  navigateBack() {
    this.props.navigation.goBack();
  }

  setSelectedOption(checkListOption, index){
    this.setState({
      checkListOption: checkListOption.name,
    });
    this.props.navigation.state.params.changeOwner(checkListOption)
  }

  render() {

    function renderOption( option, selected, onSelect, index) {

      const textStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black',
        flex: 1,
        fontSize: 18,
        flexDirection: 'row',
      };
      const baseStyle = {
        flexDirection: 'row',
      };
      var style;
      var checkMark;

      if (index > 0) {
        style = [baseStyle, {
          borderTopColor: '#eeeeee',
          borderTopWidth: 1,
        }];
      } else {
        style = baseStyle;
      }

      if (selected) {
        checkMark = <Text style={{
          flex: 0.1,
          color: '#09BB07',
          fontWeight: 'bold',
          paddingTop: 8,
          fontSize: 20,
          alignSelf: 'center',
        }}>✓</Text>;
      }

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={style}>
            <View style={styles.avaterOwner}>
              <Image style={styles.avater} source={require('../../image/avater.png')}/>
              <Text style={styles.owner}>{option}</Text>
            </View>
            {checkMark}
          </View>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(options){
      return (
        <View style={{
          backgroundColor: 'white',
          paddingLeft: 20,
        }}>
          {options}
        </View>
      );
    }

    return (

      <ScrollView style={{ flex: 1 }}>
        <Header 
          left={{ back: true, text: '编辑目标'  }} 
          title='维度一号位' 
          right={{'action':'none'}}
          onBack = {this.navigateBack.bind(this)}  />

        <View style={styles.panel}>
          <RadioButtons
            options={ this.state.options }
            onSelection={ this.setSelectedOption.bind(this) }
            selectedOption={ this.state.checkListOption }
            renderOption={ renderOption }
            renderContainer={ renderContainer }
          />
          {/* <Text>Selected accent: {this.state.checkListOption || 'none'}</Text> */}
        </View>
      </ScrollView>);
  }
};

var styles = StyleSheet.create({
  panel: {
    flex: 1,
    marginTop: 15,
    backgroundColor: 'white',
  },
  avaterOwner:{
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
    flex: 1,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  owner: {
    flex: 1,
  },
});