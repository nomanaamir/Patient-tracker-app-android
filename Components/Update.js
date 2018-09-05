import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button,Header,Icon,Right,Left,Title,Body} from 'native-base';
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
         patient:'',
         allPat:[]
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
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
      
        if (user) {
            firebase.database().ref().child(`patients/${user.uid}/${this.props.navigation.state.params.pushKeys }`).on('value', (e) => {
              if (e.val()) {
                  console.log(e.val())
                  let data = e.val()
                  this.setState({ allPat: data })
                  this.setState({patientName:data.patientName,patientAge:data.patientAge,medicalDescription:data.medicalDescription,medicineSuggesstion:data.medicineSuggesstion,nextAppoinmentDate:data.nextAppoinmentDate})
              }
          })
      
          }
        
      });
      }
    update(){
        
        const patientName = this.state.patientName;
        const patientAge = this.state.patientAge;
        const medicineSuggesstion = this.state.medicineSuggesstion;
        const medicalDescription = this.state.medicalDescription;
        const nextAppoinmentDate = this.state.nextAppoinmentDate;
        const auth = firebase.auth();
        
        auth.onAuthStateChanged(ev => {
            if (ev.uid != null) {
                this.ref.child(`patients/${ev.uid}/${this.props.navigation.state.params.pushKeys }`).update({
                  
                    patientName: this.state.patientName,
                    patientAge: this.state.patientAge,
                    medicineSuggesstion: this.state.medicineSuggesstion,
                    medicalDescription: this.state.medicalDescription,
                    nextAppoinmentDate: this.state.nextAppoinmentDate
                })
                alert("Successfully Updated")
                {Actions.Welcome()}
                 
            }
        })
    }
   
  render() {
    return (
    <Container>
        <Header style={styles.Header}>
        <Left>
            <Button transparent onPress={()=> Actions.PatDetails()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Update Patient</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
    <Form>
         <Item floatingLabel>
              <Label>Patient Name</Label>
              <Input value={this.state.patientName} onChangeText={this.patientName.bind(this)}/>
            </Item>
             <Item floatingLabel>
              <Label>Patient Age</Label>
              <Input keyboardType="numeric" value={this.state.patientAge} onChangeText={this.patientAge.bind(this)}/>
            </Item>
            <Item floatingLabel>
              <Label>Disease</Label>
              <Input value={this.state.medicalDescription} onChangeText={this.medicalDescription.bind(this)}/>
            </Item>
             <Item floatingLabel>
              <Label>Medicine</Label>
              <Input value={this.state.medicineSuggesstion} onChangeText={this.medicineSuggesstion.bind(this)}/>
            </Item>
             <Item floatingLabel>
              <Label>Next Appoinment Date</Label>
              <Input value={this.state.nextAppoinmentDate} onChangeText={this.nextAppoinmentDate.bind(this)}/>
            </Item>
            <Text>
{"\n"}

</Text>

            <Button block rounded info onPress={()=> this.update()}>
            <Text>Update Patient</Text>
          </Button>
          </Form>
     </Container>
    );
}
}


export default AddPat;


const styles = StyleSheet.create({
    Header:{
        backgroundColor: "#528ae5"
    }
});




// <Button block rounded info onPress={()=> this.logout()}>
// <Text>Log Out</Text>
// </Button>