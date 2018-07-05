import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import Card from './Card'
import Header from './Header'
import PopMenu from './PopMenu'
import Dimension from './Dimension'

export default class TaskDetail extends Component {
  constructor(props){
		super(props);
		this.state = {
      showPopMenu: false,
      dimensionData: {
        title: '商务维度',
        health: '健康',
        keyFactor: [{
          content: "市场占有率/份额，200家医院，19年上半年有心内科的医院50%覆盖，下半年70%覆盖",
          checked: false,
        }, {
          content: "运营质量30%运营医院医生点击率100%，另70%运营医院医生点击率70%",
          checked: true,
        }, {
          content: "劳动效率最高：a）销售1H/d提升到2H/d，b）角度时间2d减少到0.5d，c）运营人员5H/人提升至10H/人",
          checked: true,
        }]
      }
		}
  }

	_toggleMenu() {
    this.setState({
      showPopMenu: !this.state.showPopMenu
    });
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  render() {

    const {state} = this.props.navigation;
    let {width, height} = Dimensions.get('window');
    height = height - 60- 70 // - header - tab
    return (
      <View style={{ flex: 1 }}>
        <Header toggleMenu={this._toggleMenu.bind(this)} 
          left={{ back: true, text: '目标'  }} 
          title='目标详情' 
          right={{'action':'more'}}
          onBack = {this.navigateBack.bind(this)}  />
        
        <ScrollView style={{ flex: 1, width: width, height: height }}>
          <Card data={state.params.data} />
          <Text style={styles.text}>维度及其关键指标</Text>

          <Dimension data={this.state.dimensionData} navigation={this.props.navigation} />
          { this.state.showPopMenu?(<PopMenu />): null}
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
  dimension: {
  }
})