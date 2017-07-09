import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Container, Header, Body, Button, Content, Title, Left, List, ListItem, Right, Icon, StyleProvider, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import API from '../lib/API.js';

export default class ChooseStop extends Component {

  constructor(props){
    super(props);
    
    this.state = { 
      stops: [],
      initialPosition: { latitude: 40.7380044, longitude: -73.9917799 }
    };
  }

  componentDidMount(){
    this.getStops(this.state.initialPosition);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
            </Button>
          </Left>
          <Body>
            <Title>Choose a Stop</Title>
          </Body>
          <Right/>
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          <View style={{flex: 1}}>
            <List dataArray={this.state.stops} renderRow={(stop) =>
              <ListItem onPress={() => {
                Actions.routesForStop({ stop: stop });
              }}>
                <Text>{stop.name}</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            } />
          </View>
        </Content>
      </Container>
    );
  }

  getStops(location) {
    this.setState({loading: true});
    API.getStops(location, stops => {this.setStops({stops: stops, loading: false })}, 
      error => alert(JSON.stringify(error)))
  }

  setStops(stopsUpdateObject) {
    this.setState(stopsUpdateObject);
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
