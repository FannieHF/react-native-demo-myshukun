import Dimensions from 'Dimensions';
import config from './config';

import React, { PixelRatio } from 'react-native';

module.exports = {
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),
  /**
   * 基于fetch的get方法
   * @method post
   * @param {string} url
   * @param {function} callback 请求成功回调
   */
  get: function(url, successCallback, failCallback){
    fetch(url, {
      headers: config.header, 
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 0) {
        console.log(responseJson);
        successCallback(responseJson.value);
      } else {
        console.error(responseJson.msg);
        failCallback(responseJson);
      }
    })
    .catch(function(err){
      console.error(responseJson);
      failCallback(err);
    });
  },
  post: function(url, body, successCallback, failCallback){
    fetch(url, {
      method: 'POST',
      headers: config.header, 
      body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 0) {
        console.log(responseJson);
        successCallback(responseJson.value);
      } else {
        console.error(responseJson.msg);
        failCallback(responseJson);
      }
    })
    .catch(function(err){
      console.error(responseJson);
      failCallback(err);
    });
  },
  update: function(url, body, failCallback){
    fetch(url, {
      method: 'PUT',
      headers: config.header, 
      body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 0) {
        console.log(responseJson);
      } else {
        console.log(responseJson);
        failCallback(responseJson);
      }
    })
    .catch(function(err){
      console.error(responseJson);
      failCallback(err);
    });
  },
  delete: function(url, successCallback, failCallback){
    fetch(url, {
      method: 'DELETE',
      headers: config.header, 
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 0) {
        console.log(responseJson);
        successCallback(responseJson.value);
      } else {
        console.error(responseJson.msg);
        failCallback(responseJson);
      }
    })
    .catch(function(err){
      console.error(responseJson);
      failCallback(err);
    });
  },
};