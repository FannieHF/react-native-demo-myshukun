import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import CheckBox from 'react-native-check-box'


export default class Dimension extends Component {
  constructor(props){
		super(props);
		this.state = {
      checked: false,
		}
  }
  
  onClick() {
    this.setState({
      checked: !this.state.checked,
    })
  }

  render() {
    const editDimension = () => {
      this.props.navigation.navigate("TaskEdit", { data: this.props.data })
    }
    return (
      <View style={styles.panel}>

        <View style={styles.panelHeader}>
          <Text style={styles.panelHeaderText}>{this.props.data.title}</Text>

          <View style={styles.avaterOwner}>
            <Image style={styles.avater} source={require('../image/avater.png')}/>
            <Text style={styles.owner}>小坤</Text>
          </View>

          <Text style={styles.panelHeaderText}>{this.props.data.health}</Text>
          
          <Text style={styles.panelHeaderText}></Text>

          <TouchableHighlight style={styles.textWithArrow}  onPress={editDimension}>
            <View style={styles.textWithArrow} >
              <Text style={[styles.panelHeaderText, {flex: 4,  textAlign: 'right'}]}>执行详细</Text>
              <Image style={[styles.iconForward, {flex: 1}]} source={require('../image/arrow_forward.png')}/>
            </View>
          </TouchableHighlight>

        </View>


        <View style={styles.checkBoxList}>
          <FlatList
            data={this.props.data.keyFactor}
            renderItem={({item}) =>
             <View style={styles.checkBoxWrapper} >
              <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={()=>this.onClick()}
              isChecked={item.checked}
              rightText={item.content}
              checkedImage={<Image source={require('../image/cb_enabled.png')} style={styles.checkIcon}/>}
              unCheckedImage={<Image source={require('../image/cb_disabled.png')} style={styles.checkIcon}/>}
              />
            </View>}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    margin: 0,
    marginBottom: 10,
  },
  panelHeader: {
    margin: 15,
    flexDirection: 'row',
  },
  panelHeaderText: {
    color: '#999999', 
    flex: 1,
    textAlign: 'right'
  },
  avaterOwner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    flexDirection: 'row',
  },
  avater: {
    width: 15,
		height: 15,		
    tintColor: '#999999',
  },
  owner: {
    color: '#999999', 
    textAlign: 'right',
  },
  textWithArrow: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems:'center',
    flexDirection: 'row',
  },
  iconForward: {
    width: 15,
		height: 15,		
		tintColor: '#999999',
  },
  checkBoxList: {
    flexDirection: 'column',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  checkIcon: {
    width: 20,
		height: 20,	
  }
})