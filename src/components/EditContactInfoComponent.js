import React, {Component} from 'react';
import {Content, List, ListItem, Input, Thumbnail, Textarea} from 'native-base';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert,AsyncStorage
} from 'react-native';
import {gql, graphql} from 'react-apollo';
import {compose} from 'react-apollo';
import {Actions} from 'react-native-router-flux'
let {width} = Dimensions.get('window');
import {Grid} from "react-native-easy-grid";
import SpinnerComponent from './SpinnerComponent';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../constants/index";

class EditContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            email: '',
            error: "",
            id: '',
            originalPhoneNumber: ""
        };
        this.onSavePressed = this.onSavePressed.bind(this);
       //Tracker.trackScreenView("Edit Contact Info");

    }

    componentDidMount(){
        let phoneNumber=this.props.contactInfo.phoneNumber;
        let phoneNumberFormatted = "";
        if (phoneNumber) {
            phoneNumberFormatted = [
                phoneNumber.length >= 10 ? phoneNumber.slice(0, phoneNumber.length-10) + ' ' : '',
                '(', phoneNumber.slice(phoneNumber.length-10, phoneNumber.length-7), ')-',
                phoneNumber.slice(phoneNumber.length-7,phoneNumber.length-4), '-', phoneNumber.slice(phoneNumber.length-4)
            ].join('');
        }

        this.setState({
            phoneNumber: phoneNumberFormatted,
            originalPhoneNumber: this.props.contactInfo.phoneNumber,
            email: this.props.contactInfo.email,
            id: this.props.id,
            isLoading: false
        })
    }

    onSavePressed() {
        let phoneNumber=this.state.phoneNumber.replace(/[^0-9]/g, "");
        if (!phoneNumber || !this.state.email) {
            this.setState({error: "All Fields are Required!"});
            return;
        }
        else if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        {
            this.setState({error: "Email is invalid."});
            return;
        }
        else if(!phoneNumber.match(/^([0|\+[1]{1})?([0-9]{10})$/))
        {
            this.setState({error: "PhoneNumber is invalid."});
            return;
        }

        const contactInfo = {
            phoneNumber: phoneNumber,
            email: this.state.email,
        };
        this.setState({isLoading: true});
        let phoneChanged = this.state.originalPhoneNumber != phoneNumber;
        let verified = this.props.contactInfo.verified && !phoneChanged;
        this.props.updateUserContactInfo({variables: {id: this.state.id, userPhoneNumber: phoneNumber,
                                                      userEmail: this.state.email.trim().toLowerCase(), userPhoneConfirmed: verified}})
            .then((response) => {
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Update User Contact Info");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "Update User Contact Info");
                })
                this.props.actions.updateContactInfo(contactInfo);
                Actions.Account({tab: "PROFILE"});
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                this.setState({isLoading: false});
                console.log(err)
            })

    }

    render() {
        const {isLoading} = this.state;
        return (
            <ScrollView style={styles.container}>
                {isLoading &&
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent />
                </View>
                }
                {!isLoading &&
                <Grid style={styles.contentContainer}>
                    <ScrollView>
                        <Text style={styles.inputFieldLabel}>Phone Number</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.phoneNumber}
                                onChangeText={(text) => {
                                    text=text.replace(/[^0-9]/g, "");
                                    let countCode='';
                                    if(text.length>15)
                                        this.setState({error: "PhoneNumber is invalid."});
                                    else
                                        this.setState({error: ""});

                                    if(text.length>10) {
                                        countCode = [text.slice(0, text.length>15? 5 : text.length - 10), ' '].join('');
                                        text=text.slice(text.length>15? 5 : text.length - 10);
                                    }
                                    if(text.length>=1)
                                        text='('+text;
                                    if(text.length>=4)
                                        text=[text.slice(0, 4), ')-', text.slice(4)].join('');
                                    if(text.length>=9)
                                        text=[text.slice(0, 9), '-', text.slice(9)].join('');
                                    text=countCode + text;
                                    this.setState({phoneNumber: text});
                                }}
                                returnKeyType="next"
                                keyboardType="numeric"
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
                        <Text style={styles.errorText}>{this.state.error}</Text>
                        <TouchableOpacity onPress={() => this.onSavePressed()} style={styles.saveButtonContainer}>
                            <Text style={styles.buttonName}>SAVE</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Grid>
                }
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
        // flexDirection: 'column',
        // paddingLeft: 5,
        // paddingRight: 5,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFFFFF"
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

const updateUserContactInfo = gql`
  mutation updateUserById($id: Uuid!, $userPhoneNumber: String, $userEmail: String, $userPhoneConfirmed: Boolean) {
    updateUserById(input: {id: $id, userPatch: {userPhoneNumber: $userPhoneNumber, userEmail: $userEmail, userPhoneConfirmed: $userPhoneConfirmed}}) {
	    user{
	      id
	      userPhoneNumber,
	      userEmail,
	      userPhoneConfirmed
	    }
  	}
  }`;

const EditContactInfoComponent = compose(
    graphql(updateUserContactInfo, {
        name: 'updateUserContactInfo'
    }),
)(EditContactInfo);


export default EditContactInfoComponent