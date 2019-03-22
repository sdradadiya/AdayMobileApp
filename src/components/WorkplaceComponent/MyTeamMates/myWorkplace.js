import React,{ Component } from 'react';
import moment from 'moment';
import {View, Text, FlatList, Image, StyleSheet, ActivityIndicator} from 'react-native';
import _ from 'lodash';

export default class MyWorkplace extends Component{
    constructor(props){
        super(props);
        let tmpmyTeamMates=props.data;
        let tmpArr = _.cloneDeep(tmpmyTeamMates);

        if(tmpArr)
            tmpArr=tmpArr.sort(function compare(a, b) {
                let dateA = new Date(a.hireDate);
                let dateB = new Date(b.hireDate);
                return dateA - dateB;
            });
        this.state={
            myTeamMates: tmpArr
        }
    }

    componentWillReceiveProps(nextProps){
        let tmpmyTeamMates=_.cloneDeep(nextProps.data);

        if(tmpmyTeamMates)
            tmpmyTeamMates.sort(function compare(a, b) {
                let dateA = new Date(a.hireDate);
                let dateB = new Date(b.hireDate);
                return dateA - dateB;
            });
        this.setState({
            myTeamMates:tmpmyTeamMates
        })
    }

    renderItem = (item,index) => {
        return(
            <View style={styles.cellView}>
                    <View style={styles.index}>
                        <Text style={{fontSize:20}}>{index + 1}</Text>
                    </View>
                    <View style={styles.description}>
                        <View style={{width: 60}}>
                            <Image style={styles.imgView} source={{uri:item.userByUserId.avatarUrl}}/>
                        </View>
                        <View style={{marginLeft:10, marginRight: 35}}>
                            <Text style={{fontSize:18}}>{item.userByUserId.firstName} {item.userByUserId.lastName}</Text>
                            <Text style={{fontSize: 11, color: 'gray'}} numberOfLines={1}>Start Date: {moment(item.hireDate).format('MMM DD, YYYY')} {'\u2022'} YTD Overtime: {parseFloat(Math.round(item.ytdOvertimeHours)).toFixed(0)}</Text>
                        </View>
                    </View>
                    {/* <View style={styles.arrowView}>
                        <Image source={require('../../assets/right-arrow-white.png')} style={{height:25,width:25,tintColor:'gray'}}/>
                    </View> */}
            </View>
        )
    };

    render(){
        if(this.state.myTeamMates != null){
            return(
                <View style={styles.container}>
                    <FlatList
                        data={this.state.myTeamMates}
                        renderItem={ ({item,index}) => this.renderItem(item,index)}/>
                </View>
            );
        }else{
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#002DB0" />
                </View>
                )
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFFFFF"
    },
    cellView: {
        flex:1,
        height:70,
        flexDirection:'row',
        borderBottomWidth:2,
        borderBottomColor:'lightgray'
    },
    index:{
        width:'10%',
        justifyContent:'center',
        alignItems:'center'
    },
    description:{
        width:'80%',
        alignItems:'center',
        flexDirection:'row'
    },
    imgView:{
        borderRadius:25,
        height:50,
        width:50,
    },
    arrowView:{
        width:'10%',
        justifyContent:'center',
        alignItems:'center'
    }
});

