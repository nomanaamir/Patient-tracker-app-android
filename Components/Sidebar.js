import React, {Component} from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Container, Content,Left,Title,Right, SwipeRow, View, Text, Button, Header, Item, Input, Icon, List, ListItem, Body, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

export default class SideBar extends Component {
  constructor(){
    super();
  }
  logOut(){
    firebase.auth().signOut();
    {Actions.Welcome()}
  }
    render(){
        return(
            <Container style={styles.main}>
        <Content>
          <View style={styles.main2}>
          <Button transparent danger>
            <Text>Home</Text>
          </Button>
          <Button transparent danger onPress={()=> Actions.AddPat()}>
            <Text>Add Patient</Text>
          </Button>
          <Button transparent danger onPress={()=> this.logOut()}>
            <Text>Log Out</Text>
          </Button>
          </View>
        </Content>
      </Container>
        )
    }
}


const styles = StyleSheet.create({
  main: {
      backgroundColor: "#83aaea",
      alignItems: "center",
  },
  main2:{
    marginTop: 80
  }
});