/**
 * Created by Kendall on 7/5/2017
 */
import React, {Component} from 'react';
import {graphql, compose } from 'react-apollo';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, TextInput, Keyboard, Alert, AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import TimeOffRequestDetails from './TimeOffRequestDetails'
import TopBar from "../SchedulingOptionsComponent/TopBar";
import moment from 'moment';
import Button from 'react-native-button';
import CheckBox from 'react-native-checkbox';
import CustomDatepicker from './CustomDatepickerComponent';
import { userTimeOffRequestQuery, submitTimeOffRequestMutation} from './TimeOffQueries'
import {BASE_API} from '../../constants';
//import {Tracker} from "../../constants/index";

const uuidv4 = require('uuid/v4');
let { width} = Dimensions.get('window');
let _constants = require('../../constants');

class TimeOffComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            text1:true,
            text2:false,
            firstDay: '',
            lastDay: '',
            claimVacation: true,
            vacationHours: '',
            personalHours: '',
            lumpSum: false,
            payDay: '',
            notes: '',
            bottomMargin:0,
            topMargin:0,
        };
        //Tracker.trackScreenView("Time Off");
        this.onText=this.onText.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }
       //Tracker.trackScreenView("Time Off");


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
        });
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
        return (value) => {
            // can't claim both types of hours
            if (name == 'vacationHours') {
                this.setState({personalHours: '0'});
            } else if (name == 'personalHours') {
                this.setState({vacationHours: '0'});
            }
            // default lastDay if setting firstDay
            if (name == 'firstDay' &&
                (!this.state.lastDay || moment(value).diff(moment(this.state.lastDay)) > 0)) {
                this.setState({'lastDay': value})
            }
            // main purpose: set the state
            this.setState({[name]: value})
        };
    }
    isValid(){
        let start = moment(this.state.firstDay, 'dddd, MMMM Do, YYYY');
        let end = moment(this.state.lastDay, 'dddd, MMMM Do, YYYY');
        return (
            this.state.firstDay != "" &&
            this.state.lastDay != "" &&
            end.diff(start, 'days') >= 0 &&
            start.diff(moment(), 'days') >= 0 &&
            end.diff(moment(), 'days') >= 0 &&
            (!this.state.claimVacation ||
             this.state.vacationHours != "" || this.state.personalHours != "") &&
            (this.state.payDay != "" || !this.state.lumpSum)
        );
    }
    async onSubmit() {
        //let corporationId = "3b14782b-c220-4927-b059-f4f22d01c230";
        corporationId = await AsyncStorage.getItem('corporationId');

        let data = { "data": {"clientMutationId": uuidv4(),
                "timeOffRequest": {
                    "startDate": moment(this.state.firstDay, 'dddd, MMMM Do, YYYY').format(),
                    "endDate": moment(this.state.lastDay, 'dddd, MMMM Do, YYYY').format(),
                    "submissionDate": moment().format(),
                    "minutesPaid": (parseInt(this.state.vacationHours) + parseInt(this.state.personalHours)) * 60,
                    "decisionStatus": "PENDING",
                    "requestType": this.state.personalHours > 0 ? 'PERSONAL' : 'VACATION',
                    "corporationId": corporationId,
                    "requestorId": this.props.userId,
                    "payDate": this.state.payDay == "" ? null :
                        moment(this.state.payDay, 'dddd, MMMM Do, YYYY').format(),
                    "notes": this.state.notes
                  }
                }
        };
        this.props.mutate({variables: data, refetchQueries:[{query: userTimeOffRequestQuery,
                variables: { requestorId: this.props.userId },}]})
            .then((res)=>{
                var timeOffId = res.data.createTimeOffRequest.timeOffRequest.id;
                const uri = `${BASE_API}/api/timeOffRequestEmail`;
                let token = AsyncStorage.getItem('token');
                fetch(uri, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                        timeOffRequestId: timeOffId
                    }),
                }).then(async (response) => {
                })
            })
            .catch((err)=> {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
            })
        this.onText("text1");
    }

    onText(text) {
        Keyboard.dismiss();
        if(text==="text1"){
            this.setState({text1: true,text2: false})
        }
        else {
            this.setState({text1: false,text2: true})
        }
    }

    static renderRightButton = (props) => {
          return (
              <TouchableOpacity onPress={() => Actions.TimeOffRequest({userId: props.userId })}>
                  <Image
                      resizeMode="contain"
                      style={{width: 30, height: 30, marginRight: 10}}
                      source={require('./../assets/profile-icons/plus-button.png')}
                  />
              </TouchableOpacity>
          );
    }
    isEmpty(obj) {
       for (var x in obj) { return false; }
       return true;
    }
    render() {
        let start = moment(this.state.firstDay, 'dddd, MMMM Do, YYYY');
        let end = moment(this.state.lastDay, 'dddd, MMMM Do, YYYY');

        if (this.props.data.error) {
            return <Text>Error! {this.props.data.error.message}</Text>;
        }
        if (this.props.data.loading) {
            return (<View style={styles.container}>
                        <Text> Loading... </Text>
                    </View>);
        }
        let data = this.props.data.allTimeOffRequests.edges;
        return (
            <View style={{flex:1, backgroundColor: '#fff', height: (_constants.isIphoneX() ? 70 : 44) }}>
              <TopBar label={["Time Off Requests","Enter New Request"]} onText={this.onText} labelColor={[this.state.text1,this.state.text2]}/>
              <View style={{flex: 1}}>
                  {this.state.text1 ?
                      <ScrollView contentContainerStyle={{marginTop: 10, paddingHorizontal: 5, paddingBottom: 10, alignItems: 'center'}}>
                          {this.isEmpty(data) &&
                          <View style={{width: '100%', alignItems: 'center', marginTop: '5%',backgroundColor:'#fff'}}>
                              <Image style={{width: 220, height: 220}}
                                     source={require('../assets/no_requests.png')}/>

                              <View style={{width:'100%',marginTop:40}}>
                                  <Text style={styles.emptyMessage}>You currently have no time off requests</Text>
                                  <Text style={[styles.emptyMessageInstruction,{width:'65%',alignSelf:'center',marginTop:20}]}>
                                      Press "Enter New Preference" above to enter a time off request.
                                  </Text>
                              </View>
                          </View>
                          }
                          {data.map((value,index)=>(
                              <TimeOffRequestDetails details={value.node} key={index} userId={this.props.userId}/>
                          ))}
                      </ScrollView>
                  :

                      <View style={{flex: 1}}>
                          <ScrollView

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
                                      Consecutive Days Off: {end.diff(start, 'days') + 1 || 0}
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
                                      <Text style={styles.infoText}>Pay Hours as Lump Sum?</Text>
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
                          </ScrollView>
                          <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center"}}>
                              <Button containerStyle={styles.submitButton}
                                      style={styles.buttonText}
                                      onPress={this.onSubmit}
                                      disabled={!this.isValid()}
                                      styleDisabled={{color: '#4f5a87'}}>
                                  Submit
                              </Button>
                          </View>
                      </View>
                  }
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 5,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    preferenceContainer: {
        width: "96%",
        marginTop: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: 'white',
    },
    preferenceTopContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingLeft: 15,
        borderBottomColor: '#C9C9C9',
    },
    preferenceName: {
        fontSize: 16,
        paddingHorizontal: 20,
        color: '#0022A1',
    },
    preferenceDescription: {
        fontSize: 12,
        paddingHorizontal: 20,
        color: '#4A4A4A',
    },
    emptyMessage: {
        marginTop: 10,
        opacity: 0.8,
        color: '#5a5a5a',
        fontFamily: 'Lato',
        fontSize: 19,
        fontWeight: 'bold',
        lineHeight: 19,
        textAlign: 'center',
    },
    emptyMessageInstruction: {
        marginTop: 10,
        opacity: 0.8,
        color: '#797979',
        fontFamily: 'Lato',
        fontSize: 18.5,
        lineHeight: 19,
        textAlign: 'center',
    },
    containers: {
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
        padding: 10,
        height: 50,
        width: '100%',
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

export default compose(
    graphql(userTimeOffRequestQuery,{
               options: (ownProps) => {
                   return {
                       variables: {
                           requestorId: ownProps.userId,
                       }
                   }
               }}),
    graphql(submitTimeOffRequestMutation)
)(TimeOffComponent);
