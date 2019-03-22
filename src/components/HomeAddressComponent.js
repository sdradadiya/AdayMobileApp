/**
 * Created by Vardan on 2/1/2017.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {gql, graphql} from 'react-apollo';
import {compose} from 'react-apollo';
import SpinnerComponent from './SpinnerComponent';
import {Badge, Input} from 'native-base';
let {width} = Dimensions.get('window');
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../constants/index";

class HomeAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeAddress1: '',
            homeAddress2: '',
            validationStatus: false,
            address: '',
            zipCode: '',
            isLoading: false
        };
        this.validation = this.validation.bind(this);
        this.saveHomeAddress = this.saveHomeAddress.bind(this);
       //Tracker.trackScreenView("Home Address");

    }

    componentDidMount() {
        const homeAddress = this.props.homeAddress;
        this.setState({
            homeAddress1: homeAddress.homeAddress1 || '',
            homeAddress2: homeAddress.homeAddress2 || '',
            city: homeAddress.city || '',
            state: homeAddress.state || '',
            zipCode: homeAddress.zipCode || ''
        })
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.state.myProfile.homeAddress).length) {
            Actions.Account({tab: "PROFILE"});
        }
    }

    validation() {
        if (this.state.homeAddress1 || this.state.homeAddress2) {
            this.setState({validationStatus: false});
            this.saveHomeAddress();
        } else {
            this.setState({validationStatus: true});
        }
    }

    saveHomeAddress() {
        const homeAddress1 = this.state.homeAddress1 ? this.state.homeAddress1 : '';
        const homeAddress2 = this.state.homeAddress2 ? this.state.homeAddress2 : '';
        const city = this.state.city;
        const state = this.state.state;
        const zipCode = this.state.zipCode;
        const homeAddress = {
            homeAddress1,
            homeAddress2,
            city,
            state,
            zipCode
        };

        const fullAddress = {
            "home_address": [
                {"address_line1" : homeAddress1,
                 "address_line2" : homeAddress2,
                 "state" : state,
                 "city" : city}
            ]
        };
        this.setState({isLoading: true});
        this.props.updateUserHomeAddress({variables: {id: this.props.state.myProfile.id, homeAddress: JSON.stringify(fullAddress),
                                                      zipCode: zipCode}})
            .then((response) => {
                this.setState({isLoading: false});
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Update User Home Address");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "LogOut from APP");
                })

                this.props.actions.saveHomeAddress(homeAddress);
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                console.log(err)
            })
    }

    render() {
        const {isLoading} = this.state;

       if  (!!isLoading) { 
                return (
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent />
                </View>
                )
        }
        

        return (
            <ScrollView style={styles.container}>
                {!isLoading &&
                    <View>
                        {this.state.validationStatus &&
                        <Text style={{marginTop: 20, color: 'red', alignSelf: 'center'}}>
                            Please fill address field(s).
                        </Text>
                        }
                        <Text style={styles.inputFieldLabel}>Address Line 1</Text>
                        <View style={styles.inputField}>
                            <Input
                                defaultValue={this.state.homeAddress1}
                                onChangeText={(text) => this.setState({homeAddress1: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.inputFieldLabel}>Address Line 2</Text>
                        <View style={styles.inputField}>
                            <Input
                                defaultValue={this.state.homeAddress2}
                                onChangeText={(text) => this.setState({homeAddress2: text})}
                                returnKeyType="next"
                            />
                        </View>
                        {/* Region */}
                        <Text style={styles.inputFieldLabel}>City</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.city}
                                onChangeText={(text) => this.setState({city: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.inputFieldLabel}>State</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.state}
                                onChangeText={(text) => this.setState({state: text})}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={styles.inputFieldLabel}>ZipCode</Text>
                        <View style={[styles.inputField, {marginTop: 10}]}>
                            <Input
                                defaultValue={this.state.zipCode}
                                onChangeText={(text) => this.setState({zipCode: text})}
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                }
                {!isLoading &&
                <TouchableOpacity onPress={() => this.validation()} style={styles.saveButtonContainer}>
                    <Text style={styles.buttonName}>SAVE</Text>
                </TouchableOpacity>
                }
                <KeyboardSpacer/>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // ...Platform.select({
        //     ios: {
        //         paddingTop: 40
        //     },
        //     android: {
        //         paddingTop: 12
        //     }
        // }),
        // paddingHorizontal: 30
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFFFFF"
    },
    contentContainer: {
        marginTop: 30
    },
    contentContainerError: {
        marginTop: 10
    },
    inputFieldContainer: {
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        height: 40,
        justifyContent: 'center'
    },
    textStyle: {
        color: "rgba(74,74,74,0.5)",
        fontSize: 20,
        height: 30,

        paddingVertical: 0,
        textDecorationLine: "none"
    },
    fullHomeAddressContainer: {
        marginTop: 30,
        backgroundColor: 'rgba(216,216,216,0.2)',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    inputField: {
        borderColor: 'rgba(74,74,74,0.5)',
        borderWidth: 1,
        height: 40,
        marginTop: 10
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
});

const updateUserHomeAddress = gql`
  mutation updateUserById($id: Uuid!, $homeAddress: Json, $zipCode: String) {
    updateUserById(input: {id: $id, userPatch: {homeAddress: $homeAddress, zipCode: $zipCode}}) {
	    user{
	      homeAddress
	      zipCode
	    }
  	}
  }`;

const HomeAddressComponent = compose(
    graphql(updateUserHomeAddress, {
        name: 'updateUserHomeAddress'
    }),
)(HomeAddress);

export default HomeAddressComponent