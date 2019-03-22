/**
 * Created by Kendall on 6/29/2017
 * TODO: OUT OF DATE, CODE COPIED INTO TIMEOFFCOMPONENT.JS
 */
import React, {Component} from 'react';
import {graphql } from 'react-apollo';
import moment from 'moment';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Keyboard,
    Alert,
    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import CustomDatepicker from './CustomDatepickerComponent';
import { userTimeOffRequestQuery, submitTimeOffRequestMutation} from './TimeOffQueries'
//import {Tracker} from "../../constants/index";

const uuidv4 = require('uuid/v4');

// CODE COPIED INTO TimeOffComponent.js, this NOT IN USE
class TimeOffRequestsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstDay: '',
            lastDay: '',
            claimVacation: true,
            vacationHours: '',
            personalHours: '',
            lumpSum: true,
            payDay: '',
            notes: '',
            bottomMargin:0,
            topMargin:0,
        };
        this.checkboxChange = this.checkboxChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
       //Tracker.trackScreenView("TimeOff Requests");

    }
    _keyboardDidShow = (e) => {
        const height=e.endCoordinates.height;
        this.setState({
            bottomMargin: -height,
            topMargin:-80,
        })
    }

    _keyboardDidHide =(e)=> {

        this.setState({
            bottomMargin: 0,
            topMargin:0,
    })
        this.scrollView.scrollToEnd();
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    checkboxChange(name) {
        this.setState({[name]: !this.state[name]});
        if (name == "claimVacation") {
            this.setState({vacationHours: '0',
                           personalHours: '0',});
            if(this.state.lumpSum){
                this.checkboxChange("lumpSum");
            }
        } else if (name == "lumpSum") {
            this.setState({payDay: ''})
        }
    }
    onChange(name) {
        return (value) => {if (name == "vacationHours") {
                               this.setState({personalHours: '0'});
                           } else if (name == 'personalHours') {
                               this.setState({vacationHours: '0'});
                           }
                           this.setState({[name]: value})};
    }
    isValid(){
        let start = moment(this.state.firstDay, 'dddd, MMMM Do, YYYY');
        let end = moment(this.state.lastDay, 'dddd, MMMM Do, YYYY');
        return (this.state.firstDay != "" &&
                this.state.lastDay != "" &&
                end.diff(start, 'days') >= 0 &&
                start.diff(moment(), 'days') >= 0 &&
                end.diff(moment(), 'days') >= 0 &&
                this.state.vacationHours != "" &&
                this.state.personalHours != "" &&
                (this.state.payDay != "" || !this.state.lumpSum))
    }
    onSubmit(){
        let data = {"data": {"clientMutationId": uuidv4(),
                     		 "timeOffRequest": {"id": uuidv4(),
                                 				"startDate": moment(this.state.firstDay, 'dddd, MMMM Do, YYYY').format(),
                               	     			"endDate": moment(this.state.lastDay, 'dddd, MMMM Do, YYYY').format(),
                                                "submissionDate": moment().format(),
                               	                "minutesPaid": (parseInt(this.state.vacationHours) + parseInt(this.state.personalHours)) * 60,
                               			        "decisionStatus": "PENDING",
                               			        "requestType": this.state.personalHours > 0 ? 'PERSONAL' : 'VACATION',
                                		        "corporationId": "3b14782b-c220-4927-b059-f4f22d01c230",
                               					"requestorId": this.props.userId,
                               					"payDate": this.state.payDay == "" ? null :
                               					           moment(this.state.payDay, 'dddd, MMMM Do, YYYY').format(),
                               					"notes": this.state.notes}}
                   };
        this.props.mutate({variables: data, refetchQueries:[{query: userTimeOffRequestQuery,
                                                             variables: { requestorId: this.props.userId },}]})
            .then((res)=>{
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "TimeOff Request");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "TimeOff Request");
                })
            })
            .catch((err)=>{
                    Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                })
        Actions.pop({}) //.TimeOff({userId: this.props.userId});
    }
    //,{marginBottom:Platform.OS === 'android' ? this.state.bottomMargin :0,marginTop:Platform.OS === 'android' ? this.state.topMargin :0}
    render() {
        let start = moment(this.state.firstDay, 'dddd, MMMM Do, YYYY');
        let end = moment(this.state.lastDay, 'dddd, MMMM Do, YYYY');
        return (
                <ScrollView
                    style={[styles.container]}
                    ref={ref => this.scrollView = ref}
                >
                  <Text style={styles.headerText}>
                      Time Off Duration
                  </Text>

                  <View style={styles.centerer}>
                    <Text style={styles.labelText}>
                        First Day
                    </Text>
                    <CustomDatepicker date={this.state.firstDay} onChange={this.onChange('firstDay')}/>
                  </View>

                  <View style={styles.centerer}>
                    <Text style={styles.labelText}>
                        Last Day
                    </Text>
                    <CustomDatepicker date={this.state.lastDay} onChange={this.onChange('lastDay')}/>
                  </View>

                  <View style={styles.centerer}>
                    <Text style={styles.descriptionText}>
                        Consecutive Days Off: {end.diff(start, 'days') + 1}
                    </Text>
                  </View>

                  <View style={styles.centerer}>
                    <Text style={styles.headerText}>
                        Time Off Compensation
                    </Text>

                    <View style={styles.checkboxRowContainer}>
                        <Text style={styles.infoText}>Claim Vacation, Personal Days?</Text>
                        <CheckBox
                            label=""
                            labelBefore={true}
                            checkboxStyle={styles.checkBox}
                            labelStyle={{display: 'none'}}
                            checkedImage={require('../assets/yesCheckbox.png')}
                            uncheckedImage={require('../assets/noCheckbox.png')}
                            checked={this.state.claimVacation}
                            onChange={(checked) => this.checkboxChange('claimVacation')}
                        />
                    </View>

                    <Text style={styles.labelText}>
                        Vacation Hours Claimed:
                    </Text>

                    <TextInput
                       style={styles.numInput}
                       keyboardType = 'numeric'
                       onChangeText = {this.onChange('vacationHours')}
                       editable = {this.state.claimVacation}
                       value = {this.state.vacationHours}
                       underlineColorAndroid='transparent'
                    />

                    <Text style={styles.labelText}>
                        Personal Hours Claimed:
                    </Text>

                    <TextInput
                       style={styles.numInput}
                       keyboardType = 'numeric'
                       onChangeText = {this.onChange('personalHours')}
                       editable = {this.state.claimVacation}
                       value = {this.state.personalHours}
                       underlineColorAndroid='transparent'
                     />

                     <Text style={styles.headerText}>
                         Lump Sum Payment
                     </Text>

                    <View style={styles.checkboxRowContainer}>
                        <Text style={styles.infoText}>Pay Claimed Hours as Lump Sum?</Text>
                        <CheckBox
                            label=""
                            labelBefore={true}
                            checkboxStyle={styles.checkBox}
                            labelStyle={{display: 'none'}}
                            checkedImage={require('../assets/yesCheckbox.png')}
                            uncheckedImage={require('../assets/noCheckbox.png')}
                            checked={this.state.lumpSum}
                            onChange={(checked) => this.checkboxChange('lumpSum')}
                        />
                    </View>
                   </View>

                  <View style={styles.centerer}>
                    <Text style={styles.labelText}>
                        Which Day for Lump Sum Payment?
                    </Text>
                    <CustomDatepicker date={this.state.payDay} onChange={this.onChange('payDay')} disabled={!this.state.lumpSum}/>
                  </View>

                  <View style={styles.centerer}>
                    <Text style={styles.headerText}>
                        Notes
                    </Text>

                    <TextInput
                       multiline={true}
                       style={styles.textInput}
                       onChangeText = {this.onChange('notes')}
                       value = {this.state.notes}
                       underlineColorAndroid='transparent'
                    />
                  </View>

                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginVertical: 25}}>
                        <Button containerStyle={styles.submitButton}
                                style={styles.buttonText}
                                onPress={this.onSubmit}
                                disabled={!this.isValid()}
                                styleDisabled={{color: '#4f5a87'}}>
                            Submit
                        </Button>
                     </View>

                </ScrollView>
        );
    }
}
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 2,
        backgroundColor: '#FAFAFA'
    },
    checkBox: {
        width: 49.5,
        height: 22
    },
    headerText: {
        fontSize: 22,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#0022A1',
        paddingRight: 5,
        fontWeight: '600',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: "center"
    },
    labelText: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#666666',
        textAlign: "center",
    },
    infoText: {
        fontSize: 17.5,
        paddingVertical: 10,
        color: '#172434',
    },
    descriptionText: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#8E9091',
    },
    textInput: {
        height: 90,
        width: width - 57,
        fontSize: 20,
        marginLeft: 7,
        marginRight: 25,
        marginVertical: 0,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginLeft:"5%",
        textAlign: "center",
        fontFamily: "Lato"
    },
    numInput: {
        height: 45,
        width: "90%",
        fontSize: 20,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginLeft:"5%",
        textAlign: "center"
    },
    checkboxName: {
        marginVertical: 5,
        color: '#172434'
    },
    checkboxRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: "wrap"
    },
    submitButton: {
        padding: 7,
        height: 40,
        width: 200,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#0022A1',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "Lato"
    },
    centerer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }
});

export default graphql(submitTimeOffRequestMutation)(TimeOffRequestsComponent);
