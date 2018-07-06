import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';


let { width} = Dimensions.get('window');

export default class DimensionEdit extends Component {
  constructor(props){
		super(props);
		this.state = {
      dimensionData: this.props.data,
      modalVisible: false,
      marginBottom: 0,
    }
    this.editOwner = this.editOwner.bind(this)
    this.changeOwner = this.changeOwner.bind(this)
    this.confirmText = this.confirmText.bind(this)
  }

  // 维度一号位
  changeOwner(owner) {
    this.setState({
      dimensionData: {
        ...this.state.dimensionData,
        owner,
      }
    })
  }
  editOwner() {
    this.props.navigation.navigate("OwnerPage", 
      {
        checkListOption: this.state.dimensionData.owner && this.state.dimensionData.owner.name, 
        changeOwner: this.changeOwner
      }
    )
  }


  // 添加关键指标
  setModalVisible(visible, text,  krIndex) {
    console.log(krIndex)
    this.setState({modalVisible: visible, text, krIndex});
    if(visible) {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
  }
  closeModal() {
    this.setState({ modalVisible: false });
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  
  _keyboardDidShow () {
    this.setState({marginBottom: 100})
  }

  _keyboardDidHide () {
    this.setState({marginBottom: 0})
  }

  confirmText() {
    let keyFactor = []
    keyFactor = keyFactor.concat(this.state.dimensionData.keyFactor)
    if (this.state.krIndex === 0 )
      keyFactor = [{key: this.state.krIndex.toString(), content: this.state.text}]
    else if (this.state.krIndex === this.state.dimensionData.keyFactor.length)
      keyFactor.push({key: this.state.krIndex.toString(), content: this.state.text})
    else {
      keyFactor[this.state.krIndex] = {
        ...keyFactor[this.state.krIndex],
        content: this.state.text
      }
    }
    this.setState({
      dimensionData: {
        ...this.state.dimensionData,
        keyFactor,
      },
      modalVisible: false
    })
  }

  renderInput(){
    return (
      <View style={[styles.modalStyle, {marginBottom: this.state.marginBottom}]}>
        <TextInput
          style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='请输入关键指标'
        />
        <TouchableOpacity
          style={styles.confirmBtn} onPress={()=>this.confirmText()}>
          <Text style={styles.confirmText}>确定</Text>
        </TouchableOpacity>
      </View>
    )
  }

  closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

  editRow(index, item, rowMap) {
    this.closeRow(rowMap, index)
    this.setModalVisible(true, item.content, index)
	}

  deleteRow(index, rowMap) {
		keyFactor = this.state.dimensionData.keyFactor;
    keyFactor.splice(index, 1);
		this.setState({
      dimensionData: {
        ...this.state.dimensionData,
        keyFactor,
      },
    })
  }
  
  render() {
    return (
      <View style={styles.panel}>
        <Text style={styles.text}>{this.state.dimensionData.label}</Text>

        <View style={styles.ownerPanel}>
          <TouchableOpacity onPress={this.editOwner}>
            <View style={styles.formLine}>
              <Text style={styles.selectLabel}>维度一号位</Text>
              <Text style={styles.selectNumber}>
                {this.state.dimensionData.owner && this.state.dimensionData.owner.name}
              </Text>
              <Image style={styles.selectIcon} source={require('../../image/arrow_forward.png')}/>
            </View>
          </TouchableOpacity>
        </View>

         <View style={styles.KAList}>
          <SwipeListView
            useFlatList
            keyExtractor={(item) => item.key}
            data={this.state.dimensionData.keyFactor}
            renderItem={({item, index}) => {
              return (
                <View style={styles.formLine} >
                  <View style={styles.krIcon}><Text style={{color: '#fff', textAlign: 'center', fontSize: 15}}>KR {index+1}</Text></View>
                  <Text style={styles.krContent}>{item.content}</Text>
                </View>
              )}
            }
            renderHiddenItem={({item, index}, rowMap) => (
							<View style={styles.rowBack}>
                <Text></Text>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.editRow(index, item, rowMap) }>
									<Text style={styles.backTextWhite}>Edit</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(index, rowMap) }>
									<Text style={styles.backTextWhite}>Delete</Text>
								</TouchableOpacity>
							</View>
            )}
            disableRightSwipe
            rightOpenValue={-100}
            previewRowKey={'0'}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => this.setModalVisible(true, null, this.state.dimensionData.keyFactor && this.state.dimensionData.keyFactor.length || 0)}>
            <Text style={styles.text} > + 添加关键指标 </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}>
            <TouchableOpacity style={styles.container} activeOpacity={1}
              onPress={() => this.closeModal()}>
              {this.renderInput()}
            </TouchableOpacity>
          </Modal>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    padding: 20,
    color: '#888888',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  panel: {
    backgroundColor: '#fff',
    margin: 0,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  ownerPanel: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  formLine: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
  },
  KAList: {
    flexDirection: 'column',
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
  krIcon: {
    height: 20,	
    width: 50,
    marginRight: 10,
    backgroundColor: '#10AEFF',
    borderRadius: 15,
  },
  krContent: {
    flex: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
  },
  modalStyle: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    height:  200,
  },
  input: {
    height: 150,
    backgroundColor: '#fff',
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    borderRadius: 5,
    fontSize: 18,
  },
  confirmBtn: {
    margin: 30,
    marginTop: 15,
    backgroundColor: '#10AEFF',
    padding: 5,
    borderRadius: 5,
  },
  confirmText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
  backRightBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
    top: 0,
    bottom: 0,
		width: 50,
	},
	backRightBtnLeft: {
		backgroundColor: '#10AEFF',
		right: 50,
	},
	backRightBtnRight: {
		backgroundColor: '#E64340',
		right: 0
  },
  backTextWhite: {
    color: '#FFF',
    fontWeight: 'bold',
	},
})