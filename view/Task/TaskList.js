import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import moment from 'moment';
import SortableListView from '../../Components/SortableListView'
import Card from './Card'
import Header from '../../Components/Header'
import PopMenu from '../PopMenu'
import Util from '../../Common/util'
import config from '../../Common/config'

const data=[
  {description: '把心血管影像AI从先发优势切实地转化为有壁垒的市场竞争优势', expectedEndDate: moment(new Date()).format("YYYY年MM月DD日")},
  {description: '探索并建立新的产品线', expectedEndDate: moment(new Date()).format("YYYY年MM月DD日")},
];


export default class TaskList extends Component {
  constructor(props){
		super(props);
		this.state = {
      showPopMenu: false,
      isLoading: true,
      dataSource: [],
		}
  }

  componentWillMount() {
    const url = config.api.goals
    const that = this
    Util.get(url, function(data){
      that.setState({
        isLoading: false,
        dataSource: data,
        order: Object.keys(data)
      });
    }, function(err){
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
          data={this.state.dataSource}
          // data={data}
          keyExtractor={(item, index) => item.id}
          order={this.state.order}
          style={{ flex: 1, paddingTop: 10 }}
          onRowMoved={e => {
            this.state.order.splice(e.to, 0, this.state.order.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <Card data={row}
          onClick={() => 
            this.props.navigation.navigate('TaskDetail', { task: row })}/>}
        />
        { this.state.showPopMenu?(<PopMenu navigation={this.props.navigation} toggle={this._toggleMenu.bind(this)}/>): null}
      </View>
    );
  }
};