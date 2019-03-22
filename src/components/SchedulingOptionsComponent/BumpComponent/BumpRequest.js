import React,{Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Modal
} from 'react-native';
import {
    compose,
    graphql
} from 'react-apollo';
let {
    width
} = Dimensions.get('window');
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
const uuidv4 = require('uuid/v4');
let _constants = require('../../../constants');

import { weeksQuery, createBumpMutation, createBumpsMutation, bumpsQuery } from './BumpResolvers'

// hard coded summer dates taken from harvard calendar
// for RA HBS pilot "bump summer" feature
const summerDatesHBS = {
    '2018': ['May 12, 2018', 'September 4, 2018'],
    '2019': ['May 18, 2019', 'September 2, 2019'],
    '2020': ['May 16, 2020', 'September 1, 2020']
};

class BumpRequest extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            positionDesiredId: null,
            bumpAnyPosition: false,
            weeks: [],
            showModal: false,
            showFinalModal: false,
            selectedIndex: null,
            weekSelectedDate: null,
            weekSelectedId: null,
            dateSelected: "",
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.weeksQuery.allWeekPublisheds){
            // filter current and future weekpublisheds
            let weeks = nextProps.weeksQuery.allWeekPublisheds.nodes;
            weeks = weeks.filter((week) => (moment(week.start).isSameOrAfter(moment().add(2, 'week'))));
            this.setState({
                weeks
            });
        }
    }

    setSelected = (position, index) => {
        if(position.id === this.state.positionDesiredId){
            this.setState({positionDesiredId: null, bumpAnyPosition: false});
        }else{
            this.setState({positionDesiredId: position.id, bumpAnyPosition: false});
        }
    };
    setBumpAnyPosition = (position, index) => {
        this.setState({positionDesiredId: null, bumpAnyPosition: !this.state.bumpAnyPosition});
    };

    openModal = () => {
        if(this.state.positionDesiredId !== null || this.state.bumpAnyPosition) {
            this.setState({ showModal: true });
        }
        else{
            alert('Please Select Position')
        }
    };

    oneWeek = () => {
        this.setState({showModal: false }, () => {
            setTimeout(() => {
                this.setState({showFinalModal: true})
            }, 100);

        });
    };

    allSummer = () => {
        this.finalSubmit(true);
    };

    inSummer = (raw_date) => {
        let date = moment(raw_date);
        let year = moment(date).format('YYYY');
        let summerStart = summerDatesHBS[year][0];
        let summerEnd = summerDatesHBS[year][1];
        return date.isSameOrAfter(moment(summerStart)) && date.isSameOrBefore(moment(summerEnd));
    }

    // create bump requests for all weeks in the summer without one
    createBumpsSummer = () => {
        // filter through available weeks, to get those between now and end of summer
        // also filter out weeks that already have bump requests
        let summerWeeks = this.state.weeks.filter((week) => {
            return (this.inSummer(week.start) && moment(week.start).isSameOrAfter(moment()) &&
                    !this.bumpConflict(week.id))
        });
        if (summerWeeks.length === 0) {
            alert('You already have bumps for every week');
            return;
        }

        let bumps = [];
        summerWeeks.map((week) => {
            bumps.push({
               id: uuidv4(),
               userId: this.props.userId,
               positionDesired: this.state.positionDesiredId,
               weekPublishedId: week.id,
               bumpAnyPosition: this.state.bumpAnyPosition,
               cycleNum: 0,
               timeCreated: moment().format(),
           });
        });

        this.props.createBumps({
            variables: {newBumps: bumps},
            refetchQueries: [{
            query: bumpsQuery,
                variables: {
                  id: this.props.userId
                }
            }]
        });
    }

    // tries to find if there is already a bump request on the same week
    bumpConflict = (weekId) => {
        let bumps = this.props.bumpsQuery.allBumps.nodes;
        bumps = bumps.filter((bump) => (moment(bump.weekPublishedByWeekPublishedId.start).isSameOrAfter(moment())));
        let search = bumps.find((bump) => (bump.weekPublishedByWeekPublishedId.id === weekId));
        return search !== undefined;
    }

    finalSubmit = (allSummer = false) => {
        // if user trying to submit requests for summer
        if (allSummer) {
            if (!this.inSummer(moment())) {
                alert("It's not Summer Yet");
            } else {
                // create requests all weeks up to end of summer
                this.createBumpsSummer();
                this.setState({showModal: false});
                this.props.seeStatus();
            }
        }
        // otherwise, we are creating for a single week
        // validation
        else if (!this.state.weekSelectedId) {
            alert('Please Select Future Week');
        }
        // disallow creating a bump if there already is one, must withdraw first
        else if (this.bumpConflict(this.state.weekSelectedId)) {
            alert('You already have a bump for this week - See bump status.');
        }
        else {
            this.props.createBump({
                variables: {bump: {
                    id: uuidv4(),
                    userId: this.props.userId,
                    positionDesired: this.state.positionDesiredId,
                    bumpAnyPosition: this.state.bumpAnyPosition,
                    weekPublishedId: this.state.weekSelectedId,
                    cycleNum: 0,
                    timeCreated: moment().format(),
                }},
                updateQueries: {
                    bumpsQuery: (previousQueryResult, {
                        mutationResult
                    }) => {
                        const newBump = mutationResult.data.createBump.bump;
                        previousQueryResult.allBumps.nodes.push(newBump);
                        return {
                            allBumps: previousQueryResult.allBumps
                        };
                    },
                }
            });
            this.setState({showFinalModal: false});
            this.props.seeStatus();
        }
    };

    // populates state w/ id + startDate of nearest weekpublished starting before date
    setWeekSelected = (date) => {
        let weekSelectedDate = null;//moment(this.state.weeks[0].start).format("MMM DD YYY");
        let weekSelectedId = null; //this.state.weeks[0].id;
        this.state.weeks.map((week) => {
            if (moment(week.start).startOf('day').isSameOrBefore(moment(date)) &&
                (weekSelectedDate == null || moment(week.start).isAfter(moment(weekSelectedDate)))) {
                weekSelectedDate = moment(week.start).format("MMM DD YYYY");
                weekSelectedId = week.id;
            }
        });
        this.setState({
            dateSelected: moment(date).format("MMM DD YYYY"),
            weekSelectedDate: weekSelectedDate || "None Available",
            weekSelectedId
        })

    }

    render(){
        // Display any errors
        if (this.props.weeksQuery.error) {
            return <Text>Error! {this.props.weeksQuery.error.message}</Text>;
        }
        // Display loader while fetching data
        if (this.props.weeksQuery.loading) {
            return (<View style={styles.container}>
                <Text> Loading... </Text>
            </View>);
        }
        return(
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <Modal
                    transparent={true}
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({showModal : false})}
                    animate="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                resizeMode="contain" style={{width: 140, height: 140}}
                                source={require('../../assets/bumpLogo.png')}
                            />
                            <Text style={styles.modalTextTitle}>
                                {'Bump Once, Bump Summer'}
                            </Text>
                            <Text style={styles.modalText}>
                                {'Would you like to bump for a week or automatically bump for the summer?'}
                            </Text>

                            <View style={{marginTop:5}}>
                                <TouchableOpacity onPress={() => this.oneWeek()} style={[styles.modalButtonContainer, {backgroundColor:'rgba(0,38, 157,1)'}]}>
                                    <Text style={styles.modalButtonName}>BUMP FOR ONE WEEK</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => this.allSummer()} style={styles.modalButtonContainer}>
                                    <Text style={styles.modalButtonName}>ALL SUMMER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.modalFooterContainer}>
                            <TouchableOpacity onPress={() => this.setState({showModal: false})}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 50, height: 50, borderWidth: 0}}
                                    source={require('../../assets/profile-icons/close-button-modal.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.showFinalModal}
                    onRequestClose={() => this.setState({showFinalModal : false})}
                    animate="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent, {paddingTop:0, paddingBottom: 0,
                            paddingHorizontal: 0}]}>

                            <View style={styles.headerContainer}>
                                <Text style={{color: 'rgba(0,38, 157,1)', fontSize: 18}}>
                                    Week Starting: {this.state.weekSelectedDate || "None"}
                                </Text>
                            </View>

                            <Text style={[styles.modalText, {margin:15, fontSize:16 }]}>
                                {"Select a date within the week that you're requesting to bump?"}
                            </Text>

                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:0.45, alignItems:'center', paddingTop:10, paddingBottom:10 }}>
                                    <Text style={{fontSize:15, }}>
                                        Select Date:
                                    </Text>
                                </View>

                                <View style={{flex:0.55}}>
                                    <DatePicker
                                        date={this.state.dateSelected}
                                        mode="date"
                                        format="MMM DD YYYY"
                                        confirmBtnText="Done"
                                        cancelBtnText="Cancel"
                                        is24Hour={false}
                                        customStyles={{
                                            dateInput: {
                                                alignItems:'center',
                                                borderWidth:1,
                                            },
                                            dateIcon: {
                                                width:0,
                                            },
                                            dateText: {
                                                fontSize:15
                                            },
                                        }}
                                        onDateChange={(date) => {
                                            this.setWeekSelected(date);
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={{marginBottom: 7, marginTop: 10}}>
                                <TouchableOpacity onPress={() => this.finalSubmit()} style={styles.modalButtonContainer}>
                                    <Text style={styles.modalButtonName}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.modalFooterContainer}>
                            <TouchableOpacity onPress={() => this.setState({showFinalModal: false})}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 50, height: 50, borderWidth: 0}}
                                    source={require('../../assets/profile-icons/close-button-modal.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ flex: 1 }}>
                    {this.props.bumpPositions.map((position, index) => (
                        <View style={{padding:10, borderBottomWidth:1, borderBottomColor:'lightgray', flexDirection:'row'}}>
                            <View style={{flex:1, alignSelf:'flex-end', justifyContent:'flex-end'}}>
                                <Text key={index} style={{fontSize:16}}>
                                    {position.positionName}
                                </Text>
                            </View>
                            <View style={{justifyContent:'flex-end'}}>
                                {this.state.positionDesiredId === position.id ?
                                    <TouchableOpacity onPress={() => this.setSelected(position, index)}>
                                        <Image source={require('../../assets/YesUnselected.png')} style={{height: 25, width: 25, tintColor:'gray'}} />
                                        <Image source={require('../../assets/Blue_Check.png')} style={{ position: 'absolute', height: 25, width: 25, tintColor:'rgba(20, 139, 242, 1)'}} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.setSelected(position, index)}>
                                        <Image source={require('../../assets/YesUnselected.png')} style={{height: 25, width: 25, tintColor:'gray'}} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    ))}
                    <View style={{padding:10, borderBottomWidth:1, borderBottomColor:'lightgray', flexDirection:'row'}}>
                        <View style={{flex:1, alignSelf:'flex-end', justifyContent:'flex-end'}}>
                            <Text style={{fontSize:16}}>Any Position</Text>
                        </View>
                        <View style={{justifyContent:'flex-end'}}>
                            {this.state.bumpAnyPosition ?
                                <TouchableOpacity onPress={() => this.setBumpAnyPosition()}>
                                    <Image source={require('../../assets/YesUnselected.png')} style={{height: 25, width: 25, tintColor:'gray'}} />
                                    <Image source={require('../../assets/Blue_Check.png')} style={{ position: 'absolute', height: 25, width: 25, tintColor:'rgba(20, 139, 242, 1)'}} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.setBumpAnyPosition()}>
                                    <Image source={require('../../assets/YesUnselected.png')} style={{height: 25, width: 25, tintColor:'gray'}} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={{ margin: 15, alignSelf: 'center', justifyContent:'center', alignItems:'center' }}>
                        <Text style={styles.modalText}>
                            If you do not see a classification that you should be able to bump into, contact your manager
                        </Text>
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity style={{backgroundColor:'rgb(0,164,99)', padding:15, marginTop:5, height: (_constants.isIphoneX() ? 70 : 44) }} onPress={() => this.openModal()}>
                        <Text style={{fontFamily: 'RobotoCondensed-Regular',color:'white', alignSelf:'center', fontSize:18, fontWeight:'bold'}}>REQUEST BUMP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default compose(
    graphql(weeksQuery,
        {name: "weeksQuery",
            options: (ownProps) => ({
                variables: {
                    brandId: ownProps.primaryJobBrandId,
                }
            })}),
    graphql(createBumpMutation, {name: 'createBump'}),
    graphql(createBumpsMutation, {name: 'createBumps'}),
)(BumpRequest);

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        justifyContent:'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    modalContent: {
        width: width * 0.715,
        borderWidth:1,
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: 'lightgray',
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: 'white'
    },
    modalTextTitle:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight:'bold',
        paddingBottom:0,
        paddingVertical:0,
        color:'gray'
    },
    modalText: {
        color: '#888',
        textAlign: 'center',
        fontSize: 13,
        padding:10
    },
    modalButtonContainer: {
        backgroundColor: '#00A863',
        padding: 10,
        width: width * 0.55,
        marginVertical: 5,
        shadowOffset: {height: 2, width: 1},
        shadowOpacity: 0.4,
        borderRadius: 2,
    },
    modalButtonName: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'RobotoCondensed-Regular',
    },
    modalFooterContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    headerContainer: {
        width:'100%',
        paddingVertical: 11,
        borderBottomWidth:1,
        alignItems:'center',
        borderBottomColor: 'lightgray',
    },
});