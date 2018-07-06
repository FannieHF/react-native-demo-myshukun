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

let { width, height} = Dimensions.get('window');

export default class TaskEdit extends Component {
  constructor(props){
		super(props);
		this.state = {
      task: this.props.navigation.state.params.task,
      modalVisible: false,
    }
    this.changeContent = this.changeContent.bind(this)
    this.changeDimen = this.changeDimen.bind(this)
  }
  
  // 目标描述
  changeContent(content) {
    this.setState({ task: { ...this.state.task, content } })
  }
  editContent() {
    this.props.navigation.navigate("InputPage", 
      {
        content: this.state.task.content, 
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
  setDate(newDate) {
    this.setState({ task: { ...this.state.task, chosenDate: newDate } })
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  closeModal() {
    this.setState({ modalVisible: false });
  }
  renderPicker() {
    return (
      <View style={styles.modalStyle}>
        <DatePickerIOS
          style={styles.datePicker}
          date={this.state.task.chosenDate}
          onDateChange={this.setDate.bind(this)}
          mode="date"
          locale="zh"
        />
      </View>
    )
  }

  // 删除目标
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

  render() {

    const dimensions = this.state.task.dimensionData.map(function (item){
      if (item.switch) {
        return this.renderDimension(item);
      }
      return 
    }.bind(this));
    
    height = height - 60 - 70 // - header - tab
    const duedate = moment(this.state.task.chosenDate).format("YYYY年MM月DD日")
    return (
      <View style={{ flex: 1 }}>
        <Header
          left={{ back: true, text: ''  }} 
          title='编辑目标' 
          right={{action:'plaintext', text: '完成'}}
          onBack = {this.navigateBack.bind(this)}  />
        
        <ScrollView style={{ flex: 1, height: height }}>
          <View style={styles.panel}>
            <View style={styles.formLine}>
              <Text style={styles.inputLabel}>目标描述</Text>

              <TouchableOpacity style={{flex: 10}} onPress={this.editContent.bind(this)}>
                <View style={styles.contentWrapper}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}>
                    {this.state.task.content}
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
                    {duedate}
                  </Text>
                  <Image style={styles.inputIcon} source={require('../../image/arrow_forward.png')}/>
                </View>
              </TouchableOpacity>

            </View>
          </View>

          <Text style={styles.text}>维度及其关键指标</Text>

          <View style={styles.panel}>
            <TouchableOpacity onPress={this.editDimen.bind(this)}>
              <View style={styles.formLine}>
                <Text style={styles.selectLabel}>选择维度</Text>
                <Text style={styles.selectNumber}>{this.state.task.dimenNumber}</Text>
                <Image style={styles.selectIcon} source={require('../../image/arrow_forward.png')}/>
              </View>
            </TouchableOpacity>
          </View>

          {dimensions}

          <TouchableOpacity
            style={styles.deleteBtn}
            underlayColor='#fff'
            onPress={this.deleteTask}>
            <Text style={styles.deleteText}>删除目标</Text>
          </TouchableOpacity>

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