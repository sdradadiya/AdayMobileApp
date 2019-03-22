import React,{Component} from 'react';
import {View,Text,AsyncStorage} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './CustomeTabBar'
import BumpComponent from "./BumpComponent";
import TimeOffComponent from "../TimeOffComponent/TimeOffComponent"
import Preferences from "./Preferences";
import WorkHistory from './WorkHistoryComponent';

class SchedulingOptions extends Component
{
    constructor(props) {
        super(props);
        this.userId=this.props.userId;
        this.state = {
            corporationId: null
        };
    }

    componentDidMount() {
        setTimeout(() => this.scrollableTabView.goToPage(this.props.isfromCalendar ? 2 : 0), 300);
        AsyncStorage.getItem('corporationId').then((value)=>{ this.setState({corporationId: value}) })
    }

    render(){
        
        return(
            <ScrollableTabView ref={(ref) => { this.scrollableTabView = ref; }} renderTabBar={() => <CustomTabBar />}>
                { this.state.corporationId == '3b14782b-c220-4927-b059-f4f22d01c230' && <BumpComponent tabLabel="SHIFT BUMPS" userId={this.userId} numActionsNeeded={this.props.numBumpActionsNeeded}/> }
                <TimeOffComponent tabLabel="TIME OFF" userId={this.userId}/>
                <WorkHistory tabLabel="WORK HISTORY" userId={this.userId}/>
                {/* <Preferences tabLabel="PREFERENCES"/> */}
            </ScrollableTabView>
        )
    }
}

export default SchedulingOptions;