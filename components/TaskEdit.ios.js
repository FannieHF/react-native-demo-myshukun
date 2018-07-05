import React, { Component } from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  DatePickerIOS,
  Modal
} from 'react-native';
import moment from 'moment'
import Header from './Header'
import Dimension from './DimensionEdit'

let { width, height} = Dimensions.get('window');
const dialogH = 110;

export default class TaskEdit extends Component {
  constructor(props){
		super(props);
		this.state = {
      chosenDate: new Date(),
      modalVisible: false,
      dimensionData: {
        title: '商务维度',
        health: '健康',
        keyFactor: [{
          content: "市场占有率/份额，200家医院，19年上半年有心内科的医院50%覆盖，下半年70%覆盖",
        }, {
          content: "运营质量30%运营医院医生点击率100%，另70%运营医院医生点击率70%",
        }, {
          content: "劳动效率最高：a）销售1H/d提升到2H/d，b）角度时间2d减少到0.5d，c）运营人员5H/人提升至10H/人",
        }]
      }
    }
    this.setDate = this.setDate.bind(this)
  }
  
  navigateBack() {
    this.props.navigation.goBack();
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  closeModal() {
    this.setState({
      modalVisible: false
    });
  }


  renderPicker() {
    return (
      <View style={styles.modalStyle}>
        <DatePickerIOS
          style={styles.datePicker}
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          mode="date"
          locale="zh"
        />
      </View>
    )
  }

  
  render() {
    
    height = height - 60 - 70 // - header - tab
    const duedate = moment(this.state.chosenDate).format("YYYY年MM月DD日")
    return (
      <View style={{ flex: 1 }}>
        <Header
          left={{ back: true, text: ''  }} 
          title='编辑目标' 
          right={{'action':'finish'}}
          onBack = {this.navigateBack.bind(this)}  />
        
        <ScrollView style={{ flex: 1, height: height }}>
          <View style={styles.panel}>
            <View style={styles.formLine}>
              <Text style={styles.inputLabel}>目标描述</Text>

              <TouchableHighlight style={{flex: 10}}>
                <View style={styles.contentWrapper}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}>
                    把心血管影像AI从先发优势切实地转化为有壁垒的市场竞争优势
                  </Text>
                  <Image style={styles.inputIcon} source={require('../image/arrow_forward.png')}/>
                </View>
              </TouchableHighlight>

            </View>
          </View>
          
          <View style={styles.panel}>
            <View style={styles.formLine}>
              <Text style={styles.inputLabel}>截止时间</Text>

              <TouchableHighlight style={{flex: 10}} onPress={() => {
                this.setModalVisible(true);
              }}>
                <View style={styles.contentWrapper}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}>
                    {duedate}
                  </Text>
                  <Image style={styles.inputIcon} source={require('../image/arrow_forward.png')}/>
                </View>
              </TouchableHighlight>

            </View>
          </View>

          <Text style={styles.text}>维度及其关键指标</Text>

          <View style={styles.panel}>
            <TouchableHighlight>
              <View style={styles.formLine}>
                <Text style={styles.selectLabel}>选择维度</Text>
                <Text style={styles.selectNumber}>3</Text>
                <Image style={styles.selectIcon} source={require('../image/arrow_forward.png')}/>
              </View>
            </TouchableHighlight>
          </View>

          <Dimension data={this.state.dimensionData} />

            
          <TouchableOpacity
            style={styles.deleteBtn}
            underlayColor='#fff'>
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