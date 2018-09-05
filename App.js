import React from 'react';
import { Text, View } from 'react-native';
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Welcome from "./Components/Welcome";
import AddPat from "./Components/AddPat";
import PatDetails from "./Components/PatDetails";
import Update from "./Components/Update";
import { Router, Scene ,Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
export default class App extends React.Component {
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    }
  render() {
    return (

       <Router>
      <Scene key="root">
        <Scene
        key="SignIn"
        component={SignIn}
        initial
        hideNavBar={true}
          />
          <Scene
        key="SignUp"
        component={SignUp}
        hideNavBar={true}
        />
          <Scene
        key="Welcome"
        component={Welcome}
        hideNavBar={true}
        />
         <Scene
        key="AddPat"
          component={AddPat}
          hideNavBar={true}
        />
         <Scene
        key="PatDetails"
          component={PatDetails}
          hideNavBar={true}
        />
        <Scene
        key="Update"
          component={Update}
          hideNavBar={true}
        />
      </Scene>
    </Router>
    
    );
  }
}
