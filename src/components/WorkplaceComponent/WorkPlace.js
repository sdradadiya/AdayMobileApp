import React,{ Component } from 'react';
import {
    View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Balance from './MyBalance';
import Position from './MyPosition';
import Teammates from './MyTeamMates';
import CustomTabBar from '../SchedulingOptionsComponent/CustomeTabBar';

export default class WorkPlace extends Component{

    constructor(){
        super()
    }

    render(){
        return(
            <View style={{ flex:1}}>
                <ScrollableTabView ref={(ref) => { this.scrollableTabView = ref; }} renderTabBar={() => <CustomTabBar />}>

                    {/*<Balance tabLabel="MY BALANCE" userId={this.props.userId} />*/}

                    <Position tabLabel="MY POSITION" userId={this.props.userId} corporationId={this.props.corporationId} />

                    <Teammates tabLabel="MY TEAMMATES" userId={this.props.userId} corporationId={this.props.corporationId}
                               primaryWorkplace={this.props.primaryWorkplace} />

                </ScrollableTabView>
            </View>
        );
    }

}
