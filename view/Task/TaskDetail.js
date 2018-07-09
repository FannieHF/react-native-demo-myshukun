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
      dimenNumber: 0,
    }
  }

  componentWillMount() {
    this.refresh()
  }

  refresh() {
    const that = this
    Util.post(config.api.searchgdrecords, [{
      "attrName": "goal.id",
      "operator": "EQ",
      "attrValue": this.props.task.id,
    }], function(data){
      that.setState({
        dimenNumber: data.length,
        dimensionData: data,
      });
    }, function(err){
    });

    Util.get(`${config.api.goals}/${this.props.task.id}`, function(data){
      that.setState({
        task: data
      });
    }, function(err){
    });

  }

  navigateBack() {
    this.props.onGoBack();
    this.props.navigation.goBack();
  }

  renderDimension(item) {
    return (
      <Dimension key={item.id} 
        data={item.goalDimensionality} 
        krs={item.goalDimensionalityRecordKRs} 
        health = {item.score}
        navigation={this.props.navigation} />
    )
  }

  render() {
    const { task, dimensionData, dimenNumber } = this.state;
    let {width, height} = Dimensions.get('window');

    height = height - 60- 70 // - header - tab

    const dimensions =  dimensionData && dimensionData.length > 0 ? dimensionData.map(function (item){
      return this.renderDimension(item);
    }.bind(this)) :undefined;

    return (
      <View style={{ flex: 1 }}>
        <Header 
          left={{ back: true, text: '目标'  }} 
          title='目标详情' 
          right={{action:'plaintext', text: '编辑'}}
          onBack = {this.navigateBack.bind(this)}
          toggleMenu =  {() => this.props.navigation.navigate("TaskEdit", 
            { task, dimensionData, dimenNumber, 
              onGoBack: () => this.refresh() })} />
        
         <ScrollView style={{ flex: 1, width: width, height: height }}>
          { task && <Card data={task} />}
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