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
import PopMenu from '../PopMenu'


export default class TaskDetail extends Component {
  constructor(props){
		super(props);
		this.state = {
      showPopMenu: false,
      task: {
        content: "把心血管影像AI从先发优势切实地转化为有壁垒的市场竞争优势",
        chosenDate: new Date(),
        dimenNumber: 0,
        dimensionData: [{
          key: 0,
          label: '商务维度',
          owner: {
            name: '小明'
          },
          switch: true,
          keyFactor: [{
            key: '0',
            checked: true,
            content: "市场占有率/份额，200家医院，19年上半年有心内科的医院50%覆盖，下半年70%覆盖",
          }, {
            key: '1',
            content: "运营质量30%运营医院医生点击率100%，另70%运营医院医生点击率70%",
          }]
        },
        {
          key: 1,
          label: '市场维度',
          owner: {},
          switch: false,
          keyFactor: []
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

  renderDimension(item) {
    return (
      <Dimension key={item.key} data={item} navigation={this.props.navigation} />
    )
  }

  render() {

    const {state} = this.props.navigation;
    let {width, height} = Dimensions.get('window');
    height = height - 60- 70 // - header - tab

    const dimensions = this.state.task.dimensionData.map(function (item){
      if (item.switch) {
        return this.renderDimension(item);
      }
      return 
    }.bind(this));

    return (
      <View style={{ flex: 1 }}>
        <Header toggleMenu={this._toggleMenu.bind(this)} 
          left={{ back: true, text: '目标'  }} 
          title='目标详情' 
          right={{action:'plaintext', text: '编辑'}}
          onBack = {this.navigateBack.bind(this)}
          toggleMenu =  {() => this.props.navigation.navigate("TaskEdit", { task: this.state.task })} />
        
        <ScrollView style={{ flex: 1, width: width, height: height }}>
          <Card data={state.params.data} />
          <Text style={styles.text}>维度及其关键指标</Text>

          {dimensions}
        </ScrollView>
        { this.state.showPopMenu?(<PopMenu />): null}

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