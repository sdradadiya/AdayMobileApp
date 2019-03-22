import React,{Component} from 'react';
import {
    View,
} from 'react-native';
import {
    gql,
    compose,
    graphql
} from 'react-apollo';
import TopBar from "../TopBar";
import _ from 'lodash';
import DeclinedShift from './DeclinedShift';
import WorkedShift from './WorkedShift';
import { userShifts } from "../../scheduleQueries.js";

class WorkHistoryComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            request: true,
            status: false,
            workedData: null,
            declinedData : null
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.allUserShiftsMobiles.allUserShiftsMobiles && nextProps.userShift.allUserMobileHistories) {
            let declinedData = [];
            let declinedShiftIds = [];
            // compile declined shifts
            for (let i = 0; i < nextProps.allUserShiftsMobiles.allUserShiftsMobiles.nodes.length; i++) {
                if (nextProps.allUserShiftsMobiles.allUserShiftsMobiles.nodes[i].workerResponse === "NO") {
                    let warray = nextProps.allUserShiftsMobiles.allUserShiftsMobiles.nodes[i];
                    if (!declinedShiftIds.includes(warray.shiftId)) {
                      declinedData.push(warray);
                    }
                    declinedShiftIds.push(warray.shiftId)
                }
            }
            var reversedArr = _.reverse(declinedData)
            this.setState({declinedData});

            // compile worked shifts
            let workedData = this.state.workedData || [];
            for(let i = 0; i < nextProps.userShift.allUserMobileHistories.edges.length; i++){
                let response = nextProps.userShift.allUserMobileHistories.edges[i].node.workerResponse;
                if(response === "NONE" || response === "YES")
                {
                    let warray = nextProps.userShift.allUserMobileHistories.edges[i].node;
                    workedData.push(warray);
                }
            }
            this.setState({workedData});
        }
    }

    onText = (text) => {
        if(text==="text1"){
            this.setState({request: true, status: false})
        }
        else {
            this.setState({request: false, status: true})
        }
    };

    render(){
        // Display error if present
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <TopBar label={["Requested Shifts","Declined Shifts"]} labelColor={[this.state.request,this.state.status]} onText={this.onText}/>

                {
                    this.state.status ?

                        <DeclinedShift userId={this.props.userId} declinedData={this.state.declinedData} />
                        :
                        <WorkedShift userId={this.props.userId} workedData={this.state.workedData} />

                }
            </View>
        )
    }
}

const userShiftByStartQuery = gql`
    query allUserMobileHistories($workerId: Uuid!) {
      allUserMobileHistories(condition: {workerId: $workerId}) {
        edges {
          node {
            workerId
            startTime
            endTime
            shiftId
            workersRequestedNum
            instructions
            hourlyBonusPay
            unpaidBreakTime
            shiftDateCreated
            marketId
            isBooked
            workerResponse
            isFromPhoneTree
            clockInDate
            clockOutDate
            clockInVerified
            clockOutVerified
            clockInLocation
            clockOutLocation
            workplaceName
            workplaceId
            address
            workplacePhoneNumber
            workplaceImageUrl
            locationJson
            addressJson
            zipCode
            positionId
            brandName
            wage
            positionName
            bookedByAutoAssign
            bookedByPhoneTree
          }
        }
      }
    }`;

export default compose(
    graphql(userShiftByStartQuery, {
        name: "userShift",
        options: (ownProps) => {
            return {
                variables: {
                    workerId: ownProps.userId
                }
            }
        },
        fetchPolicy: 'network-only',
    }),
    graphql(userShifts, {
        name: "allUserShiftsMobiles",
        options: (ownProps) => {
            return {
                variables: {
                    userId: ownProps.userId
                }
            }
        },
        fetchPolicy: 'network-only'
    }),
)(WorkHistoryComponent);