import React,{Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image
} from 'react-native';
import TopBar from "./TopBar";
import {Actions} from 'react-native-router-flux';
let {
    width
} = Dimensions.get('window');
import moment from 'moment';

class Preferences extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            text1:true,
            text2:false,
        }
        this.onText=this.onText.bind(this);
    }

    onText(text) {
        if(text==="text1"){
            this.setState({text1: true,text2: false})
        }
        else {
            this.setState({text1: false,text2: true})
        }
    }

    renderCards(obj) {
        const fromTime=obj.fromTime.split(" ");
        const toTime= obj.toTime.split(" ");
        const mon=moment(obj.startDate).format("MMM");

        return(
            <TouchableOpacity onPress={() => {Actions.ShiftBumpDetail({})}} style={styles.backGround}>
                <View>
                    <Text style={styles.headerTitle}>{obj.assignee}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignItems:'center',marginRight:5}}>
                        <Text style={styles.dateTitle}>{moment(obj.startDate).format("DD")}</Text>
                        <Text style={styles.monthTitle}>{moment(obj.startDate).format("MMM").toUpperCase()}</Text>
                    </View>
                    <View>
                        {this.weekViews(obj.workingDays)}
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.weekText}>S</Text>
                            <Text style={styles.weekText}>M</Text>
                            <Text style={styles.weekText}>T</Text>
                            <Text style={styles.weekText}>W</Text>
                            <Text style={styles.weekText}>T</Text>
                            <Text style={styles.weekText}>F</Text>
                            <Text style={styles.weekText}>S</Text>
                        </View>
                    </View>
                    <View style={{alignItems:'center',marginLeft:5}}>
                        <Text style={styles.dateTitle}>{moment(obj.endDate).format("DD")}</Text>
                        <Text style={styles.monthTitle}>{moment(obj.startDate).format("MMM").toUpperCase()}</Text>
                    </View>
                </View>

                {
                    <View style={{flexDirection:'row', marginTop: 4,justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',marginRight:15}}>
                            <Text style={styles.timeTitle}>{fromTime[0]}</Text>
                            <Text style={{fontSize: 10, color: "rgb(86,86,86)"}}>{fromTime[1]}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.timeTitle}>{toTime[0]}</Text>
                            <Text style={{fontSize: 10, color: "rgb(86,86,86)"}}>{toTime[1]}</Text>
                        </View>
                    </View>   
                }
                <View style={[styles.bindingEnds,{paddingLeft:40,paddingRight:40,paddingTop:2}]}>
                    <Text style={styles.bindingEndsText}>{obj.work}</Text>
                    <View style={{backgroundColor:'#fff',height:7,width:7,borderRadius:3.5,alignSelf:'center',marginLeft:5,marginRight:5}}/>
                    <Text style={styles.bindingEndsText}>Bindding Ends {obj.biding}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <TopBar label={["My Preferences","Enter New Preference"]} labelColor={[this.state.text1,this.state.text2]} onText={this.onText}/>
                <ScrollView>
                    {
                        this.state.text1  ?
                            <View>
                                <Text>My Preferences</Text>
                            </View>

                            :

                            <View>
                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} source={require('../PreferencesComponent/assets/Schedule_Preferences.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Ideal Schedule</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>What is your ideal schedule?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Certification.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Certifications</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>Which position do you enjoy working the most?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no certification requests</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Workplaces.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Workplace</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>Where do you enjoy working most?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You don't have any workplace preferences</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/People.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>People</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>Who do you enjoy working the most?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You don't have any people preferences</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Start_Time.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Earliest Start Time</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>When is the earliest time you'd prefer to work?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You don't have any start time preferences</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../assets/endTime.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Latest End Time</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>When is the latest time you'd prefer to work?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Days_On.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Days Working</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>How many days in a row do you like to work?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>

                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Days_Off.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Days Off</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>When you have days off, how many in a row?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Clopening.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Clopenings</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>What is tha latest number of hours between shifts?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Shift_Length.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Shift Length</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>How many hour do you prefer to work in a day?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../assets/Do_Not_Schedule.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Do Not Schedule Hours</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>When do you want to be taken off calendar?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Day_of_Week.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Days of the Week</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>Which day of the week do you prefer to work?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                                <View style={styles.mainView}>
                                    <View style={styles.innerView}>
                                        <View style={{width:'20%', padding:8,}}>
                                            <Image style={{width:50, height:50}} resizeMode='contain' source={require('../PreferencesComponent/assets/Timer.png')} />
                                        </View>
                                        <View style={{width:'80%', height:40, justifyContent:'space-around'}}>
                                            <Text style={{color:'rgb(0,38,157)', fontSize:15}}>Time of Day</Text>
                                            <Text style={{color: 'gray', fontSize:12}}>Which day of the week do you prefer to work?</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'100%', backgroundColor:'black', height:1, marginTop:0}} />
                                    <View style={{marginTop:2, marginLeft:5, padding:3, marginBottom:2}}>
                                        <Text style={{color:'gray', fontSize:12}}>You have no preferences entered</Text>
                                    </View>
                                </View>


                            </View>

                    }
                </ScrollView>
            </View>
        )
    }
}

export default Preferences;

const styles = StyleSheet.create({
    mainView: {
        width: width-20,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom:5,
        elevation:5,// padding:7,
        backgroundColor: '#fff',
        shadowColor:'#000',
        shadowOffset:{width: 0.5, height: 0.5},
        shadowOpacity:0.25,
        borderRadius:5
    },
    innerView: {
        flexDirection:'row',
        alignItems:'center',
    },
    outerView: {
        borderColor: "#000",
        borderWidth: 1,
    },
    monthTitle: {
        color: "rgb(74,74,74)",
        fontSize: 12,
        textAlign:'center',
    },
    roundView: {
        borderColor: "#000",
        borderWidth: 1,
        width: 12,
        height: 12,
        margin: 3,
        marginTop : 5,
        borderRadius: 50,
    },
    fillRoundView: {
        backgroundColor: "#000",
        opacity:0.7
    },
    weekText: {
        fontSize: 11,
        marginRight: 4.9,
        marginLeft: 4.9,
        color: "rgb(86,86,86)",
    },
    timeTitle: {
        color: "rgb(74,74,74)",
        fontSize: 20,
    },
    bindingEnds: {
        //width: '52%',
        backgroundColor: "rgb(232,49,43)",
        borderRadius: 2,
        height: 19,
        margin: 5,
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    bindingEndsText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
        textAlign:'center'
    },
});

