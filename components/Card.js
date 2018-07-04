import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight
} from 'react-native';

export default class Card extends Component {
  ConsoleFunction=()=>{
  }

  render() {
    console.log(this.props.data)
    return <TouchableHighlight underlayColor={'#eee'} style={styles.card} {...this.props.sortHandlers} onPress={this.ConsoleFunction}>
      <View>
          <Text style={styles.title}>{this.props.data.title}</Text>
          <Text style={styles.duedate}>截止日期: {this.props.data.date}</Text>
        </View>
      </TouchableHighlight>
  }
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    paddingTop: 10,
    shadowOffset:{  width: 2,  height: 2,  },
    shadowColor: '#aaaaaa',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 5,
  },
  title: {
    padding: 10,
    fontSize: 20,
    color: '#999999',
  },
  duedate: {
    padding: 10,
    fontSize: 15,
    color: '#686868',
  },
})
