/**
 * Created by Robert on 1/31/2017.
 */
import {Content, List, ListItem, Input, Picker, Thumbnail, Textarea } from 'native-base';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Platform,
    Text,
    TextInput,
    Keyboard,
    Alert,
    AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Button from 'react-native-button';
import {gql, graphql, compose} from 'react-apollo';
import uuidv1 from 'uuid/v1';
import ModalDropdown from 'react-native-modal-dropdown';
import SpinnerComponent from './../SpinnerComponent';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../../constants/index";
let {width} = Dimensions.get('window');

class WorkHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            employerName: "",
            city: "",
            state: "",
            jobTitle: "",
            jobDescription: "",
            startDate: null,
            endDate: null,
            validationError: false,
            openModal: false,
            isLoading: false,
            topMargin:0
        };
        this.onSavePress = this.onSavePress.bind(this);
        this.onDeletePress = this.onDeletePress.bind(this);
        this.onSelect = this.onSelect.bind(this);
       //Tracker.trackScreenView("Work History");

    }
    _keyboardDidShow = (e) => {
        const height=e.endCoordinates.height;
        this.setState({
            bottomMargin: -height,
            topMargin:-150,
        })
    }

    _keyboardDidHide =(e)=> {

        this.setState({
            bottomMargin: 0,
            topMargin:0,
        })
        this.scrollView.scrollToEnd();
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        if(this.props.work) {
            this.setState({...this.props.work })
        }
    }
    
    onSavePress() {
        const { employerName, city, state, jobTitle, jobDescription, startDate, endDate } = this.state;
        const action = this.state.id ? "updateUserEmployerById" : "createUserEmployer";
        const id = this.state.id ? this.state.id : uuidv1();
        
        if( !employerName || !city || !state || !jobTitle || !startDate || !endDate ) {
            this.setState({validationError:true});
            return
        }

        const userEmployer = {
            id,
            employerName,
            city,
            state,
            jobTitle,
            jobDescription,
            startDate,
            userId: this.props.userId,
        };
        if (endDate) {
            userEmployer["endDate"] = endDate
        }

        var payment = {variables: { userEmployer: userEmployer}}
        if (action == "updateUserEmployerById"){
            payment = {variables: {id: userEmployer.id, UserEmployerPatch: userEmployer}}
        } 
        
        this.setState({isLoading: true});
        this.props[action](payment)
            .then((response) => {
                this.setState({isLoading: false});
                Actions.Account({tab: "PROFILE"});
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                Actions.Account({tab: "PROFILE"});
            });
    }
    
    onDeletePress() {
        if(this.state.id){
            this.setState({isLoading: true});
            this.props.deleteUserEmployerById({variables: {id: this.state.id}})
                .then((response) => {
                    AsyncStorage.getItem('email').then((value)=>{
                       //Tracker.trackEvent(value, "Delete User Employee");
                    }).catch((err)=>{
                       //Tracker.trackEvent("Not Define", "Delete User Employee");
                    })
                    Actions.Account({tab: "PROFILE"});
                })
                .catch((err) => {
                    Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                });
        }
        
    }

    onSelect(index, value) {
        this.setState({state: value})
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
                <ScrollView
                    ref={ref => this.scrollView = ref}

                    style={{marginTop: Platform.OS === 'android' ? this.state.topMargin :0}}
                >
                    <View style={styles.content}>
                        <Text>Employer Name</Text>
                        <TextInput
                            style={[styles.textInput, {fontSize: 16}]}
                            onChangeText={(employerName) => this.setState({employerName})}
                            value={this.state.employerName}
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
                                <Text style={{fontSize: 16}}>{this.state.state}</Text>
                            </View>
                        </ModalDropdown>
                        <Text>Job Title</Text>
                        <TextInput
                            placeholder="Cashier"
                            style={[styles.textInput, {fontSize: 16}]}
                            onChangeText={(jobTitle) => this.setState({jobTitle})}
                            value={this.state.jobTitle}
                            underlineColorAndroid='transparent'
                        />
                        <Text>Job Description</Text>
                        <TextInput
                            placeholder="(Optional)"
                            style={[styles.textInput, {fontSize: 16}]}
                            onChangeText={(jobDescription) => this.setState({jobDescription})}
                            value={this.state.jobDescription}
                            underlineColorAndroid='transparent'
                        />
                        <View style={{ height: 70, flexDirection: 'row' }}>
                            <View style={[{ flex: 1 }]}>
                                <Text style={styles.textHeader}>Start Date</Text>
                                <View style={{ marginLeft: 0 }}>
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
                                                top: 4
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
                            <View style={{ flex: 1, marginLeft: 25}}>
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
                                            },
                                            dateInput: {
                                                marginLeft: 0
                                            },
                                            dateText : {
                                                fontSize: 16
                                            }
                                            // ... You can check the source to find the other keys.
                                            }}
                                        onDateChange={(date) => {this.setState
                                            ({endDate: date, presEmp:false})}}
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
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 7,
                     marginBottom: 10}}>
                        <Button
                            onPress={() => this.onDeletePress()}
                            containerStyle={styles.deleteButton}
                            style={styles.buttonText}>
                            DELETE WORK EXPERIENCE
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
        flex:1,
        paddingHorizontal: 30,

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
        fontSize: 24,
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
        paddingLeft: 8,
    },
    saveButton: {
        padding: 7,
        height: 35,
        width: 220,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#002DB0'
    },
    deleteButton: {
        padding: 7,
        height: 35,
        width: 220,
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
    },
    nopeButton: {
        padding: 7,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        height: 30,
        width: 110,
    },
    yupButton: {
        padding: 7,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        backgroundColor: '#0022A1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        height: 30,
        width: 110,
    }
});

const createUserEmployer = gql`
  mutation createUserEmployer( $userEmployer: UserEmployerInput!) {
  createUserEmployer(input: {userEmployer: $userEmployer}) {
    userEmployer {
      id
      userId
      employerName
      city
      state
      jobTitle
      jobDescription
      startDate
      endDate
    }
  }
}`;

const updateUserEmployerById = gql`
 mutation updateUserEmployer($id: Uuid!, $UserEmployerPatch: UserEmployerPatch!) {
  updateUserEmployerById(input: {id: $id, userEmployerPatch: $UserEmployerPatch }) {
    userEmployer {
      id
      userId
      employerName
      city
      state
      jobTitle
      jobDescription
      startDate
      endDate
    }
  }
}`;

const deleteUserEmployerById = gql`
mutation deleteUserEmployerById($id: Uuid!) {
    deleteUserEmployerById(input: {id: $id}) {
        deletedUserEmployerId
    }
}`;

const WorkHistoryComponent = compose(
    graphql(createUserEmployer, {
        name: 'createUserEmployer'
    }),
    graphql(updateUserEmployerById, {
        name: 'updateUserEmployerById'
    }),
    graphql(deleteUserEmployerById, {
        name: 'deleteUserEmployerById'
    })
)(WorkHistory);

export default WorkHistoryComponent
