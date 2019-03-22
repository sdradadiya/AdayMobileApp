/* @flow */
import * as React from 'react';

import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Alert,
    AsyncStorage,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {ApolloClient, ApolloProvider, gql, createNetworkInterface,  graphql, compose} from 'react-apollo';
import Drawer from 'react-native-drawer'
import globalStyles from '../../styles';
import moment from 'moment';
import PreferencesComponent from '../PreferencesComponent/PreferencesComponent';
let _constants = require('../../constants');
// changed this to import container rather than '../MyProfileComponent/MyProfileComponent'
// this is consistent with the scene in app.js, which uses the container
import MyProfileComponent from '../../container/MyProfileContainer.js';
import SideMenu from '../SideMenu'
import ScheduleComponent from '../../container/ScheduleContainer'
import SettingsComponent from '../../container/LogOutContainer'
import OpportunitiesComponent from '../../container/OpportunitiesContainer';
import SpinnerComponent from './../SpinnerComponent';
import OpportunityFilter from '../OpportunitiesComponent/OpportunityFilter';
import WorkPlaceComponent from '../WorkplaceComponent/WorkPlace';
import { HEADER_COLOR } from '../../constants';
import OpportunitiesList from '../OpportunitiesComponent/OpportunitiesList';
//import {Tracker} from '../../constants';
import InitViewInstruction from "../InitViewInstruction";
let {
    height,
    width
} = Dimensions.get('window');

import { numBumpActionsNeeded } from './AccountQueries.js';
/**
 * Page is the parent component that maintains the schedule screen, and strictly contains the header -- also, handles control of the sidebar menu
 * You can find the filter, calendar strip, and
 * @since February 2017
 * @author Vardan
 */
