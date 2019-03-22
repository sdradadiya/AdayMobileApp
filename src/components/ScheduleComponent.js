import React, {Component} from 'react';
import {Container} from 'native-base';
import {gql, graphql, compose} from 'react-apollo';
import {
    AppState,
    Alert,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SectionList,
    Modal,
    Platform,
    Linking,
} from 'react-native';
import CalendarStrip from './custom-react-native-calendar-strip';
import ScheduleCardComponent from './ScheduleCardComponent'
import moment from 'moment';
import _ from 'lodash';
import SpinnerComponent from './SpinnerComponent';
import {sortBy, uniqBy} from 'lodash';
import Snackbar from 'react-native-snackbar';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import {width as dWidth} from 'react-native-dimension';
//import {Tracker} from "../constants/index";

let {width} = Dimensions.get('window');
let Width = parseFloat(width / 375);
/**
 * @todo segmented-control https://mobile.ant.design/components/segmented-control/
 */
import { userShifts } from "./scheduleQueries.js";

//"a7c0181e-3123-11e8-9ad7-0ac2dc936f20" Uuid!
const mobileVersion = gql `query mobileVersion($id: Uuid!){
  mobileInformationById (id: $id){
    appVersion
    disabled
  }
}`;

let sectionData,pastData = [], lastdate;
let Index = 0;
let hours = {};
let HEIGHT = Platform.OS === 'android' ? 110 : 95;
let h = 0;

