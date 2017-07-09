import React, { Component } from 'react';
import {
  AppRegistry, BackAndroid
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import ChooseStop from './components/ChooseStop.js';
import RoutesForStop from './components/RoutesForStop.js';

export default class BusLocations extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      Actions.pop({refresh:{}});
      return true;
    });
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="chooseStop" component={ChooseStop} initial={true} />
          <Scene key="routesForStop" component={RoutesForStop} />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('BusLocations', () => BusLocations);

