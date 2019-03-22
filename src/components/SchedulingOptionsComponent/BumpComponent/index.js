import React,{Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {
    compose,
    graphql
} from 'react-apollo';
import TopBar from "../TopBar";
import BumpStatus from './BumpStatus';
import BumpRequest from './BumpRequest';
import { bumpPositionsQuery, bumpsQuery } from './BumpResolvers'

class BumpComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            request: true,
            status: false,
            bumpPositions: [],
            primaryJobBrandId: null,
        }
        this.onText=this.onText.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.bumpPositionsQuery.userById){
            let jobs = nextProps.bumpPositionsQuery.userById.jobsByUserId.nodes;
            let primaryJob = jobs.find((job) => job.primaryJob);
            let bumpJobs = jobs;//jobs.filter((job) => job.workplaceId != primaryJob.workplaceId);
            var primaryJobRanking = primaryJob.positionByPositionId.ranking
            let bumpPositions = bumpJobs.map((job) => job.positionByPositionId)
            // only allow bumps into lower classifications (higher ranking value is lower!)
            bumpPositions = bumpPositions.filter((position) =>
                position.ranking >= primaryJobRanking &&
                position !== primaryJob.positionByPositionId);

            this.setState({
                bumpPositions,
                primaryJobBrandId: primaryJob.positionByPositionId.brandId
            });
        }
    }
    onText(text) {
        if(text==="text1"){
            this.setState({request: true, status: false})
        }
        else {
            this.setState({request: false, status: true})
        }
    }

    render(){
        // Display error if present
        if (this.props.bumpPositionsQuery.error) {
            return <Text> Error! {this.props.bumpPositionsQuery.error.message} </Text>;
        }
        if (this.props.bumpsQuery.error) {
            return <Text> Error! {this.props.bumpsQuery.error.message} </Text>;
        }
        // Display loader while fetching data
        if (this.props.bumpPositionsQuery.loading || this.props.bumpsQuery.loading) {
            return (<View>
                        <Text> Loading... </Text>
                    </View>);
        }
        // Display error of no primary job found
        if (!this.state.primaryJobBrandId) {
            return <Text> Error! No Primary Job Found </Text>;
        }
        let numActionsNeeded = this.props.numActionsNeeded;
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <TopBar label={["Request Bump","Bump Status" + (numActionsNeeded > 0 ? ` (${numActionsNeeded})` : '')]}
                        labelColor={[this.state.request,this.state.status]} onText={this.onText}/>
                {/* default to request page for submitting requests, can switch to status page to view offered shifts*/}
                {this.state.status ?
                 <BumpStatus userId={this.props.userId} bumpsQuery={this.props.bumpsQuery}/>
                 :
                 <BumpRequest userId={this.props.userId} primaryJobBrandId={this.state.primaryJobBrandId}
                              bumpPositions={this.state.bumpPositions} bumpsQuery={this.props.bumpsQuery}
                              seeStatus={() => this.onText("text2")}/>
                }
            </View>
        )
    }
}

export default compose(
    graphql(bumpsQuery,
            {name: "bumpsQuery",
             options: (ownProps) => ({
                variables: {
                    id: ownProps.userId,
                }
            })}),
    graphql(bumpPositionsQuery,
            {name: "bumpPositionsQuery",
             options: (ownProps) => ({
                variables: {
                    id: ownProps.userId,
                }
            })}),
)(BumpComponent);