let oldSectionData;
class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate:  moment(this.props.start),
            appState: AppState.currentState,
            loading: false,
            contentOffsetY: 0,
            backwardStart: moment(this.props.start),
            up: false,
            nextWeekDate: moment(this.props.start).add(1, 'w').subtract(1,'day'),
            sectionData: []
        };
        this.sortOpenShifts = this.sortOpenShifts.bind(this);
        this.getItemLayout = sectionListGetItemLayout({
                // The height of the row with rowData at the given sectionIndex and rowIndex
                getItemHeight: (rowData, sectionIndex, rowIndex) => this.state.sectionData[sectionIndex].data[0].date ? this.state.sectionData[sectionIndex].data[0].date.length * (HEIGHT) : HEIGHT,

                // These four properties are optional
                getSeparatorHeight: () => 0, // The height of your separators
                getSectionHeaderHeight: () => 0, // The height of your section headers
                getSectionFooterHeight: () => 0, // The height of your section footers
                listHeaderHeight: 0, // The height of your list header
            }
        )

        /*var days = [];
        var day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        console.log(days);*/
        //Tracker.trackScreenView("Schedule");
    }

    componentDidMount() {
        this.props.onRef(this);
        /*
        const version=this.props.mobVersion;
        AsyncStorage.getItem('version').then((value)=>{
           if(version.mobileInformationById) {
                if (value === null) {
                    AsyncStorage.setItem('version', version.mobileInformationById.appVersion.toString());
                }else{
                    oldVersion=value;
                }
            }
        });
        */
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillMount() {
        // THIS IS NOT THE CORRECT WAY TO UPDATE STATE....
        if(oldSectionData) {
            this.state.sectionData = oldSectionData;
        }
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    sortOpenShifts = (a,b) => {
          if (a.status > b.status)
            return 1;
          if (a.status < b.status)
            return -1;
          return 0;
    }

    sortByStart = (a,b) => {
        if (a.start > b.start)
            return 1;
          if (a.start < b.start)
            return -1;
          return 0;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.userShifts.loading && this.props !== nextProps) {
            const version = nextProps.mobVersion;
            if (version.mobileInformationById) {
                this.setState({appDisabled: version.mobileInformationById.disabled})
            }

            const data = nextProps.userShifts;
            const _this = this;
            h = 0;
            let unfilteredSectionDate = [];
            let listUnfiltered = [];
            const savedSchedules = this.props.store.schedules;
            let unSavedSchedules = [];
//                    const workersAssignedNum = node.workersAssigned ? node.workersAssigned.length : 0;

            // Label Shift Types
            if(data && !data.error) {
                if (data.allUserShiftsMobiles && (data.allUserShiftsMobiles.nodes.length > 0)) {

                    data.allUserShiftsMobiles.nodes.map(function (node, index) {
                        const market = node;
                        const workersAssignedNum = node.workersAssigned ? node.workersAssigned.length : 0;
                        const workersInvitedNum = node.workersInvited ? node.workersInvited.length : 0;
                        const not_filled = workersAssignedNum !== node.workersRequestedNum;
                        const not_full_invite = workersAssignedNum + workersInvitedNum < node.workersRequestedNum;
                        const working_shift = node.workersAssigned && node.workersAssigned.includes(data.variables.userId);
                        const invited = node.workersInvited && node.workersInvited.includes(data.variables.userid);
                        const biddingNotOver = node.biddingPeriodExpiration && moment().isBefore(node.biddingPeriodExpiration)

                        let type = null;
                        var past = moment(node.endTime).isBefore(moment().format());
                        if ( past && working_shift) {
                            type = 'PAST'
                        }
                        else if (working_shift) {
                            type = 'BOOKED';
                        } else if (!past && invited) {
                            type = 'INVITED';
                        } else if (!past && market && not_filled && not_full_invite && market.workerResponse == 'YES' && biddingNotOver) {
                            type = 'PENDING';
                        }
                        else if (!past && market && not_filled && not_full_invite && market.workerResponse !== 'NO' && biddingNotOver) {
                            type = 'OPEN';
                        }
                        //
                        if (type)   {
                            type ? listUnfiltered.push({..._this.formatToListData(node, type), key: index}) : null;
                            type ? unfilteredSectionDate.push(moment(node.startTime).format('YYYY-MM-DD')) : null;
                        }
                        !savedSchedules[node.shiftId] && unSavedSchedules.push({...node, type});
                        
                    });
                    _this.formSectionList(listUnfiltered, unfilteredSectionDate, nextProps, _this, unSavedSchedules)
                }
            } else {
                // Alert.alert('ADay','Your Request Couldn\'t Be Completed');
            }
        }
    }

    formSectionList(listUnfiltered, unfilteredSectionDate, nextProps, _this, unSavedSchedules) {
            let filteredDate = []
            let sectionData1 = [];
            sectionData = [];

            if (unfilteredSectionDate.length > 0) {
                filteredDate = sortBy(uniqBy(unfilteredSectionDate));
            }
            let listData = [];

            //Filter Shifts
            if (nextProps.filter == "ALL") {
                listData = listUnfiltered
            } else {
                listUnfiltered.forEach(function (card) {
                    if (card.status == nextProps.filter) {
                        listData.push(card)
                    }
                });
            }

            listData = uniqBy(listData, function (item) {
                return item.shiftId
            })

            let end = null;
            if (unfilteredSectionDate.length > 0) {
                end = moment(filteredDate[filteredDate.length - 1]).add(10, 'days');
            } else {
                end = moment().subtract(2, 'w').subtract(1,'day');
            }

            startDate = moment().subtract(2, 'w').subtract(1,'day');

            while (startDate.format('YYYY-MM-DD') !== end.format('YYYY-MM-DD')) {
                let d = [];
                let d1 = startDate.format('YYYY-MM-DD');
                let noData = false;
                const data = listData.filter(x => moment(x.start).format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD'));

                listData.map((item) => {
                    if (moment(item.start).format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD')) {
                        d.push(item);
                    }
                });

                d.sort(this.sortOpenShifts) // SORTS SO BOOKED SHIFTS SHOW UP FIRST ON DAY
                let bookedHour=0.0;

                if (d.length > 0) {
                    for (let i = 0; i < d.length; i++) {

                        let obj = {},openHour=0.0,workingHour=0.0,bonusHour=0.0;
                        obj = d[i];
                        var workingHours = obj.workingMinutes / 60

                        // length of shift
                            if (bookedHour > 8 || bookedHour === 8) {
                                obj.hourlyPayment = workingHours * obj.hourlyWage * 1.5
                            } else {
                                workingHour = 8 - bookedHour;
                                if (workingHour > workingHours || workingHour === workingHours) {
                                    obj.hourlyPayment = workingHours * obj.hourlyWage;
                                } else {
                                    bonusHour = workingHours - workingHour;
                                    obj.hourlyPayment = ((workingHour * obj.hourlyWage) + (bonusHour * obj.hourlyWage * 1.5)) === 0 ? 0.0 : (workingHour * obj.hourlyWage) + (bonusHour * obj.hourlyWage * 1.5);
                                }
                            }

                        if (obj.status === "BOOKED") {
                            bookedHour = bookedHour + workingHours
                        }
                        obj.hourlyPayment = parseFloat(obj.hourlyPayment).toFixed(2)
                    }
                }
                d.sort(this.sortByStart);
                //const dataToSend = data.length > 0 ? d : [{ noDataAvailable: true, start: startDate.format(), key: startDate.format()  }];
                const dataToSend = d.length > 0 ? [{date:d,start: startDate.format(),key: startDate.format()}] : [{noData:noData, noDataAvailable: true, start: startDate.format(), key: startDate.format()  }];

                sectionData.push({
                    date: d1,
                    data: dataToSend,
                    key: d1
                });

                //while(startDate.format('YYYY-MM-DD') !== end.format('YYYY-MM-DD')) {
                let dd = [];
                let dd1 = startDate.format('YYYY-MM-DD');
                dd1 = _.cloneDeep(startDate.format('YYYY-MM-DD'));
                let d2 = _.cloneDeep(startDate);
                let days = [];
                let openH = 0, pendingH = 0, bookedH = 0;
                let objHour = {open: openH, pending: pendingH, booked: bookedH}
                for (let i = 1; i <= 7; i++) {
                    days.push(d2.format('YYYY-MM-DD'));
                    listData.map((item) => {
                        if (moment(item.start).format('YYYY-MM-DD') === d2.format('YYYY-MM-DD')) {
                            if (item.status === 'BOOKED') {
                                bookedH = bookedH + item.workingHours;
                            } else if (item.status === 'PENDING') {
                                pendingH = pendingH + item.workingHours;
                            } else if (item.status === 'OPEN') {
                                openH = openH + item.workingHours;
                            }
                        }
                    });

                    d2 = d2.add(1, 'days');
                }
                hours[dd1] = {open: openH.toFixed(0), pending: pendingH.toFixed(0), booked: bookedH.toFixed(0)};
                //const data = listData.filter(x => moment(x.start).format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD'));
                //}
                startDate = startDate.add(1, 'days');
            }
            // sectionData=sectionData+sectionData;
            // TODO
            // Sort By Start Time
            // on today's date, don't show conflicting open shifts
            _this.filterButtonColors();

            let l = sectionData ? sectionData.length : 0;

        var index = _.findIndex(sectionData, { date: moment().format("YYYY-MM-DD") });

        let y = sectionData.splice(15);
        pastData = sectionData;
        this.setState({
            sectionData:y,
        }, () => this.renderList());

        unSavedSchedules.length && this.props.actions.addShiftData(unSavedSchedules);

    }

    renderList = () => {
        let l = sectionData ? sectionData.length : 0;
        const displayList = (l == 0) ?
            (<View>
                <Text style={styles.filterSubtitle}>NO SHIFTS TO DISPLAY FOR SELECTED DATE AND FILTER</Text>
            </View>) :
            (<SectionList
                ref={(ref) => {
                    this._scrollViewTemp = ref;
                }}
                /*onMomentumScrollEnd={this._onScroll}*/
                automaticallyAdjustContentInsets={false}
                renderItem={this.renderItem}
                renderSectionHeader={({section}) => this.renderDateSeparator(section.date, section)}
                sections={this.state.sectionData || sectionData}
                stickySectionHeadersEnabled={Platform.OS === 'ios' ? true : false}
                getItemLayout={this.getItemLayout}
                refreshing={this.state.loading}
                onRefresh={() => this.loadMoreOnTop()}
                onViewableItemsChanged={({viewableItems}) => this.changeDate(viewableItems[0] || {
                    index: startDate,
                    key: startDate,
                    item: startDate
                })}
                onEndReachedThreshold={0.3}
            />);

        this.setState({displayList: displayList}, () => {
            this.forceUpdate()
           /* setTimeout(() => {
                if (this._scrollViewTemp){
                    this.clickManage(moment())
                }
            }, 3000);*/
        });
    };

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.props.userShifts.refetch();
        }
        this.setState({appState: nextAppState});
    }

    refetch = (key) => {
        const previousData= this.props.userShifts && this.props.userShifts.allUserShiftsMobiles && this.props.userShifts.allUserShiftsMobiles.nodes;
        if (previousData) {
            this.setState({refetching: true})
            this.props.userShifts.refetch()
              .then((data) => {
                      const check=_.isEqual(data.data.allUserShiftsMobiles.nodes,previousData);
                      if(check)
                      {
                          Snackbar.show({
                               title: 'Refresh Complete, Nothing Changed',
                               duration: Snackbar.LENGTH_LONG
                           });
                          this.setState({loadData:false})
                      }
                      else {
                           Snackbar.show({
                               title: 'Refresh Complete, Shifts Changed',
                               duration: Snackbar.LENGTH_LONG
                           });
                          this.setState({loadData:true})
                      }
                      this.setState({refetching: false})
                      Index = _.findIndex(this.state.sectionData, function(x) {
                          return x.date === lastdate;
                      })
                      this._scrollViewTemp.scrollToLocation({ sectionIndex: Index, itemIndex: -1, animated: true });

                    //this.setState({refetching: false})

                    this.forceUpdate();
                })
                .catch((e) => {
                    this.setState({refetching: false})
                })
        } else {
            this.props.userShifts.refetch()
        }
    }


    renderItem = ({item}) => {
        return(
            <ScheduleCardComponent
                alldata={this.state.sectionData}
                data={item}
                key={item}
                userId={this.props.userid}
            />
            )
    };


    // FORMATS EACH SHIFT FOR VIEW
    formatToListData(node, status) {
        const breakTime = node.unpaidBreakTime;
        const timeH = breakTime? breakTime.split(':')[0] : 0
        const timeM = breakTime? breakTime.split(':')[1] : 0
        const timeS = breakTime? breakTime.split(':')[2] : 0

        const endTime = moment(node.endTime).subtract({hours: timeH, minutes: timeM, seconds: timeS}).format();
        const workingHours = moment(moment(endTime).diff(moment(node.startTime), 'hours', true))//.subtract
        const workingMinutes = moment(moment(endTime).diff(moment(node.startTime), 'minutes', true))//.subtract
        //var position = allPositionsBrandHash[node.positionId];
        //var workplace = allWorkplacesHash[node.workplaceId];
        let wage = node.wage;
        const payment = '$' + (workingHours * wage).toFixed(2);
        let address = node.address ? node.address.split(',') : ['No Address Available'];
        let address1 = '';
        for (let i = 0; i < address.length - 2; i++) {
            i === address.length - 3 ? address1 += address[i] : address1 += address[i] + ','
        }
        const address2 = address.length > 1 ? address[address.length - 2] + ',' + address[address.length - 1] : address[0];

        return {
            shiftId: node.shiftId,
            marketId: node.marketId,
            isFromPhoneTree: false,
            workerResponse: node.workerResponse,
            status: status, start: node.startTime, end: node.endTime,
            // commented fields from aborted scheme - if remove also from query at top of this file
            // bidCutoffDaysBeforeShift: node.workplaceByWorkplaceId.bidCutoffDaysBeforeShift,
            // instantPickupDaysBeforeShift: node.workplaceByWorkplaceId.instantPickupDaysBeforeShift,
            shiftDateCreated: node.shiftDateCreated,
            // biddingPeriodFromCreationDate: node.biddingPeriodFromCreationDate,
            biddingPeriodExpiration: node.biddingPeriodExpiration,
            phoneTreeHasRun: !!node.callMade,
            workersInvited: node.workersInvited, workersAssigned: node.workersAssigned,
            worker: node.workerId,
            workplace: node.workplaceName,
            clockOutDate: node.clockInDate,
            clockInDate: node.clockOutDate,
            addressJson: node.addressJson,
            locationCoor: node.locationJson,
            zipCode: node.zipCode,
            position: node.positionName,
            brand: node.brandName,
            workplaceImageUrl: node.workplaceImageUrl,
            workplacePhoneNumber: node.workplacePhoneNumber,
            payment, address1, address2,
            workplacePhoneNumber: node.workplacePhoneNumber,
            bookedByPhoneTree: node.bookedByPhoneTree,
            bookedByAutoAssign: node.bookedByAutoAssign,
            tentative: node.locked && node.isBooked,
            workingHours: workingHours,
            workingMinutes: workingMinutes,
            hourlyPayment:0.0,
            hourlyWage: wage,
        };
    }

    filterButtonColors() {
        //filter button colors
        this.allSelected = "";
        this.allFont = "";
        this.openSelected = "";
        this.waitingSelected = "";
        this.scheduledSelected = "";
        this.openFont = "";
        this.bookedFont = {color: '#00A863'};
        this.invitedFont = {color: '#FFAD33'};
        this.allCircle = {backgroundColor: "#0022A1"};
        if (this.props.filter === "ALL") {
            this.allSelected = styles.switchSelect;
            this.allFont = styles.switchFont;
            this.allCircle = {backgroundColor: "#FFF"};
        }
        if (this.props.filter === "OPEN") {
            this.openSelected = styles.switchSelect;
            this.openFont = styles.switchFont;
        }
        if (this.props.filter === "INVITED") {
            this.waitingSelected = styles.switchSelect;
            this.invitedFont = styles.switchFont;
        }
        if (this.props.filter === "BOOKED") {
            this.scheduledSelected = styles.switchSelect;
            this.bookedFont = styles.switchFont;
        }
    }

    renderDateSeparator = (text, section) => {
        if ((moment(text).isAfter(moment().subtract(2, 'week').subtract(1, 'day'), 'day'))) {
        return (
            <View style={{
                alignItems: "center",
                width:45*Width,
                height: HEIGHT,
                left:0,
                position: 'absolute',
                // marginTop: section.data[0].noDataAvailable && moment(section.data[0].start).isSame(moment(), 'day') ? 40 : 0,
                backgroundColor: 'rgb(250,250,250)',
            }}>
                <Text style={[styles.h1GrayLato,
                    {
                        lineHeight: 24
                    }]}>{moment(text).format('D').toUpperCase()}</Text>
                <Text style={[styles.h3BlackLato, {
                    lineHeight: 15
                }]}>{moment(text).format('MMM').toUpperCase()}</Text>
                <Text style={[styles.h3GrayLato, {
                    lineHeight: 15
                }]}>{moment(text).format('ddd').toUpperCase()}</Text>
            </View>
        ) } else {
            return (
            <View style={{
                alignItems: "center",
                width:45*Width,
                height: HEIGHT,
                left:0,
                position: 'absolute',
                // marginTop: section.data[0].noDataAvailable && moment(section.data[0].start).isSame(moment(), 'day') ? 40 : 0,
                backgroundColor: 'rgb(250,250,250)',
            }} />)
        }
    }

    changeDate({index, key, item}) {
        const date = item.key;

        /*
        if (date) {
          var currentWeek = moment(date).startOf('week')
          var dayOfWeek = moment(this.state.nextWeekDate).weekday() // get offset
          var currentDay  = currentWeek.add(dayOfWeek, 'days').format() // start of week at header

          let new_date = moment(currentDay).add(1, 'w');
          this.setState({
              currentDate: currentWeek,
              backwardStart: moment(currentDay).startOf('day').format(),
              nextWeekDate: new_date,
          })

        const date = item.key;
        */
        // move the calendar forward when user scrolls past end of week

        if (moment(date).startOf('day').isSameOrAfter(moment(this.state.nextWeekDate).subtract(1, 'd').startOf('day'))) {
            let new_nextWeekDate = moment(this.state.nextWeekDate).add(1, 'w');
            this.setState({
                currentDate: this.state.nextWeekDate,
                backwardStart: this.state.nextWeekDate,
                nextWeekDate: new_nextWeekDate,
            });

            this.forceUpdate();
        }
        // move calendar backwards when user scrolls back before start of week
        else if (moment(date).startOf('day').isSameOrBefore(moment(this.state.backwardStart).subtract(2, 'd').startOf('day'))) {
            let new_date = moment(this.state.backwardStart).subtract(1, 'w');
            this.setState({
                currentDate: new_date,
                backwardStart: new_date,
                nextWeekDate: this.state.backwardStart,
            });
            this.forceUpdate();
        }
    }

    loadMoreOnTop() {
        if(!_.some(this.state.sectionData, {"date":pastData[0].date})){
            oldSectionData = this.state.sectionData;
            this.setState({
                sectionData : pastData.concat(this.state.sectionData),
            },() => {
                this.renderList();
            });
        }

        //this.refetch(true);
    }

    renderFilter = (currentDate) => {
        let new_date = moment(currentDate).add(1, 'w');

        this.setState({
            currentDate: currentDate.startOf('day').format(),
            backwardStart: currentDate.startOf('day').format(),
            nextWeekDate: new_date
        }, () => {
            this.clickManage(currentDate);
        });
    };


    clickManage(date) {

        let iIndex = _.findIndex(this.state.sectionData, function (x) {
            return moment(x.key).format('YYYY MM DD') === moment(date).format('YYYY MM DD');
        })

        if (iIndex === -1) {
            iIndex = sectionData.length - 1;
        }

        this._scrollViewTemp.scrollToLocation({
            itemIndex: 0,
            viewOffset: 0,
            sectionIndex: iIndex
        });

        let new_date = moment(date).add(1, 'w');

        this.setState({
            currentDate: date.startOf('day').format(),
            backwardStart: date.startOf('day').format(),
            nextWeekDate: new_date
        });

        this.forceUpdate();
    }

    render() {
        const data = this.props.userShifts;
        const version = this.props.mobVersion;

        if (!data || data.loading || !data.allUserShiftsMobiles || this.state.refetching) {
            return (
                <View style={{flex: 1, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent/>
                </View>
            )

        }

        if (data.networkStatus === 1) {
            return <ActivityIndicator style={styles.loading}/>;
        }

        if(this.state.appDisabled) {
                const APP_STORE_LINK = 'https://itunes.apple.com/us/app/a-day/id1328528616?mt=8';
                const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.joinaday';
                Alert.alert(
                    'Update Available',
                    'This version of the app is outdated. Please update app from the ' + (Platform.OS === 'ios' ? 'app store' : 'play store') + '.',
                    [
                        {
                            text: 'Update Now', onPress: () => {
                              Linking.canOpenURL(APP_STORE_LINK).then(supported => {
                                if (Platform.OS === 'ios') {
                                    Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
                                }
                                else {
                                    Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
                                }
                              }).catch(err => console.error('An error occurred', err));
                            }
                        },
                    ],
                    {cancelable: false}
                );
        }

        if (data.error) {
            return (
                 <TouchableOpacity style={styles.refetchButton} onClick={() => this.refetch(true)}><Text style={{width:175}}>Bad Internet Connection. Click ADAY logo above to reload shifts. </Text></TouchableOpacity>
            )
        }
        return (
            <View style={{flex: 665 / 667}}>
                <Modal
                    transparent={true}
                    visible={this.props.showTopModal}
                    onRequestClose={this.props.closeModal}
                    animate="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity style={{marginTop: 20, flex: 1}} onPress={this.props.closeModal}>
                                <Image resizeMode="contain"
                                       style={{width: 20, height: 20}}
                                       source={require('./assets/Icons_Exit.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.filterHeader}> Filter Shifts </Text>
                            <View style={{flex: 1}}/>
                        </View>
                        <View style={styles.filterSubtitleContainer}>
                            <Text style={styles.filterSubtitle}> CHOOSE A STATUS TO SEE THE SHIFTS YOU'D LIKE TO
                                VIEW </Text>
                            <View style={{flexDirection: 'row', marginLeft: dWidth(2), marginRight: dWidth(2)}}>
                                <TouchableOpacity style={[styles.switchButton, styles.leftSwitch, this.allSelected]}
                                                  onPress={() => this.props.selectFilter("ALL")}>
                                    <View style={[styles.filterCircle, this.allCircle]}/>
                                    <Text style={[styles.switchFontSize, this.allFont]}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.switchButton, this.scheduledSelected, {borderRightWidth: 0}]}
                                    onPress={() => this.props.selectFilter("BOOKED")}>
                                    <View style={[styles.filterCircle, styles.bookedCircle]}/>
                                    <Text style={[styles.switchFontSize, this.bookedFont, {marginLeft:dWidth(1.5)}]}>Booked</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.switchButton, this.waitingSelected]}
                                                  onPress={() => this.props.selectFilter("PENDING")}>
                                    <View style={[styles.filterCircle, styles.invitedCircle]}/>
                                    <Text style={[styles.switchFontSize, this.invitedFont, {marginLeft:dWidth(1.5)}]}>Pending</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.switchButton, styles.rightSwitch, this.openSelected]}
                                    onPress={() => this.props.selectFilter("OPEN")}>
                                    <View style={[styles.filterCircle, styles.openCircle]}/>
                                    <Text style={[styles.switchFontSize, this.openFont]}>Open</Text>
                                </TouchableOpacity>
                                {/*<TouchableOpacity style={[styles.switchButton, this.waitingSelected]}
                                              onPress={() => this.props.selectFilter("INVITED")}>
                                <View style={[styles.filterCircle, styles.invitedCircle]}/>
                                <Text style={[styles.switchFontSize, this.invitedFont]}>Invited</Text>
                            </TouchableOpacity> */}

                            </View>
                        </View>
                    </View>
                </Modal>

                <CalendarStrip
                    dateNameStyle={styles.dateNameStyle}
                    dateNumberStyle={styles.dateNumberStyle}
                    weekendDateNameStyle={styles.dateNameStyle}
                    weekendDateNumberStyle={styles.dateNumberStyle}
                    calendarHeaderFormat= "MMMM YYYY"
                    //calendarHeaderFormat= {hours}
                    hours={hours}
                    hoursStart={this.state.backwardStart}
                    calendarHeaderStyle={{
                        backgroundColor: 'rgb(0, 0, 166)',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '400',
                        fontFamily: 'Lato-Regular',
                    }}
                    selection='bottomBorder'
                    selectionAnimation={{
                        duration: 0,
                        borderBottomWidth: 5,
                    }}
                    borderHighlightColor={'#FFF'}
                    onDateSelected={(date) => {
                        if (date.isAfter(this.state.sectionData[this.state.sectionData.length-1].key)) {
                            return;
                        }
                        let new_date = moment(date).add(1, 'w');
                        /* seems redundant, as state is set in clickmanage
                        this.setState({
                            backwardStart: date.startOf('day').format(),
                            currentDate: date.startOf('day').format(),
                            nextWeekDate: new_date
                        });*/
                        this.clickManage(date)
                    }}
                    /*onWeekChanged={(date)=> {
                        this.setState({ currentDate: date.startOf('day').format() });
                        this.props.changeDate(date)
                    }}*/

                    selectedDate={(this.state.currentDate)}
                    startingDate={(this.state.currentDate)}
                    calendarColor={'rgb(0, 0, 166)'}
                    iconLeft={require('./assets/left-arrow-white.png')}
                    iconRight={require('./assets/right-arrow-white.png')}
                    useIsoWeekday={false}
                    keepSelectedDateInCenter={true}
                    borderBottomColor={'rgb(225, 45, 35)'}
                    calendarAnimation={{
                        type: 'sequence',
                        duration: 30
                    }}
                    renderFilter={this.renderFilter}
                />
                {this.state.displayList}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    refetchButton: {
        display: 'flex',
        backgroundColor: '#fff',
        height: 75,
        borderRadius: 5,
        flex: 0.41,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
    },
    filterHeader: {
        color: '#0022A1',
        fontWeight: "600",
        fontSize: 18,
        fontFamily: 'Roboto',
        flex: 2,
        textAlign: 'center',
        marginTop: 20
    },
    filterSubtitleContainer: {
        borderTopColor: '#BBB',
        borderTopWidth: 1,
        paddingBottom: 30,
        backgroundColor: '#FFF'
    },
    filterSubtitle: {
        color: '#0022A1',
        alignSelf: 'center',
        fontFamily: 'RobotoCondensed-Regular',
        opacity: 0.8,
        fontSize: 14,
        paddingBottom: 10,
        paddingTop: 15,
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 11,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: '#0022A1',
        borderWidth: 1,
        flex: 1,
        padding: 0,
        flexDirection: 'row',
        height: 28,
    },
    leftSwitch: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderRightWidth: 0,
    },
    rightSwitch: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderLeftWidth: 0,
    },
    filterCircle: {
        width: 10,
        height: 10,
        borderRadius: 100 / 2,
        marginLeft: 6,
    },
    openCircle: {
        backgroundColor: "#e12d23"
    },
    bookedCircle: {
        backgroundColor: "#00A863"
    },
    invitedCircle: {
        backgroundColor: "#FFAD33"
    },
    switchSelect: {
        backgroundColor: "#0022A1"
    },
    switchFont: {
        color: 'white',
    },
    switchFontSize: {
        fontSize: 13,
        textAlign: 'center',
        flex: 1,
        marginRight: 4,
        left: -4,
        backgroundColor: 'transparent'
    },
    dateNameStyle: {
        fontFamily: 'Lato-Regular',
        color: '#FFF',
        fontSize: 12
    },
    dateNumberStyle: {
        fontFamily: 'Lato-Regular',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 20,
        fontWeight: '400',
    },
    lineStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#444',
        flex: 1,
    },
    dateSeparatorText: {
        paddingHorizontal: 15,
        fontSize: 14,
        color: '#444',
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dateSeparatorContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#FFF'
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
});
const ScheduleComponent = compose (
    graphql(userShifts, {
    name: "userShifts",
    options: (ownProps) => {
        return {
            variables: {
                userId: ownProps.userid,
            }
        }
    },
    fetchPolicy: 'network-only',
    }),
    graphql (mobileVersion, {
        name: "mobVersion",
        options: () => {
            return {
                variables: {
                    id: "346883e8-4fd3-48b6-a8af-71c462f0895a"
                }
            }
        }
    })
,
// THE ID IS HARDCODED BECAUSE IT DEPENDS ON THE APP

)(Schedule);
export default ScheduleComponent
