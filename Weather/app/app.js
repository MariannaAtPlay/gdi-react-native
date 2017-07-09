import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Content, Button, Input, InputGroup } from 'native-base';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '2459115', temp: '--'}; 
    this.handleGetWeather = this.handleGetWeather.bind(this);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.temperature}>
              {this.state.temp}
            </Text>
            <InputGroup borderType="underline" style={{margin: 10}}>
              <Input
                style={{height: 40, alignSelf: 'center'}}
                value={this.state.text}
                onChangeText={(text) => this.setState({text})}
              />
            </InputGroup>
            <Button style={{alignSelf: 'center'}} onPress={this.handleGetWeather}>
              <Text style={styles.button}>Fetch</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  handleGetWeather() {
    let url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20=%20"+this.state.text+"&format=json"
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let temp = responseJson.query.results.channel.item.condition.temp;
        this.setState({temp: temp.toString()})
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  temperature: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    color: '#FFFFFF'
  }
});

AppRegistry.registerComponent('Weather', () => Weather);
