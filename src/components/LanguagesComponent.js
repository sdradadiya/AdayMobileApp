import React, { Component } from 'react';
import { Textarea } from 'native-base';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    Alert,AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import {gql, graphql, compose} from 'react-apollo';
import uuidv1 from 'uuid/v1';
import SpinnerComponent from './SpinnerComponent';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../constants/index";

class Languages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            languageName: "",
            validationError: false,
            isLoading: false
        };
        this.onSaveButton = this.onSaveButton.bind(this);
        this.onDeleteButton = this.onDeleteButton.bind(this);
       //Tracker.trackScreenView("Opportunities Filter");
    }

    componentWillMount() {
        if(this.props.language) {
            this.setState({...this.props.language});
        }
    }

    onSaveButton() {
        if(this.state.languageName === "") {
            this.setState({validationError: true});
            return
        }

        const action = this.state.id ? "updateUserLanguageById" : "createUserLanguage";
        const id = this.state.id ? this.state.id : uuidv1();
        const language = {
            id,
            languageName: this.state.languageName,
            userId: this.props.store.myProfile.id,
        };
        this.setState({isLoading: true});
        this.props[action]({variables: language})
            .then((response) => {
                console.log('done');
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Update User Language");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "Update User Language");
                })
                Actions.Account({tab: "PROFILE"});
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                console.log(err);
                console.log(id)
            });
    }

    onDeleteButton() {
        if(this.state.id){
            this.setState({isLoading: true});
            this.props.deleteUserLanguageById({variables: {id: this.state.id}})
                .then((response) => {
                    console.log('done');
                    AsyncStorage.getItem('email').then((value)=>{
                       //Tracker.trackEvent(value, "Delete User Language");
                    }).catch((err)=>{
                       //Tracker.trackEvent("Not Define", "Delete User Language");
                    })
                    Actions.Account({tab: "PROFILE"});
                })
                .catch((err) => {
                    Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                    console.log(err);
                    console.log(id)
                });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={{marginTop: 30}}>
                    <Text>Language</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(languageName) => this.setState({languageName})}
                        value={this.state.languageName}
                    />
                </View>
                {this.state.validationError &&
                (<View>
                    <Text style={{color: 'red' }}>Please input all fields</Text>
                </View>)
                }
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Button
                        onPress={() => this.onSaveButton()}
                        containerStyle={styles.saveButton}
                        style={{color: 'white', fontSize: 15}}>
                        SAVE
                    </Button>
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Button
                        onPress={() => this.onDeleteButton()}
                        containerStyle={styles.deleteButton}
                        style={{color: 'white', fontSize: 15}}>
                        DELETE LANGUAGE
                    </Button>
                </View>
                <KeyboardSpacer/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // ...Platform.select({
        //     ios: {
        //         paddingTop: 64
        //     },
        //     android: {
        //         paddingTop: 54
        //     }
        // }),
        // paddingHorizontal: 25
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFFFFF"
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
    deleteButton: {
        padding: 7,
        height: 35,
        width: 170,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#E33821'
    }
});


const createUserLanguage = gql`
    mutation createUserLanguage($id: Uuid!, $userId: Uuid!, $languageName: String!) {
        createUserLanguage(input: {userLanguage: {id: $id, userId: $userId, languageName: $languageName}}) {
            userLanguage {
                id
                userId
                languageName
            }
        }
    }`;

const updateUserLanguageById = gql`
    mutation updateUserLanguageById($id: Uuid!, $userId: Uuid!, $languageName: String!) {
        updateUserLanguageById(input: {id: $id, userLanguagePatch: {userId: $userId, languageName: $languageName}}) {
            userLanguage {
                id
                userId
                languageName
            }
        }
    }`;

const deleteUserLanguageById = gql`
    mutation deleteUserLanguageById($id: Uuid!) {
        deleteUserLanguageById(input: {id: $id}) {
            userLanguage {
               id
               userId
               languageName
            }
        }
    }`;


const LanguagesComponent = compose(
    graphql(createUserLanguage, {
        name: 'createUserLanguage'
    }),
    graphql(updateUserLanguageById, {
        name: 'updateUserLanguageById'
    }),
    graphql(deleteUserLanguageById, {
        name: 'deleteUserLanguageById'
    })
)(Languages);

export default LanguagesComponent
