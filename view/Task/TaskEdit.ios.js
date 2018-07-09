import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  DatePickerIOS,
  Modal,
  Alert,
} from 'react-native';
import moment from 'moment'
import Header from '../../Components/Header'
import Dimension from './DimensionEdit'
import Util from '../../Common/util'
import config from '../../Common/config'
import { StackActions, NavigationActions } from 'react-navigation';    
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

let { width, height} = Dimensions.get('window');

@withMappedNavigationProps()
export default class TaskEdit extends Component {
  constructor(props){
		super(props);
		this.state = {
      task: this.props.task || {
        description: null,
        expectedEndDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        dimenNumber: 0,
      },
      dimensionData: this.props.dimensionData || [],
      modalVisible: false,
      dimenNumber: this.props.dimenNumber || 0,
      rightHeader: this.props.task ? {'action':'none'} : {'action':'plaintext', text: '完成'},
    }
    this.changeContent = this.changeContent.bind(this)
    this.changeDimen = this.changeDimen.bind(this)
    this.updateTask = this.updateTask.bind(this)
  }
  
  // 目标描述
  changeContent(description) {
    this.setState({ task: { ...this.state.task, description } })
  }
  editContent() {
    this.props.navigation.navigate("InputPage", 
      {
        description: this.state.task.description, 
        changeContent: this.changeContent,
        updateContent: this.updateTask,
      }
    )
  }

  updateTask(object){
    if (this.state.task.id)
      Util.update(`${config.api.goals}/${this.state.task.id}`, object)
  }


  newGoal(body) {
    const url = config.api.goals
    const that = this
    Util.post(url, body, function(data){
      that.setState({
        task: data,
        rightHeader: {action: 'none'},
      });
    }, function(err){
    });
  }

  navigateBack() {
    this.props.onGoBack();
    this.props.navigation.goBack();
  }

  // 选择维度
  changeDimen() {
    const that = this
    Util.post(config.api.searchgdrecords, [{
      "attrName": "goal.id",
      "operator": "EQ",
      "attrValue": this.state.task.id,
    }], function(data){
      that.setState({
        dimensionData: data,
        dimenNumber: data.length
      });
    }, function(err){
    });
  }
  editDimen() {
    this.props.navigation.navigate("DimenPage", 
      { 
        goalId: this.state.task.id,
        dimensionData: this.state.dimensionData, 
        changeDimen: this.changeDimen
      }
    )
  }

  // 日期模态框
  setDate(date) {
    let expectedEndDate = moment(date).format("YYYY-MM-DD HH:mm")
    this.setState({ task: { ...this.state.task, expectedEndDate } })
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  closeModal() {
    this.updateTask({ expectedEndDate: this.state.task.expectedEndDate })
    this.setState({ modalVisible: false });
  }
  renderPicker() {
    return (
      <View style={styles.modalStyle}>
        <DatePickerIOS
          style={styles.datePicker}
          date={new Date(this.state.task.expectedEndDate)}
          onDateChange={this.setDate.bind(this)}
          mode="datetime"
          locale="zh"
        />
      </View>
    )
  }
  
  // 删除目标
  deleteTask() {
    var that = this
    Util.delete(`${config.api.goals}/${this.state.task.id}`, function(data){
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'TaskList' })],
      });
      that.props.navigation.dispatch(resetAction);
    }, function(err){
    });
  }
  
  deleteConfirm(that) {
    Alert.alert(
      '要删除改目标吗？',
      '该操作将同时删除相关维度下的所有关键指标。',
      [
        {text: '取消', style: 'cancel'},
        {text: '确认', onPress: that.deleteTask.bind(that)},
      ],
      { cancelable: false }
    )
  }

  renderDimension(item) {
    return (
      <Dimension key={item.id} 
        data={item} 
        navigation={this.props.navigation} />
    )
  }

  render() {
    const dimensions = this.state.dimensionData && this.state.dimensionData.map(function (item){
      return this.renderDimension(item);
    }.bind(this));
    
    height = height - 60 - 70 // - header - tab
    return (
      <View style={{ flex: 1 }}>
        <Header
          left={{ back: true, text: ''  }} 
          title='编辑目标' 
          right={this.state.rightHeader}
          onBack = {this.navigateBack.bind(this)} 
          toggleMenu = {() => this.newGoal({
            description: this.state.task.description,
            expectedEndDate: this.state.task.expectedEndDate,
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
                this.setModalVisible(true);
              }}>
                <View style={styles.contentWrapper}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}>
                  {this.state.task.expectedEndDate} 
                  </Text>
                  <Image style={styles.inputIcon} source={require('../../image/arrow_forward.png')}/>
                </View>
              </TouchableOpacity>

            </View>
          </View>

          { this.state.task.id && <Text style={styles.text}>维度及其关键指标</Text> }

          { this.state.task.id && <View style={styles.panel}>
            <TouchableOpacity onPress={this.editDimen.bind(this)}>
              <View style={styles.formLine}>
                <Text style={styles.selectLabel}>选择维度</Text>
                <Text style={styles.selectNumber}>{this.state.dimenNumber}</Text>
                <Image style={styles.selectIcon} source={require('../../image/arrow_forward.png')}/>
              </View>
            </TouchableOpacity>
            </View> }

          {dimensions}

          { this.state.task.id &&  <TouchableOpacity
            style={styles.deleteBtn}
            underlayColor='#fff'
            onPress={()=>this.deleteConfirm(this)}>
            <Text style={styles.deleteText}>删除目标</Text>
          </TouchableOpacity> }

        </ScrollView>

        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}>
            <TouchableOpacity style={styles.container} activeOpacity={1}
              onPress={() => this.closeModal()}>
              {this.renderPicker()}
            </TouchableOpacity>
          </Modal>
        </View>

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
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalStyle: {
    position: "absolute",
    top: height - 200,
    width: width,
    backgroundColor: '#fff'
  },
  datePicker: {
    flex: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: width,
  },
})