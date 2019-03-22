import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Image,
    Text,
    AsyncStorage
} from 'react-native';
import {Input} from 'native-base';
import {gql, graphql, compose} from 'react-apollo';
import SpinnerComponent from './SpinnerComponent';
import {BASE_API} from '../constants';

class AwardOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            awardOrder: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        // for assigned shifts, use autoassign histories to audit the award order
        let awardOrderData = null;
        if (nextProps.shiftStatus === 'BOOKED' || nextProps.status === 'PAST'){
            if (nextProps.allAutoAssignData.allAutoassignVersions) {
                // once we've recieved graphql query, set awardOrderData to non-null (so no loading)
                awardOrderData = [];
                let autoassignVersions = nextProps.allAutoAssignData.allAutoassignVersions.edges;
                if (autoassignVersions.length > 0) {
                    // take the most recent auto assign version
                    let latestAutoassign = autoassignVersions.reduce((prev, curr) => {
                        return prev.node.dateCreated > curr.node.dateCreated ? prev : curr;
                    });
                    awardOrderData = latestAutoassign.node.autoassignOrdersByAutoassignVersionId.edges.slice(0);
                    awardOrderData.sort((a, b) => {
                        if (a.node.ranking < 0) return 1;
                        if (b.node.ranking < 0) return -1;
                        return a.node.ranking < b.node.ranking ? -1 : 1;
                    });
                    flattenedData = []
                    // process data to put in the same form as the phoneTreeList data
                    awardOrderData.map((order) => {
                        var flat_order = Object.assign({}, order.node);
                        flat_order.avatarUrl = order.node.userByUserId.avatarUrl;
                        flat_order.firstName = order.node.userByUserId.firstName;
                        flat_order.lastName = order.node.userByUserId.lastName;
                        flat_order.weeklyWorkingHoursWithShift = order.node.weeklyHours;
                        if (flat_order.ranking >= 0) {
                            flat_order.ranking = flat_order.ranking + 1;
                        }
                        flattenedData.push(flat_order);
                    });
                    awardOrderData = flattenedData;
                }
            }
            this.setState({awardOrder: awardOrderData});
        } else if (!this.state.querySent) {
            this.setState({querySent: true});
            // For unassigned shifts use the award order server call instead
            const uri = `${BASE_API}/api/phoneTreeList`;
            let token = AsyncStorage.getItem('token');
            fetch(uri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //token: token,
                    shiftId: this.props.shiftId
                }),
            }).then(async (response) => {
                let responseJson = await response.json();
                if (responseJson.length && responseJson[0].ranking) {
                    awardOrderData = responseJson;
                }
                this.setState({awardOrder: awardOrderData});
            })
        }
    }

    renderAwardUser = ({item, index}) => {
        let data = item;
        return(
            <View style={{width:'100%', borderBottomColor:'lightgray', borderBottomWidth:1,}}>
                <View style={styles.containers}>
                    <View style={[styles.subView, {width:'9%'}]}>
                        {data.awarded ? // Add star to employees who were awarded the shift
                            <Image source={require('./assets/icons/star.png')} style={styles.starImage}>
                                <Text style={styles.starText}>
                                    {data.ranking >= 0 ? data.ranking : '--'}
                                </Text>
                            </Image> :
                            <Text style={styles.rankingText}>{data.ranking >= 0 ? data.ranking : '--'}</Text>}
                    </View>

                    <View style={[styles.subView, {width:'12%', padding:2}]}>
                        <Image source={{uri: data.avatarUrl}} style={styles.imgProfile} />
                    </View>

                    <View style={[styles.subView, {width:'36%', padding:2}]}>
                        <Text style={{fontWeight:'bold', opacity:0.90}}>
                            {data.firstName || '--'} {data.lastName || '--'}
                        </Text>
                    </View>

                    <View style={[styles.subView, {width:'13%', padding:2, alignItems: 'center'}]}>
                        <Text style={styles.textStyles}>
                            {data.weeklyWorkingHoursWithShift !== null ? Math.round(data.weeklyWorkingHoursWithShift) : '--'}
                        </Text>
                        <Text style={styles.textStyle}>HOURS</Text>
                    </View>

                    <View style={[styles.subView, {width:'18.5%', padding:2, alignItems: 'center'}]}>
                        <Text style={styles.textStyles}>{data.seniority !== null ? Math.round(data.seniority) : '--'}</Text>
                        <Text style={styles.textStyle}>SENIORITY</Text>
                    </View>

                    <View style={[styles.subView, {width:'13%', padding:2, alignItems: 'center'}]}>
                        <Text style={styles.textStyles}>{data.ytdOvertime !== null ? Math.round(data.ytdOvertime) : '--'}</Text>
                        <Text style={styles.textStyle}>YTD OT</Text>
                    </View>

                </View>
            </View>
        )
    };

    render() {
        // display error if present
        if (this.props.allAutoAssignData.error) {
            return (<View><Text>{this.props.allAutoAssignData.error.message}</Text></View>);
        }
        // display loader if award order has not loaded
        if (this.state.awardOrder === null) {
            return (
                <View style={{flex: 1, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent/>
                </View>
            )

        }
        if (this.state.awardOrder.length === 0) {
            return (
                <View style={{flex: 1, position: 'absolute', zIndex: 100}}>
                    <Text> Award Order Unavailable - Manager Manually Assigned </Text>
                </View>
            )

        }
        return (
            <View style={styles.container}>
                {this.state.awardOrder ?
                    <FlatList
                        data={this.state.awardOrder}
                        renderItem={this.renderAwardUser}
                    />
                    :
                    <View>
                        <Text style={{lineHeight: 15, color: "#999999", marginTop: 8}}>No Award Order Available</Text>
                    </View>
                }
            </View>
        );
    }
}

const allAutoAssignData = gql`
 query allAutoassignVersion($shiftId : Uuid!){
  allAutoassignVersions(condition:{ shiftId: $shiftId }){
  edges{
    node{
      id
      shiftId
      startTime
      endTime
      dateCreated
      autoassignOrdersByAutoassignVersionId {
        edges{
          node{
            id
            userByUserId{
                id
                firstName
                lastName
                avatarUrl
            }
            userResponse
            ranking
            ytdOvertime
            seniority
            weeklyHours
            temporarilyRemoved
            awarded
            alreadyAssigned
          }
        }
      }
    }
  }
  }
}
`;

export default compose(
    graphql(allAutoAssignData, {
        name: 'allAutoAssignData',
        options: (ownProps) => {
            return {
                variables: {shiftId: ownProps.shiftId}, //'5ceb59b2-6dc7-11e8-98ae-0a5e55be0926'
                notifyOnNetworkStatusChange: true,
            }
        }
    })
)(AwardOrder);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 5
    },
    containers: {
        flex:1,
        flexDirection:'row',
        width:'100%',
        padding:5,
        //justifyContent:'space-between'
    },
    imgProfile: {
        width:34,
        height:34,
        borderRadius:17,
        borderColor:'lightgray',
        borderWidth:1
    },
    subView: {
        alignSelf: 'center',
        alignItems: 'flex-start'
    },
    textStyle: {
        color:'gray',
        opacity:0.75,
        fontSize:9,
        fontWeight:'bold'
    },
    textStyles:{
        opacity:0.75,
        fontWeight:'bold',
        alignSelf:'center'
    },
    starImage:{
        height: 40,
        width: 40,
        justifyContent: 'center',
        marginLeft: -8
    },
    starText: {
        marginLeft: 14,
        fontWeight: 'bold',
        fontSize: 16
    },
    rankingText:{
        fontSize: 16,
        marginLeft: 6
    }
});