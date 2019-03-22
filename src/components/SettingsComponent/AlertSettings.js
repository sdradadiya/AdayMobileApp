/**
 * Created by Vardan on 6/29/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Switch, Alert,AsyncStorage
} from 'react-native';
import {
    gql,
    graphql
} from 'react-apollo';
import {
    compose
} from 'react-apollo';
import DatePicker from 'react-native-datepicker';
import SpinnerComponent from './../SpinnerComponent';
import {Input} from 'native-base';
//import {Tracker} from "../../constants/index";
let localData = null;

class AlertSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assignedId: null,
            assignedPush: false,
            assignedEmail: false,
            updatesId: null,
            updatesPush: false,
            updatesEmail: false,
            cancellationsId: null,
            cancellationsPush: false,
            cancellationsEmail: false,
            cancellationsPhone: false,
            newShiftsId: null,
            newShiftsPush: false,
            newShiftsEmail: false,
            newShiftsPhone: false,
            newShiftsTextMessage: false,
            isSnoozedId: null,
            isSnoozed: false,
            snoozingStartTime: null,
            snoozingEndTime: null,
        };
    }

    componentWillMount() {
        if(localData){
            this.state = localData;
        }
    }

    componentWillUnmount(){
        localData = this.state;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.loading && nextProps.data.loading !== this.props.data.loading) {
            if(nextProps.data.allUserNotifications && nextProps.data.allUserNotifications.edges.length > 0) {

                nextProps.data.allUserNotifications.edges.map((notification) => {
                    let node = notification.node;
                    switch (node.action) {
                        case 'SHIFT_UPDATED':
                            this.setState({
                                updatesId: node.id,
                                updatesPush: node.push,
                                updatesEmail: node.email,
                            });
                            break;

                        case 'SHIFT_CREATED':
                            this.setState({
                                assignedId: node.id,
                                assignedPush: node.push,
                                assignedEmail: node.email,
                            });
                            break;

                        case 'SHIFT_DELETED':
                            this.setState({
                                cancellationsId: node.id,
                                cancellationsPush: node.push,
                                cancellationsEmail: node.email,
                                cancellationsPhone: node.call
                            });
                            break;

                        case 'OPEN_SHIFT':
                            this.setState({
                                newShiftsId: node.id,
                                newShiftsPush: node.push,
                                newShiftsEmail: node.email,
                                newShiftsPhone: node.call,
                                newShiftsTextMessage: node.text,
                            });
                            break;
                        case 'PHONE_SNOOZED':
                            this.setState({
                                isSnoozedId: node.id,
                                isSnoozed: node.isSnoozed,
                                snoozingStartTime: node.snoozingStartTime,
                                snoozingEndTime: node.snoozingEndTime,
                            });
                            break;

                    }
                })
            }
        }
    }

    updateDb = (name) => {
        let userId = this.props.userId;
        let id = '';
        let state = '';

        switch(name) {
            case 'newShiftsEmail':
                id = this.state.newShiftsId;
                state = !this.state.newShiftsEmail;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'OPEN_SHIFT', 'email': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'email': state}});
                }

                this.setState({newShiftsEmail: state});
                break;

            case 'newShiftsPhone':
                id = this.state.newShiftsId;
                state = !this.state.newShiftsPhone;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'OPEN_SHIFT', 'call': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'call': state}});
                }

                this.setState({newShiftsPhone: state});
                break;

            case 'newShiftsPush':
                id = this.state.newShiftsId;
                state = !this.state.newShiftsPush;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'OPEN_SHIFT', 'push': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'push': state}});
                }

                this.setState({newShiftsPush: state});
                break;

            case 'newShiftsTextMessage':
                id = this.state.newShiftsId;
                state = !this.state.newShiftsTextMessage;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'OPEN_SHIFT', 'text': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'text': state}});
                }

                this.setState({newShiftsTextMessage: state});
                break;

            case 'updatesEmail':
                id = this.state.updatesId;
                state = !this.state.updatesEmail;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'SHIFT_UPDATED', 'email': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'email': state}});
                }

                this.setState({updatesEmail: state});
                break;

            case 'updatesPush':
                id = this.state.updatesId;
                state = !this.state.updatesPush;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'SHIFT_UPDATED', 'push': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'push': state}});
                }

                this.setState({updatesPush: state});
                break;

            case 'assignedEmail':
                id = this.state.assignedId;
                state = !this.state.assignedEmail;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'SHIFT_CREATED', 'email': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'email': state}});
                }

                this.setState({assignedEmail: state});
                break;

            case 'assignedPush':
                id = this.state.assignedId;
                state = !this.state.assignedPush;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'SHIFT_CREATED', 'push': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'push': state}});
                }

                this.setState({assignedPush: state});
                break;

            case 'cancellationsEmail':
                id = this.state.cancellationsId;
                state = !this.state.cancellationsEmail;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'SHIFT_DELETED', 'email': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'email': state}});
                }

                this.setState({cancellationsEmail: state});
                break;

            case 'cancellationsPhone':
                id = this.state.cancellationsId;
                state = !this.state.cancellationsPhone;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'SHIFT_DELETED', 'call': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'call': state}});
                }

                this.setState({cancellationsPhone: state});
                break;

            case 'cancellationsPush':
                id = this.state.cancellationsId;
                state = !this.state.cancellationsPush;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'SHIFT_DELETED', 'push': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'push': state}});
                }

                this.setState({cancellationsPush: state});
                break;

            case 'isSnoozed':
                id = this.state.isSnoozedId;
                state = !this.state.isSnoozed;

                if(!id){
                    this.executeCreateActions({'UserNotificationInput': {'userId': userId, 'action': 'PHONE_SNOOZED', 'isSnoozed': state}})
                }
                else {
                    this.executeUpdateActions({'id': id, 'userNotificationPatch': {'isSnoozed': state}});
                }

                this.setState({isSnoozed: state});
                break;
        }
    };

    updateTimeDb = (time) => {
        let id = this.state.isSnoozedId;
        if (time['startTime']) {
            this.executeUpdateActions({'id': id, 'userNotificationPatch': {'snoozingStartTime': time['startTime']}});
            AsyncStorage.getItem('email').then((value)=>{
                //Tracker.trackEvent(value, "Change Snooze Start Settingsn");
            }).catch((err)=>{
                //Tracker.trackEvent("Not Define", "Change Snooze Start Settings");
            });

            this.setState({snoozingStartTime: time['startTime'] })
        } else if (time['endTime']) {
            this.executeUpdateActions({'id': id, 'userNotificationPatch': {'snoozingEndTime': time['endTime'] }});
            AsyncStorage.getItem('email').then((value)=>{
                //Tracker.trackEvent(value, "Change Snooze End Settings");
            }).catch((err)=>{
                //Tracker.trackEvent("Not Define", "Change Snooze End Settings");
            });

            this.setState({snoozingEndTime: time['endTime'] })
        }
    };

    executeCreateActions = (action) => {
        this.props.createUserNotification({
            variables: action
        })
            .then((response) => {
                let action = response.data.createUserNotification.userNotification.action;
                let id = response.data.createUserNotification.userNotification.id;

                switch (action) {
                    case 'SHIFT_UPDATED':
                        this.setState({updatesId: id});
                        break;

                    case 'SHIFT_CREATED':
                        this.setState({assignedId: id});
                        break;

                    case 'SHIFT_DELETED':
                        this.setState({cancellationsId: id});
                        break;

                    case 'OPEN_SHIFT':
                        this.setState({newShiftsId: id});
                        break;

                    case 'PHONE_SNOOZED':
                        this.setState({isSnoozedId: id});
                        break;

                }
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
            });
    };


    executeUpdateActions = (action) => {
        this.props.updateUserNotificationById({
            variables: action
        })
            .then((response) => {
                AsyncStorage.getItem('email').then((value)=>{
                    //Tracker.trackEvent(value, "Update User Notification");
                }).catch((err)=>{
                    //Tracker.trackEvent("Not Define", "Update User Notification");
                })
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
            });
    };

    render() {
        if (this.props.data.loading){
            return (
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{marginBottom:40}}>
                        <Text style={styles.sectionName}>Shifts</Text>
                        <Text style={styles.groupName}>Assigned</Text>
                        <Text style={styles.groupDescription}>When a manager assigns you to a shift</Text>
                        <View style={{backgroundColor:"#FFF"}}>
                            <View style={styles.dividerLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Push</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('assignedPush')}
                                    value = {this.state.assignedPush}/>
                            </View>

                            <View style={styles.dividerMiddleLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Email</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('assignedEmail')}
                                    value = {this.state.assignedEmail}/>
                            </View>

                            <View style={styles.dividerLine}/>
                        </View>
                        <Text style={styles.groupName}>Updates</Text>
                        <Text style={styles.groupDescription}>When a manager updates a shift that you're scheduled to work</Text>
                        <View style={{backgroundColor:"#FFF"}}>

                            <View style={styles.dividerLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Push</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('updatesPush')}
                                    value = {this.state.updatesPush}/>
                            </View>

                            <View style={styles.dividerMiddleLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Email</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('updatesEmail')}
                                    value = {this.state.updatesEmail}/>
                            </View>

                            <View style={styles.dividerLine}/>
                        </View>

                        <Text style={styles.groupName}>Cancellations</Text>
                        <Text style={styles.groupDescription}>When a manager cancels a shift you're scheduled to work</Text>
                        <View style={{backgroundColor:"#FFF"}}>

                            <View style={styles.dividerLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Push</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('cancellationsPush')}
                                    value = {this.state.cancellationsPush}/>
                            </View>

                            <View style={styles.dividerMiddleLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Email</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('cancellationsEmail')}
                                    value = {this.state.cancellationsEmail}/>
                            </View>

                            <View style={styles.dividerMiddleLine}/>
                        </View>
                        <View style={styles.checkboxRowContainer}>
                            <Text style={styles.checkboxName}>Phone</Text>
                            <Switch
                                onValueChange = {(checked) => this.updateDb('cancellationsPhone')}
                                value = {this.state.cancellationsPhone}/>
                        </View>

                        <View style={styles.dividerLine}/>
                        <View style={[styles.dividerLine,{marginTop:20, borderBottomWidth:1}]}/>

                        <Text style={styles.sectionName}>Schedule</Text>
                        <Text style={styles.groupName}>New Shifts</Text>
                        <Text style={styles.groupDescription}>When a manager posts a new shift to the schedule</Text>
                        <View style={{backgroundColor:"#FFF"}}>

                            <View style={styles.dividerLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Push</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('newShiftsPush')}
                                    value = {this.state.newShiftsPush}/>
                            </View>

                            <View style={styles.dividerMiddleLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Email</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('newShiftsEmail')}
                                    value = {this.state.newShiftsEmail}/>
                            </View>

                            <View style={styles.dividerMiddleLine}/>
                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Phone</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('newShiftsPhone')}
                                    value = {this.state.newShiftsPhone}/>
                            </View>

                            <View style={{marginLeft:15, borderBottomColor:'lightgray', borderBottomWidth:1}}>
                            </View>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Text Message</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('newShiftsTextMessage')}
                                    value = {this.state.newShiftsTextMessage}/>
                            </View>

                            <View style={styles.dividerLine}/>
                        </View>

                        <Text style={styles.groupName}>Phone Tree</Text>
                        <View style={{backgroundColor:"#FFF"}}>

                            <View style={styles.dividerLine}/>
                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Snooze Phone Calls</Text>
                                <Switch
                                    onValueChange = {(checked) => this.updateDb('isSnoozed')}
                                    value = {this.state.isSnoozed}/>
                            </View>
                            <View style={styles.dividerLine}/>
                        </View>

                        <Text style={[styles.groupDescription, {marginTop: 10}]}>Do not call me between the following times.</Text>

                        <View style={{opacity: !this.state.isSnoozed ? 0.4 : 1}}>

                            <View style={styles.dividerLine}/>

                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>Begin Snooze</Text>
                                <DatePicker
                                    date={this.state.snoozingStartTime}
                                    mode="time"
                                    format="h:mm a"
                                    confirmBtnText="Done"
                                    cancelBtnText="Cancel"
                                    is24Hour={false}
                                    customStyles={{
                                        dateInput: {
                                            alignItems: 'flex-end',
                                            borderWidth:0
                                        },
                                        dateIcon: {
                                            width:0,
                                        },
                                        dateText: {
                                            color: '#333',
                                            fontSize:15
                                        },
                                    }}
                                    onDateChange={(time) => {
                                        this.updateTimeDb({startTime: time})
                                    }}
                                />
                            </View>
                            <View style={styles.dividerMiddleLine}/>
                            <View style={styles.checkboxRowContainer}>
                                <Text style={styles.checkboxName}>End Snooze</Text>
                                <DatePicker
                                    date={this.state.snoozingEndTime}
                                    mode="time"
                                    format="h:mm a"
                                    confirmBtnText="Done"
                                    cancelBtnText="Cancel"
                                    is24Hour={false}
                                    customStyles={{
                                        dateInput: {
                                            alignItems: 'flex-end',
                                            borderWidth:0
                                        },
                                        dateIcon: {
                                            width:0,
                                        },
                                        dateText: {
                                            color: '#333',
                                            fontSize:15
                                        },
                                    }}
                                    onDateChange={(time) => {
                                        this.updateTimeDb({endTime: time})
                                    }}
                                />
                            </View>

                            <View style={styles.dividerLine}/>
                            <Text style={[styles.groupDescription, {backgroundColor:'transparent', color:'red',
                                marginTop: 10}]}>Snoozing a phone call may be equivalent to refusing a shift, speak to a manager</Text>

                            {!this.state.isSnoozed ?
                                <View style={{top:0, left:0, right:0, bottom:0,
                                    backgroundColor:'transparent', position: 'absolute', }} />
                                : <View style={{backgroundColor:'transparent'}}/> }

                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}


const allUserNotifications = gql `
 query allUserNotifications( $userId: Uuid! ){
  allUserNotifications(condition: { userId: $userId }){
      edges{
        node{
            id
            userId
            email
            push
            text
            call
            action
            isSnoozed
            snoozingStartTime
            snoozingEndTime
        }
    }
  }
}`;

const updateUserNotificationById = gql`
    mutation updateUserNotificationById($id: Uuid!, $userNotificationPatch: UserNotificationPatch!) {
        updateUserNotificationById(input:{id: $id, userNotificationPatch: $userNotificationPatch}) {
            userNotification {
                id
                userId
                email
                push
                text
                call
                action
                isSnoozed
                snoozingStartTime
                snoozingEndTime
            }
        }
    }`;


const createUserNotification = gql`
    mutation createUserNotification($UserNotificationInput: UserNotificationInput!) {
        createUserNotification(input: {userNotification: $UserNotificationInput}) {
            userNotification {
                id
                action
            }
        }
    }`;

export default compose(
    graphql(allUserNotifications, {
        options: (ownProps) => {
            return {
                variables: {
                    userId: ownProps.userId,
                }
            }
        }
    }),
    graphql(createUserNotification, {
        name: 'createUserNotification'
    }),
    graphql(updateUserNotificationById, {
        name: 'updateUserNotificationById'
    })
)(AlertSettings);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: 10
    },
    checkBox: {
        width: 45,
        height: 20
    },
    sectionName: {
        fontFamily: 'RobotoCondensed-Regular',
        paddingHorizontal: 20,
        marginTop: 5,
        color: '#172434',
        fontSize: 17
    },
    groupName: {
        paddingHorizontal: 20,
        paddingVertical:5,
        marginTop: 10,
        marginBottom: 5,
        color: '#0022A1',
        fontWeight: 'bold'
    },
    groupDescription: {
        paddingHorizontal: 20,
        //marginVertical: 5,
        marginBottom:10,
        color: '#8E9091'
    },
    checkboxName: {
        backgroundColor:'transparent',
        marginVertical: 8,
        color: '#172434'
    },
    checkboxRowContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:5
    },
    dividerLine: {
        borderBottomColor:'lightgray',
        borderBottomWidth:1
    },
    dividerMiddleLine: {
        marginLeft:15,
        borderBottomColor:'lightgray',
        borderBottomWidth:1
    }
});
