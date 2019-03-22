import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    Modal,
    TouchableOpacity,
    Linking,
    Platform,
    AsyncStorage,
    Alert
} from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {gql, graphql} from 'react-apollo';
import {compose} from 'react-apollo';
import SpinnerComponent from './../SpinnerComponent'
import {
    Icon,
    Button,
} from 'native-base';
import axios from 'axios';
import geolib from 'geolib';
let _constants = require('../../constants');
//import {Tracker} from "../../constants/index";
import {userTimeOffRequestQuery} from "../TimeOffComponent/TimeOffQueries";

let {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
            date: '',
            contact: {},
            marker: false,
            isLoading: false,
            totalPayment: 0.0,
            baseWage: 0.0,
            bonusWage: 0.0,
            totalWage: 0.0,
            status: '',
            region: null,
            placeId: null,
            showClockInModal: false,
            showClockOutModal: false,
            clockInDate: null,
            clockInTime: false,
            clockInLocation: null,
            clockInVerified: false,
            clockOutDate: null,
            clockOutTime: false,
            clockOutLocation: null,
            clockOutVerified: false,
        };
        //Tracker.trackScreenView("Shift Details");
    }

    /**
     * [getOvertimeBonusWage description]
     * @param  { integer }  currentWeekHours  the number of hours that the employee is working this week
     * @param  { integer }  hoursWorkingToday the number of hours that the employee is working today, assuming midnight to midnight working day
     * @param  { integer }  thisShiftsHours the number of contiguous hours for the shift in question notwithstanding breaks
     * @param  { integer }  sumDailyOT the number of hours the employee has worked overtime due to overtime triggered by working more than 8 hours on the given day
     * @param  { integer } isPyramiding  whether the payment for the shift considers pyramiding
     * @return {[type]} returns the bonus wage that accounts for the proportion of shift that is overtime
     * @author Rahkeem
     */
    getOvertimeBonusWage = (currentWeekHours, hoursWorkingToday, thisShiftsHours, sumDailyOT, isPyramiding) => {
        return 9.0;
        const overtimeWage = baseWage * 1.5;
        // overtime hours in this shift from > 8 hours in a day.
        const dailyOvertimeHours = Math.min(thisShiftHours, thisShiftHours + hoursWorkingToday - 8);
        // overtime hours from > 40 hours in a week.
        const weeklyOvertimeHours = currentWeekHours - 40;
        if (currentWeekHours > 40 && !isPyramiding) {

        }
        if (hoursWorkingToday > 8) {

        }
    }

    componentWillMount() {
        const data = this.props.shiftDetails || {};
        let {address, zipCode, locationCoor} = this.props;

        if (address) {
            address = JSON.parse(address)
            address = address["address_line1"] + " " + address["address_line2"] + " " + address["city"] + ", " + address["state"] + " " + zipCode
        }

        //this.getWorkingDays()

        // TODO: what is the point of all this code? - why is base wage always 0?
        //data.marketsByShiftId.edges[0].node.userByWorkerId.employeesByUserId.nodes[0].wage ||
        let baseWage = 0.0;
        const breakTime = data.unpaidBreakTime;
        const timeH = breakTime ? breakTime.split(':')[0] : 0
        const timeM = breakTime ? breakTime.split(':')[1] : 0
        const timeS = breakTime ? breakTime.split(':')[2] : 0
        var end = data && data.endTime || this.props.end
        const endTime = moment(end).subtract({hours: timeH, minutes: timeM, seconds: timeS}).format();
        var start = data && data.startTime || this.props.start
        const startTime = moment(start);
        //const endTime = moment(data.endTime);
        //const totalShiftHours = endTime.diff(startTime, 'hours', true);
        console.log(this.props)
        const totalShiftHours = moment(moment(endTime).diff(moment(startTime), 'hours', true))//.subtract
        const totalShiftMinutes = moment(moment(endTime).diff(moment(startTime), 'minutes', true))//.subtract
        console.log(endTime)
        console.log(startTime)
        // bonus wage is caused by shift's bonus plus overtime bonus
        var wage = (this.props.shiftDetails && this.props.shiftDetails.wage) || this.props.wage
        console.log('WHAT IS WAGE', wage);
        baseWage = wage * totalShiftMinutes / 60;
        const bonusWage = this.props.payment - baseWage
        console.log("what is bonusWage", bonusWage);
        console.log("what is payment", this.props.payment);
        /*let workingHours = this.getWorkingDays();
        
        let bonusWage = 0.0;
        if(parseInt(workingHours) > 40) {
            let overtime = workingHours - 40;
            bonusWage = overtime * (baseWage/2);
        } else if(totalShiftHours.hours() > 8) {
            let overtime = totalShiftHours.hours() - 8;
            bonusWage = overtime * (baseWage/2);
        } */

        // full parameters: (currentWeekHours, hoursWorkingToday, thisShiftsHours, sumDailyOT, isPyramiding)
        const totalWage = baseWage + bonusWage;
        const totalPayment = this.props.payment || 0.0;//totalShiftHours * (totalWage);
        // alert(this.props.payment)
        axios.get("https://maps.google.com/maps/api/geocode/json", {
            params: {
                /* Temporary key enabled with 'Google Maps Geocoding API' */
                key: 'AIzaSyAVUAkx-negP8M3omIrzULbDC8QJInqE6c',
                address: address,
            }
        })
            .then(response => {

                let location = response.data.results[0].geometry.location;
                const placeId = response.data.results[0].place_id;
                if (locationCoor) {
                    location = JSON.parse(locationCoor);
                }
                let region = {
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.06 * ASPECT_RATIO,
                };
                this.setState({region, placeId, address})
            })
            .catch(err => {
                console.log('Error: ', err);
                //alert('Unable to load workplace Location data...!!');
            });
        this.setState({
            totalPayment,
            baseWage,
            bonusWage,
            startTime,
            countdownText: this.props.countdownText,
            endTime: (data && data.endTime)|| this.props.end,
            totalWage,
            status: this.props.status,
            clockOutDate: this.props.clockOutDate,
            clockInDate: this.props.clockInDate,
            tentative: this.props.tentative
        })
    }


    getday = (day) => {
        switch(day){
            case 0:
                return 2;
            case 1:
                return 3;
            case 2:
                return 4;
            case 3:
                return 5;
            case 4:
                return 6;
            case 5:
                return 7;
            case 6:
                return 1;

            default:
                return null;
        }
    };

    /* 
    getWorkingDays(){
        let date = new Date(this.props.shiftDetails.endTime);
        let WorkingDays = [];
        let hours = 0;
        let day = this.getday(new Date(this.props.shiftDetails.endTime).getDay());
        for(i=1;i<=day;i++){
            WorkingDays.push(new Date(date.setDate(date.getDate() - 1)));
        }

        for(i=0;i<WorkingDays.length;i++){
            let data = _.find(this.props.alldata, {date: moment(WorkingDays[i]).format('YYYY-MM-DD')});
            if (data && data.data && data.data[0] && data.data[0] && data.data[0].date && moment(data.data[0].date[0].workingHours)) {
                hours += parseInt(moment(data.data[0].date[0].workingHours).format('HH'))
            }
            //hourlyWage
        }
        return hours
    }*/

    renderShiftInfoBar(data) {
        const renderData = (mainText, period, bottomText) => (
            <View style={[styles.displayInCenterColumn, {flex: 1, justifyContent: 'flex-end'}]}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.timeText}>{mainText}</Text>
                    <Text style={styles.timePeriod}>{period.toUpperCase()}</Text>
                </View>
                <Text style={styles.statusStyle}>{bottomText.toUpperCase()}</Text>
            </View>
        );
        let iconColor = '#222';
        let text = this.state.status;
        const renderIcon = () => {
            if (text === 'BOOKED') {
                iconColor = '#00A863';
                return <Image style={{backgroundColor: 'transparent', height: 25, width: 25, marginBottom: 4}}
                              source={require('../assets/icons/booked.png')}/>
            } else if (text === 'INVITED') {
                iconColor = '#FFAD33';
                return <Image style={{backgroundColor: 'transparent', height: 25, width: 25, marginBottom: 4}}
                              source={require('../assets/icons/pending.png')}/>
            } else if (text === 'PENDING') {
                iconColor = '#FFAD33';
                return <Image style={{backgroundColor: 'transparent', height: 25, width: 25, marginBottom: 4}}
                              source={require('../assets/icons/pending.png')}/>
            } else if (text === 'OPEN') {
                iconColor = '#222';
                return <Icon name='radio-button-off'
                             style={{backgroundColor: 'transparent', fontSize: 30, color: '#222'}}/>
            }
        };

        if (this.state.tentative){
            text = 'Tentative'
        }

        const start = moment(this.state.startTime);
        const end = moment(this.state.endTime);
        const payment = this.state.totalPayment || "0.0";
        // alert(payment)
        let pattern = /([0-9])+d ([0-9])+h$/;
        let match = this.state.countdownText ? this.state.countdownText.match(pattern) : null;
        const countdown = match ? match[0] : "";
        return (
            <View style={styles.infoBarContainer}>
                <View style={[styles.displayInCenterColumn, {paddingTop: 5, flex: 0.7}]}>
                    {renderIcon()}
                    <Text style={{backgroundColor: 'transparent', fontSize: 10, fontWeight: 'bold', color: iconColor}}>
                        {text}
                    </Text>
                </View>
                {renderData(start.format("h:mm"), start.format("a"), 'Start time')}
                {renderData(end.format("h:mm"), end.format("a"), 'end time')}
                {(this.state.status == 'BOOKED' || this.state.status == 'PAST') ?
                    /* { data.bookedByAutoAssign || data.bookedByPhoneTree ? <Text> 'Won by Award' </Text> : " " } */
                    renderData('$' + payment.toString().split('.')[0], "." + payment.toString().split('.')[1], 'payment') :
                    // Display "First Come First Served" if bidding period is over
                    ((countdown == "" || countdown == "0d 0h") ?
                        <View style={[styles.displayInCenterColumn, {flex: 1, justifyContent: 'flex-end'}]}>
                            <Text style={styles.smallTextStyle}> 'Instant Pickup' </Text>
                        </View>
                        : renderData(countdown, "", 'Requests Due'))}
            </View>
        )
    }

    renderButton() {
        let {status} = this.state;
        var startTime = this.state.startTime || this.props.start
        let start = moment(startTime);
        var endTime = this.props.shiftDetails.endTime|| this.props.end
        let end = moment(endTime);
        let CurrentDate = moment();

        let duration = moment.duration(start.diff(CurrentDate));
        let endDuration = moment.duration(end.diff(CurrentDate));

        let hours = duration.asHours();
        let endhours = endDuration.asHours();
        let btnText;

        let btnColor = 'rgb(225, 45, 35)';
        if (status === 'BOOKED' || status === 'PENDING') {
            btnText = 'DECLINE SHIFT'
        }

        let clockInDate = this.props.clockInDate || this.state.clockInDate
        let clockOutDate = this.props.clockOutDate || this.state.clockOutDate
        let clockedInAndClockedOut = false
        if (status === 'BOOKED') {
            if ((CurrentDate.isAfter(start) && CurrentDate.isBefore(end)) || hours <= 1) {
                btnText = 'CLOCK IN'
                btnColor = 'rgb(25, 170, 100)'
            }
            if ((clockInDate) && (!clockOutDate)) {
                btnText = "CLOCK OUT"
                btnColor = 'rgb(225, 45, 35)'
            } else if (clockInDate && clockOutDate) {
                clockedInAndClockedOut = true
            }
        }

        if (clockedInAndClockedOut || (endhours <= -3 && status === 'PAST') || (!clockInDate && status === 'PAST')) {
            return (
                <View>
                    <View style={[styles.displayInCenterRow, {
                        padding: 10,
                        borderTopWidth: 1,
                        borderTopColor: 'lightgray',
                    }]}>
                        <Text style={[styles.textStyle, {color: '#888', marginHorizontal: 20, marginVertical: 5}]}>
                            {this.state.status === 'PAST' && "This shift has past. "}
                            {clockedInAndClockedOut && "You clocked in and out."}
                        </Text>
                    </View>
                </View>)
        } else if (status == "OPEN") {
            // for open shifts, allow a request or decline
            var flagSameDay = false;
            {this.props.userTimeOffRequest && this.props.userTimeOffRequest.allTimeOffRequests && this.props.userTimeOffRequest.allTimeOffRequests.edges.map((data) => {
                if (moment(this.props.shiftDetails.startTime).format('YYYY/MM/DD') == moment(data.node.startDate).format('YYYY/MM/DD'))
                    flagSameDay=true;
                })
            }
            return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                        full={true}
                        large={_constants.isIphoneX()}
                        onPress={() => {
                            this.cancelShift()
                        }}
                        style={{
                            width: '50%',
                            backgroundColor: 'rgb(225, 45, 35)'
                        }}>
                        <Text style={[styles.titleText, {color: '#FFF', fontSize: 20}]}>DECLINE SHIFT</Text>
                    </Button>
                    <Button
                        full={true}
                        large={_constants.isIphoneX()}
                        onPress={() => {
                                    flagSameDay
                                        ?
                                    Alert.alert(
                                    '',
                                    'You have submitted a time off request for this day',
                                    [
                                        {text: 'Cancel', style: 'cancel'},
                                        {text: 'Request Anyway', onPress: () => this.bookShift()},
                                    ],
                                    { cancelable: true }
                                    )
                                        :
                                    this.bookShift()
                            }
                        }
                        style={{
                            width: '50%',
                            backgroundColor: 'rgb(25, 170, 100)'
                        }}>
                        <Text style={[styles.titleText, {color: '#FFF', fontSize: 20}]}>REQUEST SHIFT</Text>
                    </Button>
                </View>
            )
        } else if (status === 'PENDING') {
            // for pending shifts, allow user to withdraw request, or decline directly
            return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                        full={true}
                        large={_constants.isIphoneX()}
                        onPress={() => {
                            // pass boolean to withdraw, rather than decline the shift
                            this.cancelShift(true)
                        }}
                        style={{
                            width: '50%',
                            backgroundColor: 'rgb(25, 170, 100)'
                        }}>
                        <Text style={[styles.titleText, {color: '#FFF', fontSize: 20}]}>WITHDRAW</Text>
                    </Button>
                    <Button
                        full={true}
                        large={_constants.isIphoneX()}
                        onPress={() => {
                            this.cancelShift()
                        }}
                        style={{
                            width: '50%',
                            backgroundColor: 'rgb(225, 45, 35)'
                        }}>
                        <Text style={[styles.titleText, {color: '#FFF', fontSize: 20}]}>DECLINE SHIFT</Text>
                    </Button>
                </View>
            )
        } else {
            // this case is not being used right now, I believe
            return (
                <View>
                    <View style={styles.displayInCenterRow}>
                        <Button full={true}
                                large={_constants.isIphoneX()}
                                onPress={() => {
                                    if (btnText === 'DECLINE SHIFT') {
                                        this.cancelShift()
                                    }
                                    else if (btnText === 'CLOCK IN') {
                                        this.setState({clockInShift: true});
                                        this.clockInShift()
                                    }
                                    else if (btnText === 'BOOK SHIFT' || btnText === 'BID FOR SHIFT') {
                                        this.bookShift()
                                    }
                                    else if (btnText === 'CLOCK OUT') {
                                        this.clockOutShift()
                                    }

                                }}
                                style={{
                                    borderRadius: 2,
                                    width: '100%',
                                    backgroundColor: btnColor,
                                }}>
                            <Text style={[styles.titleText, {color: '#FFF', fontSize: 20}]}>{btnText}</Text>
                        </Button>
                    </View>
                    {/*isBooked &&
                             <Text style={[styles.textStyle, { color: '#888', marginHorizontal:20, marginVertical:5}]}>
                                 If you cancel this shift, then you will be unable to book any other shifts at the same time.
                             </Text>
                             */}
                </View>
            )
        }
    }

    renderDate() {
        const {baseWage, bonusWage, totalPayment, startTime, totalWage} = this.state;
        const totalEarning = totalPayment || 0.0;
        return (
            <View>
                <View style={[styles.displayInCenterRow, {marginTop: 10, marginLeft: 15}]}>
                    <Text style={styles.titleText}>Shift Date:</Text>
                    <Text style={[styles.titleText, {
                        color: 'rgba(0,0,0,0.6)',
                        fontWeight: '400'
                    }]}> {moment(startTime).format("MMMM Do")}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                    <View style={[styles.displayInCenterColumn, {flex: 0.5}]}>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={[styles.timeText, {fontWeight: 'bold'}]}>${totalEarning.toString().split('.')[0]}</Text>
                            <Text
                                style={[styles.timePeriod, {fontWeight: 'bold'}]}>.{totalEarning.toString().split('.')[1]}</Text>
                        </View>
                        <Text style={[styles.statusStyle, {color: 'rgba(0, 0, 0, 0.4)'}]}>{'TOTAL\nEARNINGS'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 0.37, justifyContent: 'space-between'}}>
                            <Text style={styles.wageTitleText}>Base Wage</Text>
                            <Text style={styles.wageTitleText}>Bonus Wage</Text>
                            <Text style={styles.wageTitleText}>Total Wage</Text>
                        </View>
                        <View style={{flex: 0.37 , justifyContent: 'space-between', marginBottom: 4}}>
                            <Text style={styles.wageText}>{`$${baseWage.toFixed(2)}`}</Text>
                            <Text style={styles.wageText}>{`$${bonusWage.toFixed(2)}`}</Text>
                            <Text style={styles.wageText}>{`$${totalWage.toFixed(2)}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderInstruction(instructions) {
        const instructions_new = instructions || 'No Instructions Available.';
        return (
            <View>
                <Text style={[styles.titleText, {marginTop: 10, width: '100%', textAlign: 'center'}]}>Shift
                    Instructions</Text>
                <Text style={[styles.textStyle, {
                    marginTop: 5,
                    marginHorizontal: 35,
                    marginBottom: 18
                }]}>{instructions_new}</Text>
            </View>
        )
    }

    renderAwardOrder() {
        return (
            <View>
                <Text style={[styles.titleText, {marginTop:10, width: '100%', textAlign: 'center'}]}>Award Order</Text>
                <Text style={[styles.textStyle, {marginTop:5, marginHorizontal:35, marginBottom:18}]}>
                    The award order is the order in which team members will be assigned to the shift
                </Text>
                <View style={styles.displayInCenterRow}>
                    <Button style={{
                        borderRadius: 2,
                        width: '55%',
                        shadowOffset: {height: 2, width: 2},
                        shadowOpacity: 0.4,
                        backgroundColor: '#FFF',
                        marginTop: 5,
                        marginBottom: 10
                    }}
                            onPress={() => {Actions.awardOrder({
                                shiftId: this.props.shiftDetails.shiftId,
                                status: this.props.status
                            })}}
                            full={true}>
                        <Text style={[styles.titleText, {fontWeight: '600'}]}>VIEW AWARD ORDER</Text>
                    </Button>
                </View>
            </View>
        )
    }

    onMapBtnPress() {
        if (this.state.region) {
            let url;
            const workPlace = this.props.shiftDetails.workplaceName || 'Work Place Location';
            const latitude = this.state.region.latitude, longitude = this.state.region.longitude;
            if (Platform.OS === 'ios') {
                url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            } else {
                url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                if (this.state.placeId) {
                    url += `&query_place_id=${this.state.placeId}`;
                }
            }
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    alert('Don\'t know, some error has occurred');
                }
            }).catch(err => console.error('An error occurred', err));
        } else {
            alert('Location not available...');
        }
    }

    clockInShift = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let clock_in_location = position.coords;
                const result = this.state.region ? geolib.isPointInCircle(
                    {latitude: this.state.region.latitude, longitude: this.state.region.longitude},
                    {latitude: position.coords.latitude, longitude: position.coords.longitude},
                    500
                ) : false;

                let start = moment(this.state.startTime);
                let CurrentDate = moment();

                //when clicking "clock in", clock in time verified should only have check mark
                // if the current time is before or equal to the start of the shift

                if (CurrentDate.isSameOrBefore(start)) {
                    this.setState({
                        isLoading: true, showClockInModal: true,
                        clockInLocation: clock_in_location, clockInVerified: result, clockInTime: true
                    });
                }
                else {
                    this.setState({
                        isLoading: true, showClockInModal: true,
                        clockInLocation: clock_in_location, clockInVerified: result, clockInTime: false
                    });
                }
            },
            (error) => {
                this.setState({error: error.message})
                alert('you must enable location services to clock-in')
            },
            {enableHighAccuracy: false, timeout: 200000000, maximumAge: 10000000},
        );
    };


    clockOutShift = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let clock_out_location = position.coords;
                const result = this.state.region ? geolib.isPointInCircle(
                    {latitude: this.state.region.latitude, longitude: this.state.region.longitude},
                    {latitude: position.coords.latitude, longitude: position.coords.longitude},
                    500
                ) : false;

                let end = moment(this.props.shiftDetails.endTime);
                let CurrentDate = moment();

                // when clicking "clock out", clock out time verified should only have a check mark
                // if the current time is after or equal to the end of the shift

                if (CurrentDate.isSameOrAfter(end)) {
                    this.setState({
                        isLoading: true, showClockOutModal: true,
                        clockOutLocation: clock_out_location, clockOutVerified: result, clockOutTime: true
                    });
                }
                else {
                    this.setState({
                        isLoading: true, showClockOutModal: true,
                        clockOutLocation: clock_out_location, clockOutVerified: result, clockOutTime: false
                    });
                }
            },
            (error) => {
                this.setState({error: error.message})
                alert('you must enable location services to clock-out')
            },
            {enableHighAccuracy: false, timeout: 200000000, maximumAge: 10000000},
        );
    };


    clockInMutation = () => {
        let CurrentDate = moment();
        let d = moment(CurrentDate).format("DD MMM YYYY hh:mm a");
        this.setState({clockInDate: d});
        this.setState({isLoading: false, showClockInModal: false});
        const market = {
            clockInLocation: JSON.stringify(this.state.clockInLocation),
            clockInDate: d,
            clockInVerified: this.state.clockInVerified
        };
        this.props.updateShiftUser({
            variables: {
                id: this.props.marketId,
                market: market
            }
        })
            .then(() => {
                AsyncStorage.getItem('email').then((value) => {
                    Tracker.trackEvent(value, "Clocked In");
                }).catch((err) => {
                    Tracker.trackEvent("Not Define", "Clocked In");
                })

            }).catch(err => {
            this.setState({isLoading: false, error: 'Error Occurred, Check your internet connection'});
            //Actions.pop();
        });
    };


    clockOutMutation = () => {
        let CurrentDate = moment();
        let d = moment(CurrentDate).format("DD MMM YYYY hh:mm a");
        this.setState({clockOutDate: d});
        this.setState({isLoading: false, showClockOutModal: false});
        const market = {
            clockOutLocation: JSON.stringify(this.state.clockOutLocation),
            clockOutDate: d, clockOutVerified: this.state.clockOutVerified
        };
        this.props.updateShiftUser({
            variables: {
                id: this.props.marketId,
                market: market
            }
        }).then(() => {
            AsyncStorage.getItem('email').then((value) => {
                Tracker.trackEvent(value, "Clocked Out");
            }).catch((err) => {
                Tracker.trackEvent("Not Define", "Clocked Out");
            })
        }).catch(err => {
            this.setState({isLoading: false, error: 'Error Occurred, Check your internet connection'});
            //Actions.pop();
        });
    };


    cancelShift = (withdraw = false) => {
        const startTime = moment(this.state.startTime);
        const currentTime = moment();
        const daysDifference = startTime.diff(currentTime, 'days', true);
        if (daysDifference < 0) {
            alert('Can\'t cancel the shift. Shift has already started.');
        } else if (this.state.status === 'PENDING' || this.state.status === 'OPEN') {
            AsyncStorage.getItem('email').then((value) => {
                //Tracker.trackEvent(value, "Removed Bid From Shift");
            }).catch((err) => {
                //Tracker.trackEvent("Not Define", "Removed Bid From Shift");
            })
            this.props.declineShift(withdraw);
        }
        else { //if(daysDifference < 1)
            this.props.openModal();
        }
    };


    bookShift() {
        this.props.acceptShift();
        /*let arr = this.props.arrayShift;
                let f = 0;

                for(let i = 0; i < arr.length; i++){
                    if(arr[i].status === 'BOOKED'){
                        let startMatch = moment(this.props.shiftDetails.startTime).isBetween(moment(arr[i].start) , moment(arr[i].end));
                        let endMatch = moment(this.props.shiftDetails.endTime).isBetween(moment(arr[i].start) , moment(arr[i].end));

                        let startMatch1 = moment(arr[i].start).isBetween(moment(this.props.shiftDetails.startTime) , moment(this.props.shiftDetails.endTime));
                        let endMatch1 = moment(arr[i].end).isBetween(moment(this.props.shiftDetails.startTime) , moment(this.props.shiftDetails.endTime));

                        if((startMatch || startMatch1) && (endMatch || endMatch1)){
                            f = 1;
                            break
                        }
                        else{
                            f = 0
                        }
                    }
                }
                if(f === 0){
                    AsyncStorage.getItem('email').then((value)=>{
                       //Tracker.trackEvent(value, "Bid For Shift");
                    }).catch((err)=>{
                       //Tracker.trackEvent("Not Define", "Bid For Shift");
                    })
                    this.props.acceptShift();
                }
                else{
                    alert('This shift conflicts with your current shift');
                }*/
    }


    render() {
        let flagSameDay=false;
        const coordinates = [];
        coordinates.push({
            key: 0,
            location: {
                longitude: this.state.region ? this.state.region.longitude : -70.23,
                latitude: this.state.region ? this.state.region.latitude : -33.23
            }
        });
        for (let i = 1; i < 100; i++) {
            const location = {
                longitude: coordinates[i - 1].location.longitude + (Math.random() * (i % 2 === 0 ? -1 : 1)),
                latitude: coordinates[i - 1].location.latitude + (Math.random() * (i % 2 === 0 ? -1 : 1)),
            };
            coordinates.push({key: i, location});
        }

        const data = this.props.shiftDetails || {};
        const address = this.state.address ? this.state.address : ['No Address Available'];

        const phoneNumber = data.workplacePhoneNumber;
        const formattedPhone = phoneNumber
            ? `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
            : 'Phone number unavailable';
        return (
            <View style={{flex: 1, backgroundColor: '#EEE'}}>
                <Modal
                    transparent={true}
                    visible={this.state.showClockInModal}
                    onRequestClose={this.state.showClockInModal}
                    animate="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity style={{marginTop: 20, flex: 1}} onPress={() => {
                                this.setState({showClockInModal: false})
                            }}>
                                <Image resizeMode="contain"
                                       style={{width: 20, height: 20}}
                                       source={require('../assets/Icons_Exit.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filterSubtitleContainer}>
                            <View style={{flexDirection: 'row'}}>
                                {!this.state.clockInVerified ? <Image resizeMode="contain"
                                                                      style={{
                                                                          opacity: 0.8,
                                                                          marginTop: 10,
                                                                          marginLeft: 10,
                                                                          width: 15,
                                                                          height: 15,
                                                                          tintColor: 'red'
                                                                      }}
                                                                      source={require('../assets/Icons_Exit.png')}/>
                                    : <Image resizeMode="contain"
                                             style={{
                                                 opacity: 0.8,
                                                 marginTop: 10,
                                                 marginLeft: 10,
                                                 width: 15,
                                                 height: 15,
                                                 tintColor: 'rgb(25, 170, 100)'
                                             }}
                                             source={require('../assets/verification-checkmark-symbol.png')}/>
                                }
                                <Text style={styles.filterSubtitle}>
                                    Phone GPS Verified
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {!this.state.clockInTime ? <Image resizeMode="contain"
                                                                  style={{
                                                                      opacity: 0.8,
                                                                      marginTop: 10,
                                                                      marginLeft: 10,
                                                                      width: 15,
                                                                      height: 15,
                                                                      tintColor: 'red'
                                                                  }}
                                                                  source={require('../assets/Icons_Exit.png')}/>
                                    : <Image resizeMode="contain"
                                             style={{
                                                 opacity: 0.8,
                                                 marginTop: 10,
                                                 marginLeft: 10,
                                                 width: 15,
                                                 height: 15,
                                                 tintColor: 'rgb(25, 170, 100)'
                                             }}
                                             source={require('../assets/verification-checkmark-symbol.png')}/>
                                }
                                <Text style={styles.filterSubtitle}>
                                    Clock In Time Verified
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{backgroundColor: 'rgb(0,164,99)', padding: 8, margin: 10, borderRadius: 6}}
                                onPress={() => this.clockInMutation()}>
                                <Text style={{alignSelf: 'center', color: 'white'}}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>


                <Modal
                    transparent={true}
                    visible={this.state.showClockOutModal}
                    onRequestClose={this.state.showClockOutModal}
                    animate="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity style={{marginTop: 20, flex: 1}} onPress={() => {
                                this.setState({showClockOutModal: false})
                            }}>
                                <Image resizeMode="contain"
                                       style={{width: 20, height: 20}}
                                       source={require('../assets/Icons_Exit.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filterSubtitleContainer}>
                            <View style={{flexDirection: 'row'}}>
                                {!this.state.clockOutVerified ? <Image resizeMode="contain"
                                                                       style={{
                                                                           opacity: 0.8,
                                                                           marginTop: 10,
                                                                           marginLeft: 10,
                                                                           width: 15,
                                                                           height: 15,
                                                                           tintColor: 'red'
                                                                       }}
                                                                       source={require('../assets/Icons_Exit.png')}/>
                                    : <Image resizeMode="contain"
                                             style={{
                                                 opacity: 0.8,
                                                 marginTop: 10,
                                                 marginLeft: 10,
                                                 width: 15,
                                                 height: 15,
                                                 tintColor: 'rgb(25, 170, 100)'
                                             }}
                                             source={require('../assets/verification-checkmark-symbol.png')}/>
                                }
                                <Text style={styles.filterSubtitle}>
                                    Phone GPS Verified
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {!this.state.clockOutTime ? <Image resizeMode="contain"
                                                                   style={{
                                                                       opacity: 0.8,
                                                                       marginTop: 10,
                                                                       marginLeft: 10,
                                                                       width: 15,
                                                                       height: 15,
                                                                       tintColor: 'red'
                                                                   }}
                                                                   source={require('../assets/Icons_Exit.png')}/>
                                    : <Image resizeMode="contain"
                                             style={{
                                                 opacity: 0.8,
                                                 marginTop: 10,
                                                 marginLeft: 10,
                                                 width: 15,
                                                 height: 15,
                                                 tintColor: 'rgb(25, 170, 100)'
                                             }}
                                             source={require('../assets/verification-checkmark-symbol.png')}/>
                                }
                                <Text style={styles.filterSubtitle}>
                                    Clock Out Time Verified
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{backgroundColor: 'rgb(0,164,99)', padding: 8, margin: 10, borderRadius: 6}}
                                onPress={() => this.clockOutMutation()}>
                                <Text style={{alignSelf: 'center', color: 'white'}}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>


                {this.props.isLoading &&
                <View style={styles.spinner}>
                    <SpinnerComponent/>
                </View>
                }
                <ScrollView>
                    {this.renderShiftInfoBar(data)}
                    <View style={styles.lineStyle}/>
                    {this.renderDate()}
                    {/* <View style={styles.lineStyle}/>
                    {!this.state.tentative && this.renderAwardOrder()}
                    */}
                    <View style={styles.lineStyle}/> 
                    {this.renderInstruction(data.instructions)}
                    <View style={styles.lineStyle}/>
                    <View style={styles.mapContainer}>
                        <Text style={styles.titleText}>Contact</Text>
                        <Text style={styles.textStyle}>
                            {address + "\n"}
                            {formattedPhone}
                        </Text>
                    </View>

                    {this.state.region ?
                        <View style={styles.mapViewContainer}>
                            <View style={styles.mapView}>
                                <MapView
                                    customMapStyle={styles.map}
                                    renderMarker={renderMarker}
                                    initialRegion={{
                                        longitude: this.state.region ? this.state.region.longitude : -70.23,
                                        latitude: this.state.region ? this.state.region.latitude : -33.23,
                                        latitudeDelta: this.state.region ? this.state.region.latitudeDelta : 9.22,
                                        longitudeDelta: this.state.region ? this.state.region.longitudeDelta : 4.21,
                                    }}
                                    style={StyleSheet.absoluteFillObject}>
                                </MapView>
                            </View>
                        </View>
                        :
                        <View style={{
                            height: 125, width: '85%',
                            backgroundColor: '#FFF',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 25,
                        }}>
                            <Text style={{fontSize: 20, color: '#888'}}>
                                Location not available
                            </Text>
                        </View>
                    }

                    <View>

                        <View style={styles.displayInCenterRow}>
                            <Button style={{
                                borderRadius: 2,
                                width: '55%',
                                shadowOffset: {height: 2, width: 2},
                                shadowOpacity: 0.4,
                                backgroundColor: '#FFF',
                                marginTop: 20,
                                marginBottom: 20
                            }}
                                    onPress={() => this.onMapBtnPress()}
                                    full={true}
                                    large={_constants.isIphoneX()}>
                                <Text style={[styles.titleText, {fontWeight: '600'}]}>MAP LOCATION</Text>
                            </Button>
                        </View>
                    </View>

                </ScrollView>
                {this.state.tentative ?
                    <View style={{height:_constants.isIphoneX() ? 65 : 40,justifyContent:'center',alignItems:'center'}}>
                        <View style={[styles.displayInCenterRow, {
                            padding: 10,
                            borderTopWidth: 1,
                            borderTopColor: 'lightgray',
                            flex:1,
                            width:'100%'
                        }]}>
                            <Text style={[styles.textStyle, {color: '#888', marginHorizontal: 20, marginVertical: 5}]}>
                                Shift Is Tentative
                            </Text>
                        </View>
                    </View>
                    :
                    (this.props.fromDecline)?
                        (this.state.startTime && this.state.startTime.isAfter(moment()) ?
                        <View style={{height:_constants.isIphoneX() ? 65 : 40,justifyContent:'center',alignItems:'center'}}>
                            {this.props.userTimeOffRequest && this.props.userTimeOffRequest.allTimeOffRequests && this.props.userTimeOffRequest.allTimeOffRequests.edges.map((data) => {
                                if (moment(this.props.shiftDetails.startTime).format('YYYY/MM/DD') == moment(data.node.startDate).format('YYYY/MM/DD'))
                                    flagSameDay=true;
                                })
                            }
                            <View style={[styles.displayInCenterRow,{flex:1,
                                width:'100%'}]}>
                                <Button full={true} large={_constants.isIphoneX()} onPress={() =>
                                    flagSameDay
                                        ?
                                    Alert.alert(
                                    '',
                                    'You have submitted a time off request for this day',
                                    [
                                        {text: 'Cancel', style: 'cancel'},
                                        {text: 'Request Anyway', onPress: () => this.bookShift()},
                                    ],
                                    { cancelable: true }
                                    )
                                        :
                                    this.bookShift()
                                }
                                        style={{borderRadius: 2, width: '100%', backgroundColor: '#00A863'}}>
                                    <Text style={[styles.titleText, {color: '#FFF', fontSize: _constants.isIphoneX() ? 25 : 20}]}>REQUEST SHIFT</Text>
                                </Button>
                            </View>
                        </View>
                        :

                        <View style={{height:_constants.isIphoneX() ? 65 : 40,justifyContent:'center',alignItems:'center'}}>
                            <View style={[styles.displayInCenterRow, {
                                padding: 10,
                                borderTopWidth: 1,
                                borderTopColor: 'lightgray',
                                flex:1,
                                width:'100%'
                            }]}>
                                <Text style={[styles.textStyle, {color: '#888', marginHorizontal: 20, marginVertical: 5}]}>
                                {"This shift has past. "}
                            </Text>
                            </View>
                        </View>)
                    :
                    this.renderButton()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    displayInCenterRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    displayInCenterColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.8)',
        fontSize: 25,
        fontFamily: 'RobotoCondensed-Regular',
    },
    timePeriod: {
        backgroundColor: 'transparent',
        color: '#444',
        fontSize: 12,
        fontWeight: '400',
        paddingTop: 3,
        paddingLeft: 2,
    },
    statusStyle: {
        backgroundColor: 'transparent',
        color: '#222',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'center'
    },
    smallTextStyle: {
        backgroundColor: 'transparent',
        color: '#222',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'center',
        marginTop: -2
    },
    lineStyle: {
        height: 1,
        width: '100%',
        backgroundColor: '#CCC',
        marginTop: 10,
        marginBottom: 0,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#666',
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1
    },
    filterHeader: {
        color: '#0022A1',
        fontWeight: "600",
        fontSize: 18,
        fontFamily: 'Roboto',
        flex: 2,
        textAlign: 'center',
        marginTop: 10
    },
    filterSubtitleContainer: {
        borderTopColor: '#BBB',
        borderTopWidth: 1,
        paddingBottom: 5,
        backgroundColor: '#FFF'
    },
    filterSubtitle: {
        fontFamily: 'RobotoCondensed-Regular',
        opacity: 0.8,
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10
    },
    headerContainer: {
        paddingHorizontal: 10,
        paddingVertical: 11,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginTop: 3,
    },
    btnContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    infoBarContainer: {
        backgroundColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 15
    },
    wageTitleText: {
        fontFamily: 'Lato-Semibold',
        fontSize: 14,
        color: '#666',
        marginBottom: 4
    },
    wageText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'right',
        marginRight: 40
    },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 30
    },
    spinner: {
        flex: 1,
        top: 0,
        position: 'absolute',
        zIndex: 100
    },
    settingRowContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 5,
        backgroundColor: 'lightgray',
        paddingVertical: 10
    },
    settingName: {
        fontSize: 17,
        fontFamily: "Lato-Regular",
        color: '#4A4A4A',
    },
    mapViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapView: {
        borderWidth: 2,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 0,
        height: 250,
        width: '85%',
    },
    map: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    }
});

