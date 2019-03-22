import React,{Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {gql, graphql, compose} from 'react-apollo';
import ProgressCircle from 'react-native-progress-circle'
import moment from 'moment';

class Balance extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            ytdOvertimeHours: null,
            vacation: null,
            sick: null,
            personal: null
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.allEmployee.allEmployees && nextProps.allTimeOffRequests.allTimeOffRequests) {
            this.setState({ytdOvertimeHours: nextProps.allEmployee.allEmployees.nodes[0].ytdOvertimeHours});

            let v = 0; let p = 0; let s = 0;
            let allTimeOffRequests = nextProps.allTimeOffRequests.allTimeOffRequests.edges;
            for(let i = 0; i < allTimeOffRequests.length; i++){
                let dated = allTimeOffRequests[i].node.startDate;
                if(moment(dated).isAfter(moment('01/01/2018'))) {
                    if(allTimeOffRequests[i].node.requestTypeString === 'Sick Unpaid' ||
                        allTimeOffRequests[i].node.requestTypeString === 'Sick Paid'){
                        s = s + allTimeOffRequests[i].node.minutesPaid;
                    }
                    else if(allTimeOffRequests[i].node.requestTypeString === 'Vacation Incentive' ||
                        allTimeOffRequests[i].node.requestTypeString === 'Vacation Bucket' ||
                        allTimeOffRequests[i].node.requestTypeString === 'Vacation'){
                        v = v + allTimeOffRequests[i].node.minutesPaid;
                    }
                    else{
                        p = p + allTimeOffRequests[i].node.minutesPaid;
                    }
                }
            }

            v = v / 60;
            p = p / 60;
            s = s / 60;
            this.setState({personal: p !== 0 ? p : 8, vacation: v !== 0 ? v : 8, sick: s !== 0 ? s : 8});
        }
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={[styles.mainView, {marginTop:15}]}>
                    <View style={styles.innerView}>
                        <ProgressCircle
                            percent={this.state.sick/60*100}
                            radius={57}
                            borderWidth={6.5}
                            color="#0022A1"
                            shadowColor="lightgray"
                            bgColor="#fff">
                            <Text style={{ fontSize: 22, color: '#0022A1' }}>{Math.round(this.state.sick)}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{'HOURS'}</Text>
                        </ProgressCircle>
                        <Text style={styles.textMain}>Sick</Text>
                    </View>

                    <View style={styles.innerView}>
                        <ProgressCircle
                            percent={this.state.vacation/60*100}
                            radius={57}
                            borderWidth={6.5}
                            color="#0022A1"
                            shadowColor="lightgray"
                            bgColor="#fff">
                            <Text style={{ fontSize: 22, color: '#0022A1' }}>{Math.round(this.state.vacation)}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{'HOURS'}</Text>
                        </ProgressCircle>
                        <Text style={styles.textMain}>Vacation</Text>
                    </View>
                </View>

                <View style={[styles.mainView, {marginTop:15}]}>
                    <View style={styles.innerView}>
                        <ProgressCircle
                            percent={this.state.personal/60*100}
                            radius={57}
                            borderWidth={6.5}
                            color="#0022A1"
                            shadowColor="lightgray"
                            bgColor="#fff">
                            <Text style={{ fontSize: 22, color: '#0022A1' }}>{Math.round(this.state.personal)}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{'HOURS'}</Text>
                        </ProgressCircle>
                        <Text style={styles.textMain}>Personal</Text>
                    </View>

                    <View style={styles.innerView}>
                        <ProgressCircle
                            percent={this.state.ytdOvertimeHours/60*100}
                            radius={57}
                            borderWidth={6.5}
                            color="#0022A1"
                            shadowColor="lightgray"
                            bgColor="#fff">
                            <Text style={{ fontSize: 22, color: '#0022A1' }}>{Math.round(this.state.ytdOvertimeHours)}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{'HOURS'}</Text>
                        </ProgressCircle>
                        <Text style={styles.textMain}>YTD Overtime</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection:'row',
        justifyContent:'center',
        padding:10
    },
    innerView: {
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center'
    },
    textMain: {
        marginTop:10,
        fontSize:17,
        opacity:0.9
    },

});

const allEmployee = gql`
query allEmployee($userId: Uuid) {
  allEmployees(condition: {userId: $userId}) {
    nodes {
      userId
      id
      ytdOvertimeHours
    }
  }
}`;

const allTimeOffRequests = gql`
query allTimeOffRequests($userId: Uuid){
  allTimeOffRequests(condition: {requestorId: $userId}) {
    edges{
      node{
        startDate
        minutesPaid
        requestTypeString
      }
    }
  }
}`;

export default compose(
    graphql(allEmployee, {
        name: "allEmployee",
        options: (ownProps) => {
            return {
                variables: {
                    userId: ownProps.userId
                }
            }
        },
        fetchPolicy: 'network-only',
    }),
    graphql(allTimeOffRequests, {
        name: "allTimeOffRequests",
        options: (ownProps) => {
            return {
                variables: {

                    requestorId: ownProps.userId
                }
            }
        },
        fetchPolicy: 'network-only',
    })
)(Balance);
