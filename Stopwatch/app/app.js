import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Content, Button } from 'native-base';
import FormatTime from 'minutes-seconds-milliseconds';

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      running: false,
      startTime: null
    }
    this.handleStartPress = this.handleStartPress.bind(this);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.stopwatch}>
              {FormatTime(this.state.timeElapsed)}
            </Text>
            <Button style={{alignSelf: 'center'}} onPress={this.handleStartPress}>
              <Text style={styles.button}>{this.state.running ? 'Stop' : 'Start' }</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return;
    }

    this.setState({
      startTime: new Date(),
    });

    this.interval = setInterval(() => {
      let elapsedSinceLast = new Date() - this.state.startTime;
      this.setState({
        timeElapsed: this.state.timeElapsed + elapsedSinceLast,
        startTime: new Date(),
        running: true,
      });
    }, 30);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  stopwatch: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    color: '#FFFFFF'
  }
});

AppRegistry.registerComponent('Stopwatch', () => Stopwatch);