const updateShiftUser = gql`
  mutation updateMarket($id: Uuid!, $market: MarketPatch!) {
    updateMarketById(input: { id: $id , marketPatch: $market}) {
         market{
          id
          workerResponse
          shiftId
          clockInLocation
          clockInDate
          clockInVerified
          clockOutLocation
          clockOutDate
          clockOutVerified
        }
    }
  }`


const updateShift = gql`
  mutation updateShift($id: Uuid!, $workersInvited: [Uuid], $workersAssigned: [Uuid] ) {
    updateShiftById(input: { id: $id , shiftPatch: {workersInvited: $workersInvited, workersAssigned: $workersAssigned }}) {
        shift{
          id
          workersAssigned
        }
    }
  }`

export default compose(
    graphql(updateShiftUser, {
        name: 'updateShiftUser'
    }),
    graphql(updateShift, {
        name: 'updateShift'
    }),
    graphql(userTimeOffRequestQuery,{
        name: "userTimeOffRequest",
        options: (ownProps) => {
            return {
                skip: !(ownProps.worker || ownProps.userId),
                variables: {
                    requestorId: ownProps.worker || ownProps.userId,
                }
            }
        }
    })
)(Details);

function renderMarker({location}) {
    return (
        <MapView.Marker
            coordinate={location}
        >
            <MapView.Callout>
                <Text></Text>
            </MapView.Callout>
        </MapView.Marker>
    );
}
