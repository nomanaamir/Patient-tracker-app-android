import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Container, Content, Left, Title, Right, SwipeRow, View, Text, Drawer, Button, Header, Item, Input, Icon, List, ListItem, Body, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SideBar from './Sidebar'
import * as firebase from 'firebase';
class Welcome extends React.Component {
    ref = firebase.database().ref();

    constructor() {
        super();
        this.state = {
            allPat: [],
            pushKeys: [],
            pat: ""
        }
    }
    logout() {
        firebase.auth().signOut();
        { Actions.SignIn() }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {

                firebase.database().ref().child("patients").child(user.uid).on('value', (e) => {
                    let pushKeys = []
                    if (e.val()) {
                        let data = e.val()
                        for (let i in data) {
                            pushKeys.push(i)
                        }
                        this.setState({ allPat: Object.values(data), pushKeys })
                        console.log(pushKeys)
                    }
                })

            }

        });
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        console.log("Noman Aamir")
        this.drawer._root.open()
    };
    searchPatient(value) {
        this.setState({ pat: value })
    }
    render() {
        console.log("this.state.pat", this.state.pat);
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar navigator={this.navigator} />}
            onClose={() => this.closeDrawer()} >
            <Container>
                
                <Header style={styles.Header}>
                    <Body>
                        <Title>Home</Title>
                    </Body>

                    <Right>
                        <Button transparent onPress={() => this.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" value={this.state.pat} onChangeText={this.searchPatient.bind(this)} />
                    <Icon name="ios-people" />
                </Item>
                <Content scrollEnabled={false}>
                    <SwipeRow
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        left={
                            <Button success onPress={() => Actions.AddPat()}>
                                <Icon active name="add" />
                            </Button>
                        }
                        body={
                            <View>
                                <Text>Swipe to add Patient</Text>
                            </View>
                        }
                        right={
                            <Button success onPress={() => Actions.AddPat()}>
                                <Icon active name="add" />
                            </Button>
                        }
                    />
                    <Content>
                        <List>
                            {this.state.allPat.filter(a => a.patientName.search(this.state.pat) !== -1).map((val, ind) =>
                                <ListItem key={ind} avatar>
                                    <Body>
                                        <Text onPress={() => {
                                            Actions.PatDetails({
                                                patientName: val.patientName,
                                                patientAge: val.patientAge,
                                                medicalDescription: val.medicalDescription,
                                                medicineSuggesstion: val.medicineSuggesstion,
                                                nextAppoinmentDate: val.nextAppoinmentDate,
                                                pushKeys: this.state.pushKeys[ind]
                                            })
                                        }}> {val.patientName}</Text>
                                        <Text note>See ALL Patient Details</Text>
                                    </Body>
                                </ListItem>
                            )}
                        </List>
                    </Content>
                </Content>
            </Container>
        </Drawer>
            
        );
    }
}

export default Welcome;



const styles = StyleSheet.create({
    Header: {
        backgroundColor: "#528ae5"
    }
});




// componentDidMount() {
//     firebase.auth().onAuthStateChanged((user)=>{

//     if (user) {

//       firebase.database().ref().child("patients").child(user.uid).on('value', (e) => {
//           let pushKeys = []
//           if (e.val()) {
//               let data = e.val()
//               for(let i in data){
//               pushKeys.push(i)
//               }
//               this.setState({ allPat: Object.values(data), pushKeys })
//               console.log(pushKeys)
//           }
//       })

//       }

//   });
// }