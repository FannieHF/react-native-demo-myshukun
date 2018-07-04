import React, { Component } from 'react';
import moment from 'moment';
import SortableListView from './SortableListView'
import Card from './Card'

const data=[
  {title: '把心血管影像AI从先发优势切实地转化为有壁垒的市场竞争优势', date: moment(new Date()).format("YYYY年MM月DD日")},
  {title: '探索并建立新的产品线', date: moment(new Date()).format("YYYY年MM月DD日")},
];

const order = Object.keys(data); //Array of keys

export default class TaskList extends Component {
  render() {
    return (
      <SortableListView
        data={data}
        order={order}
        style={{ flex: 1, paddingTop: 10 }}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0]);
          this.forceUpdate();
        }}
        renderRow={row => <Card data={row} />}
      />
    );
  }
};