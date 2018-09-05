import React from 'react';
import { StyleSheet, Text, View, TextInput,Image } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';
import logo from './images/73cd65f0-76b2-4081-84bf-01c856177218.png';
import * as firebase from 'firebase';
 var config = {
    apiKey: "AIzaSyDIsrPB3QhsrGGjRvhdxNoyB3Q9DfR7YPY",
    authDomain: "patient-tracker-3aedc.firebaseapp.com",
    databaseURL: "https://patient-tracker-3aedc.firebaseio.com",
    projectId: "patient-tracker-3aedc",
    storageBucket: "patient-tracker-3aedc.appspot.com",
    messagingSenderId: "170464553633"
  };
   firebase.initializeApp(config);
class SignUp extends React.Component  {
  ref = firebase.database().ref();
  constructor() {
super();
this.state ={
  email:"",
  pass:""
}
  }
   email(ev) {
        this.setState({ email: ev });
    }
    pass(ev) {
        this.setState({ pass: ev });
    }
     SignUp_btn(ev) {
      const email = this.state.email;
       const pass = this.state.pass;
     const auth = firebase.auth();
        const prom = auth.createUserWithEmailAndPassword(email, pass);
        prom.then(ev => {
                alert("You Have Successfully Sign-Up");
                { Actions.SignIn()}

                
        })
        prom.catch(ev => alert(ev.message));
}
    
    
  render() {
    return (
    <Container>
       <Image style={styles.logo}
          source={require('./images/73cd65f0-76b2-4081-84bf-01c856177218.png')}
        />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input keyboardType="email-address" returnKeyLabel="next" onChangeText={this.email.bind(this)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry returnKeyLabel="go" onChangeText={this.pass.bind(this)}/>
            </Item>
            <Text>
{"\n"}

</Text>
            <Button block rounded danger onPress={()=> this.SignUp_btn()}>
            <Text>Sign Up</Text>
          </Button>
              <Text>
{"\n"}

</Text>
            <Button block rounded info onPress={()=> Actions.SignIn()}>
            <Text>Already A Account</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
}
}


export default SignUp;

const styles = StyleSheet.create({
  logo:{
   width:300 ,
   height:300,
   marginLeft:32
  },
  

})