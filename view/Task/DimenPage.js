import React, { Component } from 'react';
import {
  StyleSheet, 
  ScrollView,
  View,
  Switch,
  Text,
} from 'react-native';
import Header from '../../Components/Header'

export default class DimenPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      dimensions: this.props.navigation.state.params.dimensions
		}
  }

  navigateBack() {
    const dimensions = this.state.dimensions
    let sum = 0
    for (let key of dimensions){
      if (key.switch === true){
        sum += 1
      }
    }
    
    this.props.navigation.state.params.changeDimen(sum, dimensions)
    this.props.navigation.goBack();
  }

  switch(value, item, index) {
    item.switch = value
    let dimensions = this.state.dimensions
    dimensions[index] = item
    this.setState({ dimensions })
  }

  renderOption(item, index) {
    return (
      <View style={styles.panel}>
        <View style={styles.formLine}>
          <Text style={styles.switchLabel}>{item.label}</Text>
          <Switch
            onValueChange={(value) => this.switch(value, item, index)}
            value={item.switch}
          />
        </View>
      </View>
    )
  }

  render() {
    const children = this.state.dimensions.map(function(item, index){
      return this.renderOption(item, index);
    }.bind(this));

    return (
      <ScrollView style={{ flex: 1 }}>
        <Header 
          left={{ back: true, text: '编辑目标'  }} 
          title='选择维度' 
          right={{'action':'none'}}
          onBack = {this.navigateBack.bind(this)}  />

        {children}
        
      </ScrollView>

    );
  }
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  formLine: {
    margin: 15,
    flexDirection: 'row',
  },
  switchLabel: {
		padding: 5,
    color: '#000',
    flexBasis: 1,
    flexGrow: 1,
    fontSize: 20,
  },
})