import React,{Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    Platform
} from 'react-native';
import moment from 'moment';
import {
    LazyloadView,
    LazyloadListView
} from 'react-native-lazyload';
import {Actions} from "react-native-router-flux";

let {width} = Dimensions.get('window');
let Width = width / 375;
let prevDate = null;
let checkPlatform = Platform.OS === 'ios';

class WorkedShift extends Component
{
    constructor(props) {
        super(...arguments);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        prevDate = null;
        this.state = {
            dataSource: ds.cloneWithRows(props.workedData || [])
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.workedData){
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //prevDate = nextProps.workedData[0].startTime;
            this.state = {
                dataSource: ds.cloneWithRows(nextProps.workedData || [])
            };
        }
    }

    renderData = (mainText, period) => (
        <View style={[styles.flexRow, {marginRight: 10 * Width}]}>
            <Text style={styles.h2BlackLato}>{mainText.toUpperCase()}</Text>
            <Text style={[styles.h5BlackLato, {marginLeft: 2, paddingTop: 4}]}>{period.toUpperCase()}</Text>
        </View>
    );

    renderRow = (item) => {
        let isBooked = item.isBooked;
        let workerResponse = item.workerResponse;
        let color = '#4A4A4A';
        let statusText = '';
        let icon = require('../../assets/icons/booked.png');

        if(isBooked){
            statusText = 'Worked';
            color = '#00A863';
            icon = require('../../assets/icons/booked.png');
        }
        else if(!isBooked && workerResponse === 'YES'){
            statusText = 'Request not accepted';
            color = '#FFAD33';
            icon = require('../../assets/icons/pending.png');
        }
        else if(!isBooked && workerResponse === 'NONE'){
            statusText = 'No request made';
            color = '#E33820';
            icon = require('../../assets/icons/open.png');
            // do not display shifts that the user did not request
            return null;
        }


        const breakTime = item.unpaidBreakTime;
        const timeH = breakTime? breakTime.split(':')[0] : 0
        const timeM = breakTime? breakTime.split(':')[1] : 0
        const timeS = breakTime? breakTime.split(':')[2] : 0

        const endTime = moment(item.endTime).subtract({hours: timeH, minutes: timeM, seconds: timeS}).format();
        //const workingHours = moment(moment(endTime).diff(moment(item.startTime), 'hours', true))//.subtract
        const workingMinutes = moment(moment(endTime).diff(moment(item.startTime), 'minutes', true))//.subtract

        const workingHours = (workingMinutes/60)
        let wage = item.wage;
        const payment = (workingHours * wage).toFixed(2);

        let renderDateView = false;
        let date = moment(prevDate).format('DD-MM-YYYY');

        let renderDate = moment(item.startTime).format('DD-MM-YYYY');
        if(date === renderDate){
            renderDateView = true;
            prevDate = item.startTime;
        }
        else {
            renderDateView = false;
            prevDate = item.startTime;
        }

        return (
            <LazyloadView host="listExample">
                <TouchableOpacity
                    onPress={() => {
                        Actions.ShiftDetails({
                            showDetails: true,
                            shiftDetails: {...item},
                            start: item.startTime,
                            workplaceImageUrl: item.workplaceImageUrl,
                            end: item && item.endTime,
                            shiftId: item && item.shiftId,
                            marketId: item.marketId,
                            isFromPhoneTree: item.isFromPhoneTree,
                            clockOutDate: item.clockOutDate,
                            clockInDate: item.clockInDate,
                            status: 'PAST',
                            tentative: item.tentative,
                            addressJson: item.addressJson,
                            locationCoor: item.locationJson,
                            zipCode: item.zipCode,
                            worker: item.worker || item.workerId,
                            fromDecline: true,
                            workersInvited: item.workersInvited,
                            workersAssigned: item.workersAssigned,
                            positionName: item.positionName,
                            brandName: item.brandName,
                            workplaceName: item.workplaceName,
                            payment: payment,
                            wage: item.wage
                        })
                    }
                    }>
                    <View style={{flex:1, height: 105,flexDirection:'row', width:'100%'}}>
                        {
                            !renderDateView ?
                                <View style={{width:45*Width, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:24,color:'#9c9c9c',fontWeight:'600'}}>{moment(item.startTime).format('D').toUpperCase()}</Text>
                                    <Text style={{fontSize:15,color:'#3d3d3d'}}>{moment(item.startTime).format('MMM').toUpperCase()}</Text>
                                    <Text style={{fontSize:15,color:'#adadad'}}>{moment(item.startTime).format('ddd').toUpperCase()}</Text>
                                </View>
                                :
                                <View style={{width:45*Width, justifyContent:'center', alignItems:'center'}}>

                                </View>
                        }

                        <View style={{flex: 1, borderRadius: 3, width: '89%', margin: 5, flexDirection: 'row', shadowColor: '#000000',
                            shadowOffset: {width: 2, height: 3}, shadowOpacity: 0.5, elevation: checkPlatform ? 5 : 1}}>
                            <View style={{width: "2.5%", backgroundColor: color, height: '100%', borderBottomLeftRadius: 3, borderTopLeftRadius: 3}}/>
                            <View style={{flex: 1, width: "95%", padding: 3 }}>
                                <View style={{flex: 0.6, justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <View style={{margin: 5, width: '80%'}}>
                                        <Text style={[styles.h2BlackLato, {fontWeight: "700"}]}>{item.positionName}</Text>
                                        <Text numberOfLines={1} ellipsizeMode="tail"
                                              style={styles.h4BlackLatoBlack}>{item.brandName}
                                            | {item.workplaceName}</Text>
                                        <Text style={styles.h4BlackLato}>
                                            {statusText}
                                            {item.bookedByAutoAssign && ' (By Award)'}
                                            {item.bookedByPhoneTree && ' (By Phone)' }</Text>
                                    </View>
                                    <Image style={{backgroundColor: 'transparent', height: 24, width: 24, margin: 5, marginRight: 15}}
                                           source={icon}/>
                                </View>

                                <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center', margin: 5, marginTop: 45}}>
                                    <View style={{marginRight: 8}}>
                                        {this.renderData(moment(item && item.startTime).format('h:mm').toUpperCase(), moment(item.startTime).format('a').toUpperCase())}
                                    </View>
                                    <View>
                                        {this.renderData(moment(item && item.endTime).format('h:mm').toUpperCase(), moment(item.endTime).format('a').toUpperCase())}
                                    </View>
                                    <View style={[styles.flexRow,{flex:1,justifyContent:'flex-end'}]}>
                                        <View style={[styles.flexCol, {marginRight: 5, justifyContent: "center", alignItems: "center"}]}>
                                            <Text style={styles.h5GrayLato}>ESTIMATED</Text>
                                            <Text style={styles.h5GrayLato}>PAYMENTS:</Text>
                                        </View>
                                        {this.renderData(payment.toString().split('.')[0],
                                            "." + payment.toString().split('.')[1]) }
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </LazyloadView>
        )
    };

    render(){
        if (this.props.workedData === null) {
            return (<View>
                <Text> Loading... </Text>
            </View>);
        }

        if (this.props.workedData.length === 0) {
            return (<View>
                <Text> No History </Text>
            </View>);
        }

        return(
            <LazyloadListView
                style={{flex:1}}
                name="listExample"
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                scrollRenderAheadDistance={checkPlatform ? 5 : 10}
                renderDistance={100}
                pageSize={checkPlatform ? 1 : 5}
                initialListSize={6}
            />
        )
    }
}

export default WorkedShift;

const styles = StyleSheet.create({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    h2BlackLato: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: '#4A4A4A',
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
    }
});