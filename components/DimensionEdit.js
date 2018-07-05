import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';


export default class DimensionEdit extends Component {
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
        <Text style={styles.text}>{this.props.data.title}</Text>

        <View style={styles.ownerPanel}>
          <TouchableHighlight>
            <View style={styles.formLine}>
              <Text style={styles.selectLabel}>维度一号位</Text>
              <Text style={styles.selectNumber}>小明</Text>
              <Image style={styles.selectIcon} source={require('../image/arrow_forward.png')}/>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.KAList}>
          <FlatList
            data={this.props.data.keyFactor}
            renderItem={({item, index}) => {
              const imageurl = [require('../image/KR0.png'), require('../image/KR1.png'),require('../image/KR2.png')]
              const source = imageurl[index]
              return (
                <View style={styles.panel}>
                  <View style={styles.formLine} >
                    <Image style={styles.krIcon} source={source}/>
                    <Text style={styles.krContent}>{item.content}</Text>
                  </View>
                </View>
              )}
            }
          />
        </View>

        <Text style={styles.text}>添加关键指标</Text>

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
    margin: 10,
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
    width: 40,
    margin: 10,
  },
  krContent: {
    flex: 5,
  }
})