class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterState: "ALL",
            currentTab: 'SCHEDULE',
            component: '',
            shiftStart: moment().startOf('day').format(),
            shiftEnd: moment().endOf('day').format(),
            showMenu: false,
            shiftIcon: require('../assets/BlueShifts.png'),
            shiftBorderColor: "#0022A1",
            showTopModal: false,
            tab: 0,
            showFilter: false,
            showInit: false,
        };
        AsyncStorage.getItem("initMenu").then((val)=>{this.setState({showInit:val?false:true})});
        if (this.props.tab) {
            this.state.currentTab = this.props.tab;
        }
        this.onChangeTabs = this.onChangeTabs.bind(this);
        this.goTo = this.goTo.bind(this);
        this.openTopMenu = this.openTopMenu.bind(this);
        this.closeTopMenu = this.closeTopMenu.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.initGotIt = this.initGotIt.bind(this);

        //Tracker.trackScreenView("Account");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo.allUsers && !this.state.foundId) {
            this.setState({foundId: true},  () => {
                const user = nextProps.userInfo.allUsers.edges[0].node
                const userid = user.id
                const email = user.userEmail
                const phoneNumber = user.userPhoneNumber
                this.props.actions.saveId(userid);
                this.props.actions.saveContactInfo({
                    phoneNumber,
                    email
                });
                // save corporationId
                let employees = this.props.userInfo.allUsers.edges[0].node.employeesByUserId.edges;
                if (employees) {
                    AsyncStorage.setItem("corporationId", employees[0].node.corporationId);
                }
            })
        }
    }

    //shouldComponentUpdate(nextProps, nextState){
    //    return nextProps != this.props || this.state != nextState // || !nextProps.userInfo.loading
    //}

    onChangeTabs(tab) {
        this._drawer.close()
        if (tab === 0) {
            this.setState({currentTab: 'SCHEDULE'})
        }
        if (tab === 1) {
            this.setState({currentTab: 'OPPORTUNITIES'})
        }
        if (tab === 2) {
            this.setState({currentTab: 'PROFILE'})
        }
        if (tab === 3) {
            this.setState({currentTab: 'PREFERENCES'})
        }
        if (tab === 4) {
            this.setState({currentTab: 'SETTINGS'})
        }
        if (tab === 5) {
            this.setState({currentTab: 'WORKPLACE'})
        }

    }

    openTopMenu() {
        this.setState({showTopModal: true})
    }

    closeTopMenu() {
        this.setState({showTopModal: false})
    }

    selectFilter(filter) {
        this.closeTopMenu()
        this.setState({filterState: filter})

        if ( filter === "ALL"){
            this.setState({
                shiftIcon: require('../assets/BlueShifts.png'),
                shiftBorderColor: "#0022A1"
            });
        }
        if ( filter === "OPEN"){
            this.setState({
                shiftIcon: require('../assets/GreenShifts.png'),
                shiftBorderColor: "#00A863"
            });
        }
        if ( filter === "PENDING"){
            this.setState({
                shiftIcon: require('../assets/YellowShifts.png'),
                shiftBorderColor: "#FFAD33"
            });
        }
        if ( filter === "INVITED"){
            this.setState({
                shiftIcon: require('../assets/YellowShifts.png'),
                shiftBorderColor: "#FFAD33"
            });
        }
        if ( filter === "BOOKED"){
            this.setState({
                shiftIcon: require('../assets/RedShifts.png'),
                shiftBorderColor: "#E33821"
            });
        }
    }

    changeDate(date){
        //const dayStart = date.startOf('day').format();
        //const dayEnd = date.endOf('day').format();
        //this.setState({shiftStart: dayStart, shiftEnd: dayEnd});
    }

    goTo() {
        if (this.state.tab === 0) {
            Actions.AddNotification({})
        } else if (this.state.tab === 1) {
            Actions.MyEmployee({})
        } else {
            return
        }
    }

    /**
     * Returns the drop down menu featuring the filter for opportunities
     */
    toggleFilter() {
        const status = this.state.showFilter;
        this.setState({
            showFilter: !status
        });
    }
    initGotIt()
    {
        this.setState({
            showInit: false
        });
        AsyncStorage.setItem("initMenu", "false");
    }

    renderFilterIcon(){
        const filter=this.state.filterState;
        if ( filter === "ALL"){
            return(
                <View style={styles.circleView}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.circleDotStyle, {backgroundColor: '#00A863'}]}/>
                        <View style={[styles.circleDotStyle, {backgroundColor: '#FFAD33'}]}/>
                        <View style={[styles.circleDotStyle, {backgroundColor: '#E33820'}]}/>
                    </View>
                    <Text style={styles.filterText}>FILTER</Text>
                </View>
            );
        }
        if ( filter === "OPEN"){
            return(
                <View style={styles.circleView}>
                    <View
                        style={{flexDirection: 'row'}}
                    >
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: 'transparent'}]}
                        />
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: 'transparent'}]}
                        />
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: '#E33820'}]}
                        />

                    </View>
                    <Text style={styles.filterText}>FILTER</Text>
                </View>
            );
        }
        if ( filter === "PENDING"){
            return(
                <View style={styles.circleView}>
                    <View
                        style={{flexDirection: 'row'}}
                    >
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: 'transparent'}]}
                        />
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: '#FFAD33'}]}
                        />
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: 'transparent'}]}
                        />

                    </View>
                    <Text style={styles.filterText}>FILTER</Text>
                </View>
            );
        }

        if ( filter === "BOOKED"){
            return(
                <View style={styles.circleView}>
                    <View
                        style={{flexDirection: 'row'}}
                    >
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: '#00A863'}]}
                        />
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: 'transparent'}]}
                        />
                        <View
                            style={[styles.circleDotStyle, {backgroundColor: 'transparent'}]}
                        />

                    </View>
                    <Text style={styles.filterText}>FILTER</Text>
                </View>
            );
        }
    }

    onClick() {
        this.child && this.child.refetch("true") // undefined
    }


    onTodayIconClick = () => {
        const date=new Date();
        this.child.clickManage(moment(date));
    }

    render() {
        if (!this.props.userInfo.error && !this.props.numBumpActionsNeeded.error) {
        if (this.props.userInfo.loading || this.state.isLoading) {
            return (
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent />
                </View>
            )
        }
        const user = this.props.userInfo.allUsers.edges[0].node
        const userid = user.id
        const menu = <SideMenu onChangeTabs={this.onChangeTabs} firstName={user.firstName} lastName={user.lastName}
                               avatar={user.avatarUrl}/>;

        const {
            showFilter,
            showInit,
        } = this.state;

        let numBumpActionsNeeded = this.props.numBumpActionsNeeded.numBumpActionsNeeded;
       
        return (
            <Drawer
                type="overlay"
                content={menu}
                tapToClose={true}
                openDrawerOffset={0.55}
                ref={(ref) => this._drawer = ref}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
            >
                <View style={styles.container}>

                    {/*Source: globals*/}
                    {(Platform.OS === 'ios') ? <View style={{height: (_constants.isIphoneX() ? 40 : 20),backgroundColor: HEADER_COLOR}} /> : <View style={{height:0, backgroundColor :HEADER_COLOR}} />}

                    {/**/}

                    {
                        (this.state.currentTab !== "WORKPLACE") &&

                        <View style={[styles.headerContainer,(this.state.currentTab === "WORKPLACE")&& {backgroundColor:'white'}]}>
                        <View style={{flex: 55/375}}>
                            <TouchableOpacity style={{flex: 1, justifyContent:"center"}} onPress={() => {this._drawer.open()}}>
                                <Image style={styles.avatarStyle} source={{uri: user.avatarUrl + "?" + new Date().getTime()}}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 55/375}}>
                            { this.state.currentTab === "SCHEDULE" &&
                            <TouchableOpacity onPress={this.openTopMenu} style={{justifyContent:'center',alignItems: 'center', flex: 1}}>
                                {this.renderFilterIcon()}
                            </TouchableOpacity>
                            }
                        </View>

                        <View style={{flex: 145/375}}>
                            <TouchableOpacity
                                style={{justifyContent:'center',alignItems: 'center', flex: 1}}
                                onPress={this.onClick.bind(this)}>
                                <Image style={{ width: 35, resizeMode: 'contain' }} source={require('./../assets/logos/app_logo.png')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 55/375}}>
                            {
                                this.state.currentTab === "OPPORTUNITIES" &&
                                <TouchableOpacity style={{marginRight: 15}} onPress={() => Actions.OpportunitiesLocation({})}>
                                    <Image style={{width: 18, height: 28}}
                                           source={require('../assets/locationIcon.png')}/>
                                </TouchableOpacity>
                            }

                            {

                                this.state.currentTab == "SCHEDULE" &&
                                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
                                                  onPress={this.onTodayIconClick}>
                                    <Image style={{width: 27, height: 27}}
                                           source={require('../assets/icons/today-icon.png')}/>
                                </TouchableOpacity>

                            }

                        </View>

                        <View style={{flex: 55/375, width:"100%"}}>
                            { this.state.currentTab === "SCHEDULE" &&

                            <TouchableOpacity
                                onPress={() => Actions.SchedulingOptions({
                                    userId: userid,
                                    email: this.props.email,
                                    isfromCalendar: false,
                                    numBumpActionsNeeded: numBumpActionsNeeded
                                })}
                                style={{justifyContent:'center',alignItems: 'center', flex: 1, flexDirection: 'row'}}>
                                <Image style={{width: 27, height: 27}} source={require('../assets/icons/menu.png')}/>

                                {/* alert for number of actions needed */}
                                {numBumpActionsNeeded > 0 && // icon for requests that need accept/reject
                                 <View style={styles.actionNeededStyle}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        {numBumpActionsNeeded}
                                    </Text>
                                 </View>
                                }
                            </TouchableOpacity>
                            }
                            {
                                this.state.currentTab === "OPPORTUNITIES" &&
                                <TouchableOpacity onPress={()=>this.toggleFilter()}>
                                    <Image style={{width: 28, height: 27}}
                                           source={require('../assets/searchIcon.png')}/>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    ||
                        <View style={[styles.headerContainer,{justifyContent:'space-between',backgroundColor:'white',borderBottomColor: 'white',}]}>
                            <View style={{flex: .2}}>
                                <TouchableOpacity style={{flex: 1, justifyContent:"center"}} onPress={() => {this._drawer.open()}}>
                                    <Image style={styles.avatarStyle} source={{uri: user.avatarUrl + "?" + new Date().getTime()}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:.4}}>
                                <Text style={styles.headerStyle}>My Workplace</Text>
                            </View>
                            <View style={{flex:.2}}/>
                        </View>
                    }


                    { this.state.currentTab == "SCHEDULE" &&
                    <ScheduleComponent onRef={ref => (this.child = ref)}
                                       showTopModal={this.state.showTopModal}
                                       closeModal={this.closeTopMenu}
                                       filter={this.state.filterState}
                                       selectFilter={this.selectFilter}
                                       calendarBorderColor={this.state.shiftBorderColor}
                                       changeDate={this.changeDate}
                                       refetchCall={this.onClick.bind(this)}
                                       userid={userid}
                                       start={this.state.shiftStart}
                                       end={this.state.shiftEnd}
                    />
                    }

                    { this.state.currentTab === "WORKPLACE" &&
                    <WorkPlaceComponent corporationId={this.props.userInfo.allUsers.edges[0].node.employeesByUserId.edges[0].node.corporationId}
                                        userId={this.props.userInfo.allUsers.edges[0].node.id}
                                        primaryWorkplace={this.props.userInfo.allUsers.edges[0].node.employeesByUserId.edges[0].node.primaryWorkplace}
                        />
                    }

                    { this.state.currentTab === "PROFILE" &&
                    <MyProfileComponent/>
                    }
                    { this.state.currentTab === "SETTINGS" &&
                    <SettingsComponent userId={userid}/>
                    }
                    { this.state.currentTab === "PREFERENCES" &&
                    <PreferencesComponent/>
                    }
                    { this.state.currentTab === "OPPORTUNITIES" &&
                    <OpportunitiesComponent/>
                    }
                </View>
                { showFilter &&
                <OpportunityFilter toggleFilter={this.toggleFilter}/>
                }
                {showInit && <InitViewInstruction initGotIt={this.initGotIt}/>}
        </Drawer>
        );
        } else {
            Alert.alert('ADay', 'Your Request Couldn\'t Be Completed');
            return null
        }
    };
}
const userInfo = gql
    `query userInfo($email: String!){
        allUsers(condition: { userEmail: $email }){
             edges{
                node{
                  id
                  firstName
                  lastName
                  avatarUrl
                  userEmail
                  userPhoneNumber
                  employeesByUserId{
                    edges{
                      node{
                        id
                        primaryWorkplace
                        corporationId
                        accessesByEmployeeId{
                          nodes{
                            brandId
                          }
                        }
                      }
                    }
                  }
                }
            }
    }
}`

