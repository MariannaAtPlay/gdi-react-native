import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Header, Body, Button, Content, Title, Left, List, ListItem, Right, StyleProvider, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import API from '../lib/API.js';

export default class RoutesForStop extends Component {
  constructor(props){
    super(props);

    this.state = { stop: props.stop, routes: props.stop.routes, isMounted: false, isSaved: false };

    this.getStop(props.stop);
  }

  componentDidMount(){
    this.state = { stop: this.state.stop, routes: this.state.routes, isMounted: true, isSaved: this.state.isSaved }
  }

  componentWillUnmount(){
    this.state = { isMounted: false}
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{ this.state.stop.name }</Title>
          </Body>
          <Right>
            <Button transparent>
            </Button>
          </Right>
        </Header>
        <Content>
          <List dataArray={this.state.routes} renderRow={(route) =>
            <ListItem icon onPress={() => 
              Actions.predictionsForRouteStop({ stop: this.state.stop, route: route })
            }>
              <Body>
                <Text>{route.name}</Text>
              </Body>
              <Right>
                <Text>{route.prediction}</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          } />
        </Content>
      </Container>
    );
  }

  getStop(stop) {
    API.getStopRoutes(stop, routes => {
      this.setState({ routes: routes })

      // alert(JSON.stringify(routes));
    }, error => alert(JSON.stringify(error)))

    setTimeout(() => { 
      if (this.state.isMounted) {
        this.getStop(stop);
      } 
    }, 10000);
  }
}
