import React, { Component } from 'react';
import {
  StyleSheet, 
  ScrollView,
  View,
  Switch,
  Text,
  Alert
} from 'react-native';
import Header from '../../Components/Header'
import config from '../../Common/config'
import Util from '../../Common/util'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class DimenPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      alldimensions: [],
    }
    this.addDimRecord = this.addDimRecord.bind(this)
    this.deleteDimRecord = this.deleteDimRecord.bind(this)
  }

  componentDidMount() {
    let dimenMap = {}
    for (let dimen of this.props.dimensionData) {
      dimenMap[dimen.goalDimensionality.id] =  {
        ...dimen.goalDimensionality,
        switch: true,
      }
    }
    const that = this
    Util.get(config.api.getDimens, function(data){
      for (let dimen of data){
        dimenMap[dimen.id] = dimenMap[dimen.id] || dimen
      }
      that.setState({
        alldimensions: Object.values(dimenMap)
      });
    }, function(err){
    });
  }

  navigateBack() {
    this.props.changeDimen()
    this.props.navigation.goBack();
  }

  addDimRecord(dimem){
    Util.post(config.api.gdrecords, {
      goal: {id: this.props.goalId},
      goalDimensionality: dimem,
    })
  }
  
  deleteDimRecord(dimem){
    Util.deleteWithBody(config.api.deleterecordkrs, {
      goal: {id: this.props.goalId},
      goalDimensionality: dimem,
    })
  }
  

  switch(value, item, index) {
    item.switch = value
    if (!value) {
      Alert.alert(
        `要放弃${item.name}的设置吗？`,
        '该操作将同时删除其关键指标设置。',
        [
          {text: '取消', style: 'cancel'},
          {text: '确认', onPress: () => this.deleteDimRecord(item)},
        ],
        { cancelable: false }
      )
    } else {
      this.addDimRecord(item)
    }
    let {alldimensions} = this.state
    this.setState({ alldimensions })
  }

  renderOption(item, index) {
    return (
      <View style={styles.panel}>
        <View style={styles.formLine}>
          <Text style={styles.switchLabel}>{item.name}</Text>
          <Switch
            keyExtractor = {(item, index) => item.id}
            onValueChange={(value) => this.switch(value, item, index)}
            value={item.switch}
          />
        </View>
      </View>
    )
  }

  render() {
    const { alldimensions } = this.state

    const children = alldimensions.length > 0 ? alldimensions.map(function(item, index){
      return this.renderOption(item, index);
    }.bind(this)) : undefined ;


    return (
      <View style={{ flex: 1 }}>
        <Header 
          left={{ back: true, text: '编辑目标'  }} 
          title='选择维度' 
          right={{'action':'none'}}
          onBack = {this.navigateBack.bind(this)}  />

        <ScrollView>
          {children}
        </ScrollView>
        
      </View>

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