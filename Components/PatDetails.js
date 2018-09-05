import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, List, ListItem, Body,Button, Thumbnail, H3,Header,Right,Left,Icon,Title } from 'native-base';
export default class PatDetails extends Component {
     ref = firebase.database().ref();

    constructor() {
        super();
        this.state = {
            allPat: []
        }
    }
    componentDidMount() {
      firebase.auth().onAuthStateChanged((user)=>{
    
      if (user) {
    
          firebase.database().ref().child("patients").child(user.uid).on('value', (e) => {
            if (e.val()) {
                let data = Object.values(e.val())
                this.setState({ allPat: data })
                console.log(data)
            }
        })
    
        }
      
    });
    }
  render() {
    return (
      <Container>
        <Header style={styles.Header}>
        <Left>
            <Button transparent onPress={()=> Actions.Welcome()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Patient Details</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>
              
        <List>
            <ListItem itemDivider style={styles.heading1}>
              <Text style={styles.headingText1}>Patient Name:</Text>
            </ListItem>                    
            <ListItem style={styles.text2}>
              <Text style={styles.text}>{ this.props.navigation.state.params.patientName }</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text style={styles.headingText1}>Patient Age:</Text>
            </ListItem>                    
            <ListItem style={styles.text2}>
              <Text style={styles.text}>{ this.props.navigation.state.params.patientAge }</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text style={styles.headingText1}>Disease:</Text>
            </ListItem>                    
            <ListItem style={styles.text2}>
              <Text style={styles.text}>{ this.props.navigation.state.params.medicalDescription }</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text style={styles.headingText1}>Medicine:</Text>
            </ListItem>                    
            <ListItem style={styles.text2}>
              <Text style={styles.text}>{ this.props.navigation.state.params.medicineSuggesstion }</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text style={styles.headingText1}>Next Appoinment Date:</Text>
            </ListItem>                    
            <ListItem style={styles.text2}>
              <Text style={styles.text}>{ this.props.navigation.state.params.nextAppoinmentDate }</Text>
            </ListItem>
          </List>
          <Button style={styles.btn} block info onPress={()=>Actions.Update({pushKeys:this.props.navigation.state.params.pushKeys})}><Text style={styles.btnText}> Update </Text></Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headingText1:{
    color: "#528ae5",
    fontSize: 20,
  },
  text:{
    color: "#d60e3a",
    fontSize: 17,
  },
  text2:{
    justifyContent: "center"
  },
  btn:{
    
    marginTop: 8
  },
  btnText:{
    fontSize: 20,
    padding: 5,
    color: "#d60e3a",
  },
  Header:{
    backgroundColor: "#528ae5"
}
 
});









// componentDidMount() {
//   firebase.auth().onAuthStateChanged((user)=>{

//   if (user) {

//       firebase.database().ref().child("patients").child(user.uid).on('value', (e) => {
//         if (e.val()) {
//             let data = Object.values(e.val())
//             this.setState({ allPat: data })
//             console.log(data)
//         }
//     })

//     }
  
// });
// }










// {/* <Body>
// <H3>Patient Name :<Text> { this.props.navigation.state.params.patientName }</Text></H3>
// <H3>Patient Age :<Text> { this.props.navigation.state.params.patientAge }</Text></H3>
// <H3>Consultant :<Text> { this.props.navigation.state.params.consultant}</Text></H3>
// <H3>Medical Description :<Text> { this.props.navigation.state.params.medicalDescription }</Text></H3>
// <H3>Medicine Suggesstion :<Text> { this.props.navigation.state.params.medicineSuggesstion }</Text></H3>
// <H3>Next Appointment :<Text> { this.props.navigation.state.params.nextAppoinmentDate }</Text></H3>
// <Button danger onPress={()=>Actions.Update({pushKeys:this.props.navigation.state.params.pushKeys})}><Text> Update </Text></Button>
// </Body> */}