/* @flow */

import {
    Content,
    List,
    ListItem,
    Input,
    Picker,
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
    Text,
    TextInput,
    UselessTextInput,
    Alert,
    AsyncStorage
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Button from 'react-native-button';
import {
    gql,
    graphql,
    compose
} from 'react-apollo';
import uuidv1 from 'uuid/v1';
import ModalDropdown from 'react-native-modal-dropdown';
let {
    width
} = Dimensions.get('window');
import SpinnerComponent from './../SpinnerComponent';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../../constants/index";

/**
 * @summary this is the new style of the component for adding education history.
 * @module EducationHistory
 * @author Robert M.
 * @since 1/31/2017
 * @type {Object}
 */
class EducationHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            educationalInstitutionName: "",
            city: "",
            state: "",
            awardType: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            validationError: false,
            isAddress: true,
            openModal: false,
            isLoading: false
        };
        this.onSavePress = this.onSavePress.bind(this);
        this.onDeletePress = this.onDeletePress.bind(this);
        this.onSelect = this.onSelect.bind(this);
        //Tracker.trackScreenView("Education History");
    }

    componentWillMount() {
        if (this.props.education) {
            this.setState({ ...this.props.education
            })
        }
    }

    onSavePress() {

        const {
            educationalInstitutionName,
            city,
            state,
            awardType,
            fieldOfStudy,
            startDate,
            endDate
        } = this.state;
        const action = this.state.id ? "updateUserEducation" : "createUserEducation";
        const id = this.state.id ? this.state.id : uuidv1();

        if (!educationalInstitutionName || !city || !state || !startDate || !endDate) {
            this.setState({
                validationError: true
            });
            return
        }

        const educationPlace = {
            id,
            educationalInstitutionName,
            city,
            state,
            awardType,
            fieldOfStudy,
            startDate,
            endDate,
            userId: this.props.store.myProfile.id,
        };
        this.setState({
            isLoading: true
        });
        this.props[action]({
                variables: educationPlace
            })
            .then((response) => {
                AsyncStorage.getItem('email').then((value)=>{
                    //Tracker.trackEvent(value, "Update or Create User Education");
                }).catch((err)=>{
                    //Tracker.trackEvent("Not Define", "Update or Create User Education");
                })

                console.log('done');
                Actions.Account({tab: "PROFILE"});
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                console.log(err);
                console.log(id)
            });
    }

    onDeletePress() {
        if (this.state.id) {
            this.setState({
                isLoading: true
            });
            this.props.deleteUserEducation({
                    variables: {
                        id: this.state.id
                    }
                })
                .then((response) => {
                    AsyncStorage.getItem('email').then((value)=>{
                        //Tracker.trackEvent(value, "Delete User Education");
                    }).catch((err)=>{
                        //Tracker.trackEvent("Not Define", "Delete User Education");
                    })

                    console.log('done');
                    Actions.Account({tab: "PROFILE"});
                })
                .catch((err) => {
                    Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                    console.log(err);
                    console.log(id)
                });
        }
    }

    onSelect(index, value) {
        this.setState({
            state: value
        })
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
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <Text>Educational Institution Name</Text>
                        <TextInput
                            style={[styles.textInput, {fontSize: 16}]}
                            onChangeText={(educationalInstitutionName) => this.setState({educationalInstitutionName})}
                            value={this.state.educationalInstitutionName}
                            underlineColorAndroid='transparent'
                        />
                        <Text>City</Text>
                        <TextInput
                            style={[styles.textInput, {fontSize: 16}]}
                            onChangeText={(city) => this.setState({city})}
                            value={this.state.city}
                            underlineColorAndroid='transparent'
                        />
                        <Text>State</Text>
                        <ModalDropdown
                            onSelect={(index, value) => this.onSelect(index, value)}
                            dropdownStyle={{ width: 315 }}
                            dropdownTextStyle={{ fontSize: 16 }}
                            options={['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']}
                        >
                            <View style={[styles.textInput, {justifyContent: 'center', alignItems: 'center'}]}>
                                <Text style = {{fontSize: 16}}>{this.state.state}</Text>
                            </View>
                        </ModalDropdown>
                        <Text>Award Type (e.g. certificate, Degrees, etc.)</Text>
                        <TextInput
                            placeholder="(Optional)"
                            style={[styles.textInput, {fontSize: 16}]}
                            onChangeText={(awardType) => this.setState({awardType})}
                            value={this.state.awardType}
                            underlineColorAndroid='transparent'
                        />
                        <Text>Field of Study</Text>
                        <TextInput
                            placeholder="(Optional)"
                            style={[styles.textInput, {fontSize: 16}]}
                            onChangeText={(fieldOfStudy) => this.setState({fieldOfStudy})}
                            value={this.state.fieldOfStudy}
                            underlineColorAndroid='transparent'
                        />
                        <View style={{ height: 70, flexDirection: 'row' }}>
                            <View style={[{ flex: 1 }]}>
                                <Text style={styles.textHeader}>Start Date</Text>
                                <View style={{ marginLeft: 0}}>
                                    <DatePicker
                                        style={{ width: 160, marginTop: 10 }}
                                        date={this.state.startDate}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        iconSource={require('./../assets/ScheduledHours.png')}
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 0
                                            },
                                            dateText : {
                                                fontSize: 16
                                            }
                                            // ... You can check the source to find the other keys.
                                            }}
                                        onDateChange={(date) => {this.setState({startDate: date})}}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 , marginLeft: 25}}>
                                <Text style={styles.textHeader}>End Date</Text>
                                <View style={{ marginLeft: 0 }}>
                                    <DatePicker
                                        style={{ width: 160, marginTop: 10 }}
                                        date={this.state.endDate}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        iconSource={require('./../assets/ScheduledHours.png')}
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 0
                                            },
                                            dateText : {
                                                fontSize: 16
                                            }
                                            // ... You can check the source to find the other keys.
                                            }}
                                        onDateChange={(date) => {this.setState({endDate: date})}}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.state.validationError &&
                    (<View style={{marginLeft: 20, marginTop:5}}>
                        <Text style={{color: 'red' }}>Please input all fields</Text>
                    </View>)
                    }
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20}}>
                        <Button
                            onPress={() => this.onSavePress()}
                            containerStyle={styles.saveButton}
                            style={styles.buttonText}>
                            SAVE
                        </Button>
                    </View>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 7}}>
                        <Button
                            onPress={() => this.onDeletePress()}
                            containerStyle={styles.deleteButton}
                            style={styles.buttonText}>
                            DELETE
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
                paddingTop: 24
            },
            android: {
                paddingTop: 16
            }
        })
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 10
    },
    address: {
        marginLeft: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        marginTop: 15
    },
    description: {
        marginTop: 10
    },
    info: {
        marginTop: 130
    },
    text: {
        fontSize: 20,
        color: '#4A4A4A',
        fontFamily: 'Roboto'
    },
    textHeader: {
        fontSize: 15,
        color: '#4A4A4A',
        fontFamily: 'Roboto'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 10,
        paddingLeft: 8
    },
    saveButton: {
        padding: 7,
        height: 35,
        width: 170,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#002DB0'
    },
    deleteButton: {
        padding: 7,
        height: 35,
        width: 170,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#E33821',
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContentContainer: {
        marginTop: 6,
        width: width * 0.8,
        padding: 0,
        borderRadius: 5,
        backgroundColor: 'transparent'
    },
    modalContent: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: 'rgb(153,153,153)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

const createUserEducation = gql `
mutation createUserEducation($id: Uuid!, $userId: Uuid!, $educationalInstitutionName: String!, $city: String!, $state: String!, $awardType: String!, $fieldOfStudy: String!, $startDate: Datetime!, $endDate: Datetime!) {
    createUserEducation(input: {userEducation: {id: $id, userId: $userId, educationalInstitutionName: $educationalInstitutionName, city: $city, state: $state, awardType: $awardType, fieldOfStudy: $fieldOfStudy, startDate: $startDate, endDate: $endDate}}) {
        userEducation {
            id
            userId
            educationalInstitutionName
            city
            state
            awardType
            fieldOfStudy
            startDate
            endDate
        }
    }
}`;

const updateUserEducation = gql `
mutation updateUserEducation($id: Uuid!, $userId: Uuid!, $educationalInstitutionName: String!, $city: String!, $state: String!, $awardType: String!, $fieldOfStudy: String!, $startDate: Datetime!, $endDate: Datetime!) {
    updateUserEducationById(input: {id: $id, userEducationPatch: {userId: $userId, state: $state, city: $city, educationalInstitutionName: $educationalInstitutionName, awardType: $awardType, fieldOfStudy: $fieldOfStudy, startDate: $startDate, endDate: $endDate}}) {
        userEducation {
            id
            userId
            educationalInstitutionName
            city
            state
            awardType
            fieldOfStudy
            startDate
            endDate
        }
    }
}`;

const deleteUserEducation = gql `
mutation deleteUserEducationById($id: Uuid!) {
  deleteUserEducationById(input: {id: $id}) {
    deletedUserEducationId
  }
}`;

const EducationHistoryComponent = compose(
    graphql(createUserEducation, {
        name: 'createUserEducation'
    }),
    graphql(updateUserEducation, {
        name: 'updateUserEducation'
    }),
    graphql(deleteUserEducation, {
        name: 'deleteUserEducation'
    })
)(EducationHistory);

export default EducationHistoryComponent
