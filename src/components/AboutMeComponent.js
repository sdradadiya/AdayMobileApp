import React, { Component } from 'react';
import { Textarea } from 'native-base';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Platform,
    Text,
    Alert,
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import {gql, graphql} from 'react-apollo';
import {compose} from 'react-apollo'
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../constants/index";

class AboutMe extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            aboutMeText: "",
            validationError: false
        };
        this.onSubmitPress = this.onSubmitPress.bind(this)
       //Tracker.trackScreenView("About Me");

    }
    
    componentWillMount() {
        this.setState({...this.state, ...this.props.aboutMe});
    }
    
    onSubmitPress() {
        const { firstName, lastName, aboutMeText, userEmail, avatarUrl } = this.state;
        
        if (!firstName || !lastName || !aboutMeText) {
            this.setState({ validationError: true });
            return
        }
        const userInfo = {
            id: this.props.store.myProfile.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            aboutMeText: this.state.aboutMeText,
            userEmail: this.state.userEmail.toLowerCase(),
            avatarUrl: this.state.avatarUrl
        };
        
        this.props.updateUserInfo({variables: userInfo})
            .then((response) => {
                console.log('done');
                this.props.actions.saveAboutMeData(userInfo);
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Update User Info");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "Update User Info");
                })
                Actions.Account({tab: "PROFILE"});
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                console.log(err);
                console.log(id)
            });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                <View style={{marginTop: 30}}>
                    <Text style={{color: '#666666', marginTop: 12}}>First Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(firstName) => this.setState({firstName})}
                        value={this.state.firstName}
                    />
                    <Text style={{color: '#666666', marginTop: 12}}>Last Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(lastName) => this.setState({lastName})}
                        value={this.state.lastName}
                    />
                    <Text style={{color: '#666666', marginTop: 12}}>About Me (170 Character Limit)</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(aboutMeText) => this.setState({aboutMeText})}
                        value={this.state.aboutMeText}
                    />
                    {this.state.validationError &&
                        (<View>
                            <Text style={{color: 'red' }}>Please input all fields</Text>
                        </View>)
                    }
                </View>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Button
                        onPress={() => this.onSubmitPress()}
                        containerStyle={styles.saveButton}
                        style={{color: 'white', fontSize: 16}}>
                        SAVE
                    </Button>
                </View>
                    <KeyboardSpacer/>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 20
            },
            android: {
                paddingTop: 12
            }
        }),
        paddingHorizontal: 25
    },
    multiline: {
        borderWidth: 1,
        borderColor: '#0f0f0f',
        flex: 1,
        fontSize: 13,
        height: 50,
        padding: 4,
        marginBottom: 4,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10
    },
    saveButton: {
        padding: 7,
        height: 35,
        width: 170,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#0022A1'
    },
});

const updateUserInfo = gql`
  mutation UpdateUserInfo($id: Uuid!, $firstName: String!, $lastName: String!, $aboutMeText: String!) {
     updateUserById(input: {id: $id, userPatch: { firstName: $firstName, lastName: $lastName, aboutMeText: $aboutMeText}}) {
	    user{
	     	id
            firstName
            lastName
        	aboutMeText
	    }
  	 }
  }`;

export default AboutMeComponent = compose(
    graphql(updateUserInfo, {
        name: 'updateUserInfo'
    })
)(AboutMe);
