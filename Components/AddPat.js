import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import SideBar from './Sidebar'
import { Container, Content, Form, Item, Input, Label, Button,Header,Body,Title,Right,Left,Icon,Drawer} from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
class AddPat extends React.Component  {
    ref = firebase.database().ref();
 constructor(){
     super();
     this.state={
         patientName:"",
         patientAge:"",
         medicineSuggesstion:"",
         medicalDescription:"",
         nextAppoinmentDate:"",
         patient:''
     }
     
 }
  patientName(ev) {
        this.setState({ patientName: ev });
    }
     patientAge(ev) {
        this.setState({ patientAge: ev });
    }
     medicineSuggesstion(ev) {
        this.setState({ medicineSuggesstion: ev });
    }
    medicalDescription(ev) {
        this.setState({ medicalDescription: ev });
    }
    nextAppoinmentDate(ev) {
        this.setState({ nextAppoinmentDate: ev });
    }
    logout() {
        firebase.auth().signOut();
       {Actions.SignIn()}
    }
    add(){
        
        const patientName = this.state.patientName;
        const patientAge = this.state.patientAge;
        const medicineSuggesstion = this.state.medicineSuggesstion;
        const medicalDescription = this.state.medicalDescription;
        const nextAppoinmentDate = this.state.nextAppoinmentDate;
        const auth = firebase.auth();
        
        auth.onAuthStateChanged(ev => {
            if (ev.uid != null) {
                this.ref.child("patients").child(ev.uid).push({
                  
                    patientName: this.state.patientName,
                    patientAge: this.state.patientAge,
                    medicineSuggesstion: this.state.medicineSuggesstion,
                    medicalDescription: this.state.medicalDescription,
                    nextAppoinmentDate: this.state.nextAppoinmentDate
                })
                alert("Successfully Add")
                {Actions.Welcome()}
                 
            }
        })
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        console.log("Noman Aamir")
        this.drawer._root.open()
    };
  render() {
    return (
        <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
         <Container>
        <Header style={styles.Header}>
        <Left>
            <Button transparent onPress={()=> Actions.Welcome()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add Patient</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
    <Form>
         <Item floatingLabel>
              <Label>Patient Name</Label>
              <Input onChangeText={this.patientName.bind(this)}/>
            </Item>
             <Item floatingLabel>
              <Label>Patient Age</Label>
              <Input keyboardType="numeric" onChangeText={this.patientAge.bind(this)}/>
            </Item>
            <Item floatingLabel>
              <Label>Disease</Label>
              <Input onChangeText={this.medicalDescription.bind(this)}/>
            </Item>
             <Item floatingLabel>
              <Label>Medicine</Label>
              <Input onChangeText={this.medicineSuggesstion.bind(this)}/>
            </Item>
             <Item floatingLabel>
              <Label>Next Appoinment Date</Label>
              <Input onChangeText={this.nextAppoinmentDate.bind(this)}/>
            </Item>
            <Text>
{"\n"}

</Text>

            <Button block rounded info onPress={()=> this.add()}>
            <Text>Add Patient</Text>
          </Button>
          </Form>
     </Container>
        </Drawer>
   
    );
}
}


export default AddPat;


const styles = StyleSheet.create({
    Header:{
        backgroundColor: "#528ae5"
    }
});