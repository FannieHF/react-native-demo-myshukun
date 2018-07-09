import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  DatePickerAndroid,
  Alert,
} from 'react-native';
import moment from 'moment'
import Header from '../../Components/Header'
import Dimension from './DimensionEdit'
import config from '../../Common/config'
import Util from '../../Common/util'

let { height} = Dimensions.get('window');

export default class TaskEdit extends Component {
  constructor(props){
		super(props);
		this.state = {
      task: {
        description: null,
        chosenDate: new Date(),
        dimenNumber: 0,
      },
      id: undefined,
      modalVisible: false,
      rightHeader: {'action':'plaintext', text: '完成'},
    }
    this.changeContent = this.changeContent.bind(this)
    this.changeDimen = this.changeDimen.bind(this)
  }

  // 目标描述
  changeContent(description) {
    this.setState({ task: { ...this.state.task, description } })
  }
  editContent() {
    this.props.navigation.navigate("InputPage", 
      {
        description: this.state.task.description, 
        changeContent: this.changeContent
      }
    )
  }

  // 选择维度
  changeDimen(dimenNumber, dimensionData) {
    this.setState({ task: { ...this.state.task, dimenNumber, dimensionData } })
  }
  editDimen() {
    this.props.navigation.navigate("DimenPage", 
      {
        dimensions: this.state.task.dimensionData, 
        changeDimen: this.changeDimen
      }
    )
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  // 日期模态框
  async renderPicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.chosenDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({
          task: {
            ...this.state.task, 
            chosenDate: new Date(year, month, day),
          },
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  deleteTask() {
    Alert.alert(
      '要放弃\“商务维度\”的设置吗？',
      '该操作将同时删除其关键指标设置。',
      [
        {text: '取消', style: 'cancel'},
        {text: '确认', onPress: () => this.props.navigation.goBack()},
      ],
      { cancelable: false }
    )
  }
  
  renderDimension(item) {
    return (
      <Dimension key={item.key} data={item} navigation={this.props.navigation} />
    )
  }

  newGoal(body) {
    const url = config.api.goals
    const that = this
    Util.post(url, body, function(data){
      that.setState({
        id: data.id,
        rightHeader: {action: 'none'},
      });
    }, function(err){
    });
}

  render() {
    
    const dimensions = this.state.id && this.state.task.dimensionData ? this.state.task.dimensionData.map(function (item){
      if (item.switch) {
        return this.renderDimension(item);
      }
      return 
    }.bind(this)) : undefined ;
    
    height = height - 60 - 70 // - header - tab
    const duedate = moment(this.state.task.chosenDate).format("YYYY年MM月DD日")

    return (
      <View style={{ flex: 1 }}>
        <Header
          left={{ back: true, text: ''  }} 
          title='编辑目标' 
          right={this.state.rightHeader}
          onBack = {this.navigateBack.bind(this)} 
          toggleMenu = {() => this.newGoal({
            description: this.state.task.description,
            expectedEndDate: moment(this.state.task.chosenDate).format("YYYY-MM-DD"),
          })} />
        
        <ScrollView style={{ flex: 1, height: height }}>
          <View style={styles.panel}>
            <View style={styles.formLine}>
              <Text style={styles.inputLabel}>目标描述</Text>

              <TouchableOpacity style={{flex: 10}} onPress={this.editContent.bind(this)}>
                <View style={styles.contentWrapper}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}>
                    {this.state.task.description}
                  </Text>
                  <Image style={styles.inputIcon} source={require('../../image/arrow_forward.png')}/>
                </View>
              </TouchableOpacity>

            </View>
          </View>
          
          <View style={styles.panel}>
            <View style={styles.formLine}>
              <Text style={styles.inputLabel}>截止时间</Text>

              <TouchableOpacity style={{flex: 10}} onPress={() => {
                this.renderPicker();
              }}>
                <View style={styles.contentWrapper}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}>
                    {duedate}
                  </Text>
                  <Image style={styles.inputIcon} source={require('../../image/arrow_forward.png')}/>
                </View>
              </TouchableOpacity>

            </View>
          </View>

          { this.state.id &&  <Text style={styles.text}>维度及其关键指标</Text> }

          { this.state.id &&  <View style={styles.panel}>
            <TouchableOpacity onPress={this.editDimen.bind(this)}>
              <View style={styles.formLine}>
                <Text style={styles.selectLabel}>选择维度</Text>
                <Text style={styles.selectNumber}>{this.state.task.dimenNumber}</Text>
                <Image style={styles.selectIcon} source={require('../../image/arrow_forward.png')}/>
              </View>
            </TouchableOpacity>
            </View> }

          {dimensions}
            
          { this.state.id && <TouchableOpacity
            style={styles.deleteBtn}
            underlayColor='#fff'
            onPress={this.deleteTask}>
            <Text style={styles.deleteText}>删除目标</Text>
          </TouchableOpacity> }

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
  inputLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    color: '#000'
  },
  contentWrapper: {
    marginLeft: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    color: '#000',
    flex: 15,
    overflow: 'hidden',
    textAlign: 'right',
  },
  inputIcon: {
    flex: 1,
    width: 15,
		height: 15,		
		tintColor: '#000',
  },
  text: {
    fontSize: 14,
    padding: 10,
    color: '#888888',
  },
  selectLabel: {
    flexBasis: 1,
    flexGrow: 1,
    color: '#000'
  },
  selectIcon: {
    width: 15,
		height: 15,		
		tintColor: '#000',
  },
  deleteBtn: {
    margin: 30,
    backgroundColor: '#E64340',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
})