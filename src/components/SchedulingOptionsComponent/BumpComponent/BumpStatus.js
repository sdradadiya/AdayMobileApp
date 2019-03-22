import React,{Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ActionSheetIOS,
    Platform,
    Alert,
} from 'react-native';
import {
    compose,
    graphql,
} from 'react-apollo';
import {Actions} from 'react-native-router-flux';

import moment from 'moment';

import { deleteBumpMutation } from './BumpResolvers'

class BumpStatus extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            bumps: [],
        }
    }

    componentWillMount() {
        this.updateBumps(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.updateBumps(nextProps);
    }

    updateBumps = (nextProps) => {
        if (nextProps.bumpsQuery.allBumps){
            // filter current and future bump requests
            let bumps = nextProps.bumpsQuery.allBumps.nodes;
            bumps = bumps.filter((bump) => (moment(bump.weekPublishedByWeekPublishedId.start).isSameOrAfter(moment())));
            bumps.sort((a, b) => {
                return moment(a.weekPublishedByWeekPublishedId.start).isBefore(b.weekPublishedByWeekPublishedId.start) ? -1 : 1;
            })
            // only take the most recent row from those referring to the same week
            let filtered_bumps = bumps[0] ? [bumps[0]] : [];
            bumps.map((bump) => {
                let prev = filtered_bumps[filtered_bumps.length - 1];
                if (bump.weekPublishedByWeekPublishedId.start === prev.weekPublishedByWeekPublishedId.start) {
                    if (bump.cycleNum != null && prev.cycleNum != null && bump.cycleNum > prev.cycleNum) {
                        // could also compare timeCreated here, but shouldn't be necessary
                        filtered_bumps[filtered_bumps.length - 1] = bump;
                    }
                }
                else {
                    filtered_bumps.push(bump);
                }
            })
            this.setState({
                bumps: filtered_bumps
            });
        }
    }

    withdraw = (id) => {
        this.props.deleteBump({
            variables: {id: id},
            updateQueries: {
                bumpsQuery: (previousQueryResult, {
                    mutationResult
                }) => {
                    const newBumps = [];
                    previousQueryResult.allBumps.nodes.map((value) => {
                        if (value.id !== mutationResult.data.deleteBumpById.bump.id) {
                            newBumps.push(value);
                        }
                    });
                    previousQueryResult.allBumps.nodes = newBumps;
                    return {
                        allBumps: previousQueryResult.allBumps
                    };
                },
            }
        });
    }

    render(){
        // Display any errors
        if (this.props.bumpsQuery.error) {
            return <Text>Error! {this.props.bumpsQuery.error.message}</Text>;
        }
        // Display loader while fetching data
        if (this.props.bumpsQuery.loading) {
            return (<View>
                        <Text> Loading... </Text>
                    </View>);
        }

        return(
            <ScrollView>
                {this.state.bumps.length === 0 && <Text> No Bumps </Text>}
                {this.state.bumps.map((bump, index) => {
                    let isPending = bump.bidLineId === null && (!bump.cycleNum || bump.cycleNum === 0);
                    let bidLine = bump.bidLineByBidLineId;
                    // Determine graphics for this card based on status
                    let statusColor = '';
                    let statusText = '';
                    let actionNeeded = false;
                    if (isPending) {
                        statusColor = 'rgb(255,171,68)';
                        statusText = 'PENDING';
                    } else if (bump.rejected) {
                        statusColor = 'rgb(232,49,43)';
                        statusText = 'DECLINED'
                    } else if (bidLine && bidLine.finalUserId === bump.userId) {
                        statusColor = 'rgb(0,167,101)';
                        statusText = 'SUCCESS'
                    } else {
                        statusColor = 'rgb(127,211,177)';
                        statusText = 'TENTATIVE';
                        actionNeeded = bump.rejected == null;
                    }

                    let bumpPositionText = 'N/A';
                    if (bump.positionByPositionDesired && bump.positionByPositionDesired.positionName) {
                      bumpPositionText = bump.positionByPositionDesired.positionName;
                    }
                    else if (bump.bumpAnyPosition) {
                      bumpPositionText = 'Any Position';
                    }

                    return(
                    <TouchableOpacity onPress={() => {
                        // Determine action of this card based on status
                        if(isPending) {
                            // Pending => offer withdraw
                            if(Platform.OS === "ios") {
                                ActionSheetIOS.showActionSheetWithOptions({
                                        title: 'Delete this bump request?',
                                        options: ['Cancel', 'Withdraw Bump Request'],
                                        destructiveButtonIndex: 1,
                                        cancelButtonIndex: 0,
                                    },
                                    (buttonIndex) => {
                                        if (buttonIndex === 1)
                                            this.withdraw(bump.id);
                                    });
                            }
                            else if(Platform.OS === "android")
                            {
                                Alert.alert(
                                    '',
                                    'Delete this bump request?',
                                    [
                                        {text: 'Cancel', style: 'cancel'},
                                        {text: 'Withdraw Bump Request',
                                         onPress: () => this.withdraw(bump.id)},
                                    ],
                                    { cancelable: false }
                                )
                            }
                        }
                        // Rejected => nothing
                        else if (bump.rejected) {
                            // go to calendar on that week to view open shifts (?)
                            Actions.Account({tab: 'SCHEDULE'});
                        }
                        // Tentative/Success => see details
                        else {
                            Actions.BumpDetails({bump: bump})
                        }
                    }} style={styles.containerStyle}>
                        <View style={{ marginTop: 13, marginLeft: 18, marginRight: 18, marginBottom: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'darkblue', fontSize: 16 }}>
                                    Week Starting, {moment(bump.weekPublishedByWeekPublishedId.start).format('MMM DD, YYYY')}
                                </Text>
                                {actionNeeded && // icon for requests that need accept/reject
                                 <View style={styles.actionNeededStyle}><Text style={{ color: 'white', fontWeight: 'bold' }}>!</Text></View>
                                }
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text key={index} style={styles.subText}>
                                    {bumpPositionText}
                                </Text>
                                <View style={{ flex:1, alignItems: 'flex-end', height: 25, justifyContent: 'center' }}>
                                    <View style={[{backgroundColor: statusColor}, styles.bottomView]}>
                                        <Text style={ styles.bottomText }>{statusText}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', borderWidth: 0.3, marginTop: 5, borderColor:'gray' }}/>
                        <View style={{ marginLeft: 18, marginRight: 18, height: 22, justifyContent: 'center' }}>
                            <Text key={index} style={styles.subText}>
                                {isPending
                                    ? // Pending TODO: decision date is how many weeks in advance?
                                        "Decision date: " + moment(bump.weekPublishedByWeekPublishedId.start).subtract(2, 'week').format('MMM DD, YYYY')
                                    :
                                        bump.rejected
                                        ? // Declined
                                            "Click to view open shifts for this week"
                                        : // Success
                                            "Click to View shifts assigned"
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                )})}
            </ScrollView>
        )
    }
}

const styles = {
    containerStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 1
    },
    subText: {
        color: 'gray',
        fontSize: 12
    },
    bottomView: {
        borderRadius: 10,
        alignItems: 'center',
        width: 85
    },
    bottomText: {
        color: 'white',
        fontSize: 12,
        margin: 2
    },
    actionNeededStyle: {
        backgroundColor: '#E33821',
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
};

export default compose(
    graphql(deleteBumpMutation, {name: 'deleteBump'}),
)(BumpStatus);
