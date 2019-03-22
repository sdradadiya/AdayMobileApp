import React,{Component} from 'react';
import {View} from 'react-native';
import {gql, compose, graphql} from 'react-apollo';
import TopBar from "../../SchedulingOptionsComponent/MyTeamMateTopBar";
import MyWorkplace from './myWorkplace';
import SharedWorkplace from './sharedWorkplace';

class Teammates extends Component {
    constructor(props) {
        super(props);
        this.state={
            request: true,
            status: false,
            myWorkplace: null,
            sharedworkplace : null
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.myWorkplace.allEmployees && nextProps.sharedWorkplace.allEmployees) {
            let tmpMyWorkplace=nextProps.myWorkplace.allEmployees.nodes;
            let tmpSharedWorkplace=nextProps.sharedWorkplace.allEmployees.nodes;

            this.setState({
                myWorkplace:tmpMyWorkplace,
                sharedworkplace:tmpSharedWorkplace
            })
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
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <TopBar label={["My Workplace","Shared Workplaces"]} labelColor={[this.state.request,this.state.status]} onText={this.onText}/>
                {
                    this.state.status ?

                        <SharedWorkplace userId={this.props.userId} data={this.state.sharedworkplace} />
                        :
                        <MyWorkplace userId={this.props.userId} data={this.state.myWorkplace} />

                }
            </View>
        )
    }
}

const MyWorkplaces = gql`
query myWorkplace($primaryWorkplace: Uuid){
  allEmployees (condition: {primaryWorkplace: $primaryWorkplace, isManager: false}){
    nodes {
      userId
      id
      primaryWorkplace
      userByUserId{
        avatarUrl
        lastName
        firstName
      }
      hireDate
      ytdOvertimeHours
      workplaceByPrimaryWorkplace{
        id
        workplaceName
      }
    }
  }
}`;

const SharedWorkplaces = gql`
query sharedWorkplace($corporationId: Uuid){
  allEmployees (condition: {corporationId: $corporationId, isManager: false}){
    nodes {
      userId
      id
      primaryWorkplace
      userByUserId{
        avatarUrl
        lastName
        firstName
      }
      hireDate
      ytdOvertimeHours
      workplaceByPrimaryWorkplace{
        id
        workplaceName
      }
    }
  }
}`;

export default compose(
    graphql(MyWorkplaces, {
        name: "myWorkplace",
        options: (ownProps) => {
            return {
                variables: {
                    primaryWorkplace: ownProps.primaryWorkplace
                }
            }
        },
        fetchPolicy: 'network-only',
    }),
    graphql(SharedWorkplaces, {
        name: "sharedWorkplace",
        options: (ownProps) => {
            return {
                variables: {
                    corporationId: ownProps.corporationId
                }
            }
        },
        fetchPolicy: 'network-only',
    })
)(Teammates);
