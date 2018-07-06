import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import moment from 'moment';
import SortableListView from '../../Components/SortableListView'
import Card from './Card'
import Header from '../../Components/Header'
import PopMenu from '../PopMenu'
import config from '../../config'

const data=[
  {title: '把心血管影像AI从先发优势切实地转化为有壁垒的市场竞争优势', date: moment(new Date()).format("YYYY年MM月DD日")},
  {title: '探索并建立新的产品线', date: moment(new Date()).format("YYYY年MM月DD日")},
];

const order = Object.keys(data); //Array of keys

export default class TaskList extends Component {
  constructor(props){
		super(props);
		this.state = {
      showPopMenu: false,
      isLoading: true,
		}
  }

  componentDidMount() {
    return fetch(config.api.getGoals, {
      headers: config.header, 
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 0) {
        this.setState({
          isLoading: false,
          dataSource: responseJson.value,
        }, function(){
        });
      } else {
        console.error(responseJson);
      }

    })
    .catch((error) =>{
      console.error(error);
    });
  }


	_toggleMenu() {
    this.setState({
      showPopMenu: !this.state.showPopMenu
    });
  }
  
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Header toggleMenu={this._toggleMenu.bind(this)} 
          left={{'back': false}} 
          title='目标' 
          right={{'action':'more'}} />
        <SortableListView 
          data={data}
          order={order}
          style={{ flex: 1, paddingTop: 10 }}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <Card data={row}
          onClick={() => 
            this.props.navigation.navigate('TaskDetail', { data: row })}/>}
        />
        { this.state.showPopMenu?(<PopMenu navigation={this.props.navigation} toggle={this._toggleMenu.bind(this)}/>): null}
      </View>
    );
  }
};