const AccountComponent = compose(
    graphql(userInfo, {
        name: "userInfo",
        options: (ownProps) => {
            return {
                variables: {
                    email: ownProps.email || ownProps.store.myProfile.email// || "test@example.com",
                }
            }
        }}),
    graphql(numBumpActionsNeeded, {
        name: "numBumpActionsNeeded",
        options: (ownProps) => {
            return {
                variables: {
                    // wait till first query fetches userid, then run this query
                    userIdParam: (ownProps.userInfo && ownProps.userInfo.allUsers && ownProps.userInfo.allUsers.edges[0]) ?
                                 ownProps.userInfo.allUsers.edges[0].node.id : '4907e067-e770-4bc8-a0b6-2a3bea788a46',
                }
            }
        }})
)(Account)

export default AccountComponent

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, backgroundColor: '#FFFFFF' },
    main: { paddingLeft: 0 },
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'flex-start',
        //alignItems: 'center',
        backgroundColor: '#F7F7F7',
        flex: 1,
    },
    headerContainer: {
        height: (_constants.isIphoneX() ? 70 : 44), // standard ios height - width 96 of the left component
        flexDirection: 'row',
        backgroundColor: HEADER_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 1,
    },
    headerHamburgerIcon: {
        width: 30,
        height: 30,
    },
    avatarStyle: {
        width: 30,
        height: 30,
        alignSelf:"center",
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
    },
    circleView: {
        justifyContent: 'center', alignItems: 'center', flex: 0.003
    },
    circleDotStyle: {
        marginHorizontal: 1,
        height: 9,
        width: 9,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    filterText: {
        fontSize: 10, color: '#fff', marginTop: 2
    },
    actionNeededStyle: {
        backgroundColor: '#E33821',
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: -10
    },
    headerStyle: {
        textAlign:'center',
        fontFamily: 'Lato',
        fontSize:22,
        fontWeight:'400'
    }
});

