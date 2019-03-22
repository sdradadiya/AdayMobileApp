import React, {Component} from 'react';
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import moment from 'moment';
import {
    Card,
    Text,
    Icon,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
//import {Tracker} from '../constants';
let {height, width} = Dimensions.get('window');
let Width = width / 375;

let HEIGHT = Platform.OS === 'android' ? 110 : 95;
let WIDTH = Platform.OS === 'android' ? 315 * Width : 308 * Width;

class ScheduleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeUpdater: 0,
            hours:this.props
        }
        this.tick = this.tick.bind(this);
    }
    tick() {
        this.setState({secondsRemaining: this.state.secondsRemaining + 1});
    }
    componentDidMount () {
        // set ticker to update shift bid countdowns
        // right now updates per second
        this.interval = setInterval(this.tick, 60000);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            hours:nextProps.hours
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    static propTypes = {
        data: React.PropTypes.object,
    }

    applyForTraining() {
    }

    render() {
        const data = this.props.data;

        /* const scheduleDate = () => {
            return(
                <View style={{...localStyles.flexCol, alignItems: "center", flex: 0.125, paddingTop: 8, height: 100}}>
                    <Text style={{
                        ...localStyles.h1GrayLato,
                        lineHeight: 25
                    }}>{moment(data.start).format('D').toUpperCase()}</Text>
                    <Text style={{
                        ...localStyles.h3BlackLato,
                        lineHeight: 15
                    }}>{moment(data.start).format('MMM').toUpperCase()}</Text>
                    <Text style={{
                        ...localStyles.h3GrayLato,
                        lineHeight: 15
                    }}>{moment(data.start).format('ddd').toUpperCase()}</Text>
                </View>
            )
        }; */

        if (data.noDataAvailable) {

            return (
                <View style={{
                    //backgroundColor: '#FAFAFA',
                    marginLeft: 5,
                    marginRight: 5,
                    height: HEIGHT,
                }}>
                    {(moment(data.start).isSame(moment().subtract(2, 'week').subtract(1, 'day'), 'day'))? 
                        <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 45 * Width}}>
                        <TouchableOpacity                                   
                         style={{
                            flex:1,
                            alignSelf:'flex-end',
                            marginRight: 5,
                            marginTop: 10,
                            width: WIDTH,
                            height: HEIGHT - 20,
                            borderRadius: 2,
                            backgroundColor: '#fff',
                            elevation:5,
                            shadowColor: '#000000',
                            shadowOffset: {width: 2, height: 3},
                            shadowOpacity: 0.5,
                        }}
                        onPress={() => Actions.SchedulingOptions({userId: this.props.userId, isfromCalendar: true})}>
                        <View style={{
                            ...localStyles.flexCol,
                            backgroundColor: '#FAFAFA',
                        }}/>
                            <Text style={{ ...localStyles.h2BlackLato, marginTop: 25, alignSelf:'center' }}>View All Work History</Text>
                        </TouchableOpacity> 
                    </View>

                    :
                    <View style={{flex:1,flexDirection: 'row',
                        marginLeft: 5,
                        marginRight: 5,
                        maxHeight: HEIGHT
                    }}>
                        <View style={{
                            ...localStyles.flexCol,
                            alignItems: "center",
                            width: 46 * Width,
                            paddingTop: -10,
                            backgroundColor: '#FAFAFA',
                        }}/>

                        <View style={{
                            backgroundColor: '#FAFAFA',
                            width: WIDTH,
                            height: HEIGHT-10,
                            alignItems: "center",
                            paddingTop: 4,
                            justifyContent: 'center'
                        }}>
                            <Image style={{width: 24.25, height: 27}} source={require('./assets/no-shifts-icon.png')}/>
                            <Text style={{...localStyles.h3Lato, lineHeight: 15, color: "#999999", marginTop: 8}}>No Shifts
                                Available {moment(data.start).format('MMM DD')}</Text>
                        </View>
                    </View>
                    }
                </View>
            );
        } else {
            const arrayShift = data.date;
            return (
                <View>
                    {
                        data.date.map((data, key) => {
                            if(data.workerResponse === 'NO' && moment(data.start).isSameOrAfter(moment())){
                                // this.props.actions.saveDeclinedShift(data);
                                return (
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#FAFAFA',
                                        marginLeft: 5,
                                        marginRight: 5,
                                        height: HEIGHT,
                                        //marginTop: -HEIGHT,
                                    }}>
                                        <View style={{
                                            ...localStyles.flexCol,
                                            alignItems: "center",
                                            width: 46 * Width,
                                            paddingTop: -10,
                                            backgroundColor: '#FAFAFA'
                                        }}/>

                                        <View style={{
                                            backgroundColor: '#FAFAFA',
                                            width: WIDTH,
                                            height: HEIGHT-10,
                                            alignItems: "center",
                                            paddingTop: 4,
                                            justifyContent: 'center'
                                        }}>
                                            <Image style={{width: 24.25, height: 27}} source={require('./assets/no-shifts-icon.png')}/>
                                            <Text style={{...localStyles.h3Lato, lineHeight: 15, color: "#999999", marginTop: 8}}>No Shifts
                                                Available {moment(data.start).format('MMM DD')}</Text>
                                        </View>
                                    </View>
                                );
                            }


                            let start = moment(data.start);
                            let end = moment(data.end);
                            let iconColor = '';
                            if (data.tentative && data.status !== 'PAST') {
                                iconColor = 'rgba(0, 168, 99, 0.50)';
                            }
                            else if (data.status === 'BOOKED') {
                                iconColor = '#00A863';
                            } else if (data.status === 'PAST') {
                                iconColor = '#4A4A4A';
                            } else if (data.status === 'INVITED') {
                                iconColor = '#FFAD33';
                            } else if (data.status === 'PENDING') {
                                iconColor = '#FFAD33';
                            } else if (data.status === 'OPEN') {
                                iconColor = '#E33820';
                            }

                            const renderIcon = () => {
                                if (data.tentative && data.status !== 'PAST') {
                                    iconColor = 'rgba(0, 168, 99, 0.50)';
                                    return <Image style={localStyles.iconStyle}
                                                  source={require('./assets/icons/booked.png')}/>
                                } else if (data.status === 'BOOKED') {
                                    iconColor = '#00A863';
                                    return <Image style={localStyles.iconStyle}
                                                  source={require('./assets/icons/booked.png')}/>
                                } else if (data.status === 'PAST') {
                                    iconColor = '#4A4A4A';
                                    return <Image style={localStyles.iconStyle}
                                                  source={require('./assets/icons/history.png')}/>
                                } else if (data.status === 'INVITED') {
                                    iconColor = '#FFAD33';
                                    return <Image style={localStyles.iconStyle}
                                                  source={require('./assets/icons/pending.png')}/>
                                } else if (data.status === 'PENDING') {
                                    iconColor = '#FFAD33';
                                    return <Image style={localStyles.iconStyle}
                                                  source={require('./assets/icons/pending.png')}/>
                                } else if (data.status === 'OPEN') {
                                    iconColor = '#E33820';
                                    return <Image style={localStyles.iconStyle}
                                                  source={require('./assets/icons/open.png')}/>
                                }
                            };

                            const renderData = (mainText, period) => (
                                <View style={{...localStyles.flexRow, marginRight: 10 * Width}}>
                                    <Text style={{...localStyles.h2BlackLato}}>{mainText.toUpperCase()}</Text>
                                    <Text
                                        style={{
                                            ...localStyles.h5BlackLato,
                                            marginLeft: 2,
                                            paddingTop: 4
                                        }}>{period.toUpperCase()}</Text>
                                </View>
                            );

                            const proper = string => (
                                string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
                            );

                            const padding1 = (data.brand.length + data.workplace.length) > width / 10 ? 55 : 0;
                            const padding2 = data.address1
                                ? (data.address1.length + data.address2.length) > width / 10 ? 55 : 0
                                : data.address2.length > width / 10 ? 55 : 0;

                            const requiredWidth = width / 15;

                            const length1 = width / (data.workplace.length < width / 15 ? data.workplace.length / 7 : 2.7);
                            const length2 = width / (data.brand.length < width / 15 ? data.brand.length / 7 : 2.7);

                            const length3 = width / (data.address2.length < width / 15 ? data.address2.length / 7 : 2.7);
                            const length4 = width / (data.address1.length < width / 15 ? data.address1.length / 7 : 2.7);

                            let countdownText = "";
                            if (data.status != "BOOKED" && data.status != "PAST") {
                                /* aborted scheme
                                // final countdown to instant pickup phase (2nd autoassign) default 48 hours before shift
                                final_buffer_seconds = (data.instantPickupDaysBeforeShift || 2) * 24 * 60 * 60;
                                // calculate seconds remaining in final timer (until phone tree)
                                let final_seconds =  moment(data.start).diff(moment(), 'seconds') - final_buffer_seconds;
                                if (final_seconds > 0) {
                                    // show final timer if only second autoassign is left
                                    let days = parseInt(final_seconds / 86400);
                                    let hours = parseInt(final_seconds / 3600) + 1 - days * 24;
                                    countdownText = '• Bidding Ends ' + days + 'd ' + hours + 'h';
                                }
                                // initial countdown is to bidding cutoff (first autoassign) default 7 days before shift
                                initial_buffer_seconds = (data.bidCutoffDaysBeforeShift || 7) * 24 * 60 * 60;
                                // calculate seconds remaining in initial timer (until bid cutoff)
                                let initial_seconds =  moment(data.start).diff(moment(), 'seconds') - initial_buffer_seconds;
                                if (initial_seconds > 0) {
                                    // show initial timer if first autoassign has not happened yet
                                    let days = parseInt(initial_seconds / 86400);
                                    let hours = parseInt(initial_seconds / 3600) + 1 - days * 24;
                                    countdownText = '• Bidding Ends ' + days + 'd ' + hours + 'h';
                                }*/
                                // countdown to end of bidding period as defined in relation to shift creation date
                                let bidding_end = moment(data.biddingPeriodExpiration) || moment().format();
                                let seconds = moment(bidding_end).diff(moment(), 'seconds');
                                if (seconds > 0) {
                                    let days = parseInt(seconds / 86400);
                                    let hours = parseInt(seconds / 3600) + 1 - days * 24;
                                    countdownText = ' • Requests Due ' + days + 'd ' + hours + 'h';
                                } else if (!data.phoneTreeHasRun) {
                                    // disappear shifts after countdown runs out
                                    return null;
                                }
                                // override and go to first come first served if phone tree has been activated
                                if (data.phoneTreeHasRun){
                                    countdownText = ' • Instant Pickup';
                                }
                            }

                            return (
                                <View style={{height: HEIGHT}}>
                                    {key === 0 && (moment(data.start).isSame(moment().subtract(2,'w').subtract(1, 'day'), 'day')) &&
                                    <TouchableOpacity onPress={() => Actions.SchedulingOptions({userId: this.props.userId, isfromCalendar: true})}>
                                        <View style={{width: WIDTH,height:30,justifyContent:'center',alignSelf:'center',marginLeft: 45*Width}}>
                                            <Text style={{alignSelf:'center'}}>View All Work History</Text>
                                        </View>
                                    </TouchableOpacity>}

                                    {   // Code seems identical (first shift of day vs. other shifts), why distinguish?
                                        key === 0 ? (
                                                <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 45 * Width}}>
                                                    <View style={{
                                                        width: 8 * Width,
                                                        backgroundColor: iconColor,
                                                        height: HEIGHT - 10,
                                                        borderTopLeftRadius: 2,
                                                        borderBottomLeftRadius: 2,
                                                    }}/>

                                                    <TouchableOpacity
                                                        style={{
                                                            flex:1,
                                                            alignSelf:'flex-end',
                                                            marginRight: 7,
                                                            marginBottom: 7,
                                                            width: WIDTH,
                                                            height: HEIGHT - 10,
                                                            borderRadius: 2,
                                                            backgroundColor: '#fff',
                                                            elevation:5,
                                                            shadowColor: '#000000',
                                                            shadowOffset: {width: 2, height: 3},
                                                            shadowOpacity: 0.5,
                                                        }}
                                                        onPress={() => {
                                                            //Tracker.trackScreenView("Shift Detail");

                                                             Actions.ShiftDetails({
                                                                showDetails: true,
                                                                shiftDetails: {...data},
                                                                countdownText: countdownText,
                                                                shiftId: data.shiftId,
                                                                marketId: data.marketId,
                                                                isFromPhoneTree: data.isFromPhoneTree,
                                                                clockOutDate: data.clockOutDate,
                                                                clockInDate: data.clockInDate,
                                                                addressJson: data.addressJson,
                                                                locationCoor: data.locationCoor,
                                                                zipCode: data.zipCode,
                                                                worker: data.worker,
                                                                workersInvited: data.workersInvited,
                                                                workersAssigned: data.workersAssigned,
                                                                status: data.status,
                                                                positionName: data.position,
                                                                brandName: data.brand,
                                                                workplaceName: data.workplace,
                                                                arrayShift: arrayShift,
                                                                payment: data.hourlyPayment,
                                                                fromDecline: false,
                                                                 alldata:this.props.alldata
                                                            })
                                                        }
                                                        }>

                                                        <View style={{
                                                            ...localStyles.flexRow,
                                                            paddingTop: 4,
                                                            paddingLeft: 8,
                                                            paddingRight: 8,
                                                            marginBottom: 2,
                                                            justifyContent: 'space-between',

                                                        }}>
                                                            <View style={{width: "80%"}}>
                                                                <Text style={{
                                                                    ...localStyles.h2BlackLato,
                                                                    fontWeight: "700"
                                                                }}>{data.position}</Text>
                                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                                      style={{...localStyles.h4BlackLatoBlack}}>{data.brand} | {data.workplace}</Text>
                                                                <Text style={{...localStyles.h4BlackLato}}>
                                                                    {proper(data.tentative ? 'tentative' : data.status)}
                                                                    {data.bookedByAutoAssign || data.bookedByPhoneTree ? ' (By Award)' : '' }
                                                                    {countdownText}
                                                                </Text>
                                                            </View>
                                                            {renderIcon()}
                                                        </View>
                                                        <View style={{
                                                            ...localStyles.flexRow,
                                                            paddingLeft: 8,
                                                            paddingRight: 8,
                                                            marginBottom: 4,
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <View style={{...localStyles.flexRow}}>
                                                                <View
                                                                    style={{marginRight: 8}}>{renderData(start.format("h:mm"), start.format("a"))}</View>
                                                                <View>{renderData(end.format("h:mm"), end.format("a"))}</View>
                                                            </View>
                                                            <View style={{...localStyles.flexRow}}>
                                                                <View style={{
                                                                    ...localStyles.flexCol,
                                                                    marginRight: 5,
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                }}>
                                                                    <Text style={localStyles.h5GrayLato}>Estimated</Text>
                                                                    <Text style={localStyles.h5GrayLato}>Earnings:</Text>
                                                                </View>
                                                                {
                                                                    data.hourlyPayment===0 ? (renderData("$00", ".00") )
                                                                        : ( renderData("$"+data.hourlyPayment.toString().split('.')[0], "." + data.hourlyPayment.toString().split('.')[1]))

                                                                }
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                            :
                                            (
                                                <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 45 * Width}}>
                                                    <View style={{
                                                        width: 8 * Width,
                                                        backgroundColor: iconColor,
                                                        height: HEIGHT - 10,
                                                        borderTopLeftRadius: 2,
                                                        borderBottomLeftRadius: 2,
                                                    }}/>
                                                    <TouchableOpacity
                                                        style={{
                                                            flex:1,
                                                            alignSelf:'flex-end',
                                                            marginRight: 7,
                                                            marginBottom: 7,
                                                            width: WIDTH,
                                                            height: HEIGHT - 10,
                                                            borderRadius: 2,
                                                            backgroundColor: '#fff',
                                                            elevation:5,
                                                            shadowColor: '#000000',
                                                            shadowOffset: {width: 2, height: 3},
                                                            shadowOpacity: 0.5,
                                                        }}
                                                        onPress={() => {
                                                            //Tracker.trackScreenView("Shift Detail");
                                                            Actions.ShiftDetails({
                                                                showDetails: true,
                                                                shiftDetails: {...data},
                                                                shiftId: data.shiftId,
                                                                marketId: data.marketId,
                                                                isFromPhoneTree: data.isFromPhoneTree,
                                                                clockOutDate: data.clockOutDate,
                                                                clockInDate: data.clockInDate,
                                                                countdownText: countdownText,
                                                                addressJson: data.addressJson,
                                                                locationCoor: data.locationCoor,
                                                                zipCode: data.zipCode,
                                                                worker: data.worker,
                                                                workersInvited: data.workersInvited,
                                                                workersAssigned: data.workersAssigned,
                                                                status: data.status,
                                                                positionName: data.position,
                                                                brandName: data.brand,
                                                                workplaceName: data.workplace,
                                                                arrayShift: arrayShift,
                                                                payment: data.hourlyPayment,
                                                                fromDecline: false,
                                                                alldata:this.props.alldata
                                                            })
                                                        }}>

                                                        <View style={{
                                                            ...localStyles.flexRow,
                                                            paddingTop: 4,
                                                            paddingLeft: 8,
                                                            paddingRight: 8,
                                                            marginBottom: 2,
                                                            justifyContent: 'space-between',

                                                        }}>
                                                            <View style={{width: "80%"}}>
                                                                <Text style={{
                                                                    ...localStyles.h2BlackLato,
                                                                    fontWeight: "700"
                                                                }}>{data.position}</Text>
                                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                                      style={{...localStyles.h4BlackLatoBlack}}>{data.brand} | {data.workplace}</Text>
                                                                <Text
                                                                    style={{...localStyles.h4BlackLato}}>
                                                                    {proper(data.tentative ? 'tentative' : data.status)}
                                                                    {data.bookedByAutoAssign || data.bookedByPhoneTree ? ' (Won By Award)' : '' }
                                                                    {countdownText}
                                                                </Text>
                                                            </View>
                                                            {renderIcon()}
                                                        </View>
                                                        <View style={{
                                                            ...localStyles.flexRow,
                                                            paddingLeft: 8,
                                                            paddingRight: 8,
                                                            marginBottom: 4,
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <View style={{...localStyles.flexRow}}>
                                                                <View
                                                                    style={{marginRight: 8}}>{renderData(start.format("h:mm"), start.format("a"))}</View>
                                                                <View>{renderData(end.format("h:mm"), end.format("a"))}</View>
                                                            </View>
                                                            <View style={{...localStyles.flexRow}}>
                                                                <View style={{
                                                                    ...localStyles.flexCol,
                                                                    marginRight: 5,
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                }}>
                                                                    <Text style={localStyles.h5GrayLato}>Estimated</Text>
                                                                    <Text style={localStyles.h5GrayLato}>Earnings:</Text>
                                                                </View>
                                                                {
                                                                    data.hourlyPayment===0 ? (renderData("$00", ".00") )
                                                                        : ( renderData("$"+data.hourlyPayment.toString().split('.')[0], "." + data.hourlyPayment.toString().split('.')[1]))

                                                                }
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            )
        }

    }
}

export default ScheduleCard

const localStyles = {
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    h1GrayLato: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#999999',
    },
    h2BlackLato: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: '#4A4A4A',
    },
    h3BlackLato: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#4A4A4A',
    },
    h3GrayLato: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#999999',
    },
    h4BlackLatoBlack: {
        // fontFamily: 'Lato-Black',
        fontSize: 12,
        color: '#4A4A4A',
        fontWeight: 'bold',
    },
    h4BlackLato: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: '#4A4A4A',
    },
    h5BlackLato: {
        fontFamily: 'Lato-Regular',
        fontSize: 9,
        color: '#4A4A4A',
    },
    h5GrayLato: {
        fontFamily: 'Lato-Regular',
        fontSize: 9,
        color: '#999999',
    },
    iconStyle: {
        backgroundColor: 'transparent',
        height: 24,
        width: 24,
        marginRight: 10 * Width
    },
};
