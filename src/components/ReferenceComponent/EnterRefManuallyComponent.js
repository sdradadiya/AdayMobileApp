/* @flow */

import {
    Content,
    List,
    ListItem,
    Input,
    Thumbnail,
    Textarea
} from 'native-base';
import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Platform,
    TouchableOpacity,
    Text,
    Picker, Alert,AsyncStorage
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux'
import {
    gql,
    ApolloClient,
    createNetworkInterface,
    ApolloProvider,
    graphql
} from 'react-apollo';
import {
    compose
} from 'react-apollo'
let {
    height,
    width
} = Dimensions.get('window');
import {
    Col,
    Row,
    Grid
} from "react-native-easy-grid";
import uuidv1 from 'uuid/v1';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../../constants/index";

/**
 * @description Allows user to enter a work reference manually
 * @author Vardan
 * Date: 7/1/2017
 * @type {Object}
 */
class EnterRefManually extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: '',
            relationship: '',
            id: '',
            error: "",
        };
        this.onSavePressed = this.onSavePressed.bind(this);
        this.onDeletePressed = this.onDeletePressed.bind(this);
       //Tracker.trackScreenView("Enter Reference Manually");

    }

    componentWillMount() {
        const data = this.props.data;
        if (data) {
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.referencePhoneNumber,
                email: data.referenceEmailAddress,
                relationship: data.relationship,
                id: data.id
            })
        }
    }

    onSavePressed() {
        if (!this.state.firstName || !this.state.lastName || !this.state.phoneNumber || !this.state.email || !this.state.relationship) {
            this.setState({
                error: "All Fields Above Are Required!"
            });
            return;
        }
        let id = this.state.id;
        let actionName = 'updateReferenceData';
        let mutationName = 'updateUserReference';
        if (!this.state.id) {
            id = uuidv1();
            actionName = 'saveReferenceData';
            mutationName = 'createUserReference';
        }
        const reference = {
            id: id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            referencePhoneNumber: this.state.phoneNumber,
            referenceEmailAddress: this.state.email,
            relationship: this.state.relationship,
            userId: this.props.store.myProfile.id,
        };
        this.props[mutationName]({
                variables: reference
            })
            .then((response) => {
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Update or Create Reference Data");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "Update or Create Reference Data");
                })

                this.props.actions[actionName](reference);
                Actions.Account({tab: "PROFILE"});
            })
            .catch((err)=>{
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
            })
    }

    onDeletePressed() {
        if (this.state.id) {
            this.props.deleteUserReference({
                    variables: {
                        id: this.state.id
                    }
                })
                .then((response) => {
                    AsyncStorage.getItem('email').then((value)=>{
                       //Tracker.trackEvent(value, "Delete Reference Data");
                    }).catch((err)=>{
                       //Tracker.trackEvent("Not Define", "Delete Reference Data");
                    })

                    Actions.Account({tab: "PROFILE"});
                })
                .catch((err)=>{
                    Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                })
        }
        Actions.Account({tab: "PROFILE"});
    }


    render() {
        return (
            <View style={styles.container}>
                <Grid style={styles.contentContainer}>
                    <ScrollView>
                        <Text style={styles.inputFieldLabel}>First Name</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.firstName}
                                onChangeText={(text) => this.setState({firstName: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.inputFieldLabel}>Last Name</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.lastName}
                                onChangeText={(text) => this.setState({lastName: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.inputFieldLabel}>Phone Number</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.phoneNumber}
                                onChangeText={(text) => this.setState({phoneNumber: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.inputFieldLabel}>Email Address</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.email}
                                onChangeText={(text) => this.setState({email: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.inputFieldLabel}>Relationship</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.relationship}
                                onChangeText={(text) => this.setState({relationship: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.errorText}>{this.state.error}</Text>
                        <TouchableOpacity onPress={() => this.onSavePressed()} style={styles.saveButtonContainer}>
                            <Text style={styles.buttonName}>SAVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onDeletePressed()} style={styles.deleteButtonContainer}>
                            <Text style={styles.buttonName}>DELETE REFERENCE</Text>
                        </TouchableOpacity>
                        <KeyboardSpacer/>
                    </ScrollView>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 64
            },
            android: {
                paddingTop: 24
            }
        }),
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5,
    },
    contentContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    inputField: {
        borderColor: 'rgba(74,74,74,0.5)',
        borderWidth: 1,
        height: 40
    },
    inputFieldLabel: {
        paddingTop: 10,
        color: '#666666',
        fontFamily: 'Roboto'
    },
    saveButtonContainer: {
        backgroundColor: '#0022A1',
        padding: 10,
        width: width * 0.6,
        marginLeft: width * 0.2 - 15,
        marginTop: 30,
    },
    deleteButtonContainer: {
        backgroundColor: '#E33821',
        padding: 10,
        width: width * 0.6,
        marginLeft: width * 0.2 - 15,
        marginVertical: 10,
    },
    buttonName: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const createUserReference = gql `
  mutation createUserReference($id: Uuid!, $userId: Uuid!, $firstName: String!, $lastName: String!, $referencePhoneNumber: String!, $referenceEmailAddress: String!, $relationship: String!) {
    createUserReference(input: {userReference: { id: $id , userId: $userId, firstName: $firstName, lastName: $lastName, referencePhoneNumber: $referencePhoneNumber, referenceEmailAddress: $referenceEmailAddress, relationship: $relationship}}) {
	    userReference{
	      id
	      userId
          firstName
          lastName
	    }
  	}
  }`;
const updateUserReference = gql `
  mutation updateUserReferenceById($id: Uuid!, $userId: Uuid, $firstName: String, $lastName: String, $referencePhoneNumber: String, $referenceEmailAddress: String, $relationship: String) {
    updateUserReferenceById(input: {id: $id, userReferencePatch: { id: $id , userId: $userId, firstName: $firstName, lastName: $lastName, referencePhoneNumber: $referencePhoneNumber, referenceEmailAddress: $referenceEmailAddress, relationship: $relationship}}) {
	    userReference{
	      id
	      userId
          firstName
          lastName
	    }
  	}
  }`;
const deleteUserReference = gql `
  mutation deleteUserReferenceById($id: Uuid!) {
    deleteUserReferenceById(input: {id: $id}) {
	    userReference{
	      id
	      userId
          firstName
          lastName
	    }
  	}
  }`;

const EnterRefManuallyComponent = compose(
    graphql(createUserReference, {
        name: 'createUserReference'
    }),
    graphql(updateUserReference, {
        name: 'updateUserReference'
    }),
    graphql(deleteUserReference, {
        name: 'deleteUserReference'
    })
)(EnterRefManually);

export default EnterRefManuallyComponent
