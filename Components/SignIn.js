import React from 'react';
import { StyleSheet, Text, View, TextInput, Image,KeyboardAvoidingView } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import logo from './images/73cd65f0-76b2-4081-84bf-01c856177218.png';
class SignIn extends React.Component  {
  constructor() {
super();
this.state ={
  email:"",
  pass:""
}
  }
   email(ev){
        this.setState({email: ev});
    }
    pass(ev){
        this.setState({pass: ev});
    }
    SignIn_btn(){
        const email = this.state.email;
        const pass = this.state.pass;
        const auth = firebase.auth();
        const prom = auth.signInWithEmailAndPassword(email,pass)
        prom.then(ev => {
            alert("You Have Successfully Sign-In")
            {Actions.Welcome()}
        })
        prom.catch(ev => {
            alert(ev.message)
        });
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
              <Input keyboardType="email-address" returnKeyType="next" returnKeyLabel="next" onChangeText={this.email.bind(this)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry returnKeyType="go" returnKeyLabel="go" onChangeText={this.pass.bind(this)}/>
            </Item>
            <Text>
{"\n"}

</Text>
            <Button block rounded danger onPress={()=>this.SignIn_btn()}>
            <Text>Sign In</Text>
          </Button>
           <Text>
{"\n"}

</Text>
            <Button block rounded info onPress={()=> Actions.SignUp()}>
            <Text>Create Account</Text>
          </Button>
          </Form>
        </Content>
        </Container>
    );
}
}


export default SignIn;

const styles = StyleSheet.create({
  logo:{
   width:300 ,
   height:300,
   marginLeft:32
  },
  

})