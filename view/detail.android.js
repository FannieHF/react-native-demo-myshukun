import React from 'react';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import {Platform, StyleSheet, Text, View} from 'react-native';
import JPushModule from 'jpush-react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

@withMappedNavigationProps()
export default class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _jumpSecondActivity() {
    console.log('jump to SecondActivity')
    // JPushModule.jumpToPushActivityWithParams('SecondActivity', {
    // hello: 'world'
    // })
    // this.props.navigation.navigate('Push')
  }

  // example
  componentDidMount() {
    console.log(Platform.OS, 'JPushModule', JPushModule);
    //android支持，在其它功能之前调用
    JPushModule.notifyJSDidLoad((resultCode) => {
      if (resultCode === 0) {
        console.log('notifyJSDidLoad ok');
      }
    });
    JPushModule.addReceiveNotificationListener((map) => {
      console.log('addReceiveNotificationListener:' + JSON.stringify(map));
    });
    JPushModule.addReceiveOpenNotificationListener((map) => {
      console.log("Opening notification!");
      //接收到消息后跳转到app中的相应页面
      this._jumpSecondActivity();
    });
    JPushModule.addReceiveCustomMsgListener((map) => {
      this.setState({pushMsg: message});
      console.log("extras: " + map.extras);
    });
    //获取注册成功后的registrationId
    JPushModule.getRegistrationID(registrationId => {
      console.log("Device register, registrationId :" + registrationId);
    })
  }

  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
    JPushModule.removeReceiveOpenNotificationListener();
    JPushModule.removeOpenNotificationLaunchAppEventListener();
  }

  // render() {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>Details Screen Android</Text>
  //     </View>
  //   );
  // }

  render() {
    return (<View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native!
      </Text>
      <Text style={styles.instructions}>
        推送功能测试
      </Text>
      <Text style={styles.instructions}>
        {instructions}
      </Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});