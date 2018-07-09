import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import Card from './Card'
import Dimension from './Dimension'
import Header from '../../Components/Header'
import config from '../../Common/config'
import Util from '../../Common/util'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TaskDetail extends Component {
  constructor(props){
		super(props);
		this.state = {
      dimensionData: [],
		}
  }

  componentWillMount() {
    const url = config.api.getGoalDimens
    const that = this
    Util.get(url, function(data){
      that.setState({
        dimensionData: data.value,
      });
    }, function(err){
    });
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  renderDimension(item) {
    return (
      <Dimension key={item.key} data={item} navigation={this.props.navigation} />
    )
  }

  render() {

    const {task} = this.props;
    const {dimensionData} = this.state;
    let {width, height} = Dimensions.get('window');
    height = height - 60- 70 // - header - tab

    const dimensions =  dimensionData && dimensionData.length > 0 ? dimensionData.map(function (item){
      if (item.switch) {
        return this.renderDimension(item);
      }
      return 
    }.bind(this)) :undefined;

    return (
      <View style={{ flex: 1 }}>
        <Header 
          left={{ back: true, text: '目标'  }} 
          title='目标详情' 
          right={{action:'plaintext', text: '编辑'}}
          onBack = {this.navigateBack.bind(this)}
          toggleMenu =  {() => this.props.navigation.navigate("TaskEdit", { task, dimensionData })} />
        
         <ScrollView style={{ flex: 1, width: width, height: height }}>
          <Card data={task} />
          { dimensionData && dimensionData.length > 0 &&  <Text style={styles.text}>维度及其关键指标</Text> }

          {dimensions}
        </ScrollView>

      </View>

    );
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    padding: 10,
    color: '#888888',
  },
})