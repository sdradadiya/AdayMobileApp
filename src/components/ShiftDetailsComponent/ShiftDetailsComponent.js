import React, {Component} from 'react';
import {Row, List, ListItem, Button, Input, Thumbnail} from 'native-base';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    Platform,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';
import Modal from 'react-native-simple-modal';
import Communications from 'react-native-communications';
import Header from './Header';
import Details from './Details';
import Rate from './Rating';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {gql, graphql} from 'react-apollo';
import {compose} from 'react-apollo';

let {width} = Dimensions.get('window');
//import {Tracker} from "../../constants/index";

class ShiftDetailsComponent extends Component {
    constructor(props) {
        super(props);
        let start = moment(this.props.start);
        let end = moment(this.props.end);
        let CurrentDate = moment();
        let duration = moment.duration(start.diff(CurrentDate));
        let hours = duration.asHours();
        let btnText;

        if ( ( CurrentDate.isAfter(start) && CurrentDate.isBefore(end) ) || hours <= 1 ){
            btnText = true
        }
        else{
            btnText = false
        }

        this.state = {
            showDetails: true,
            showMap: false,
            showModal: false,
            isLoading: false,
            error: null,
            btnText
        };

        //Tracker.trackScreenView("Shift Details");

    }

    componentDidMount() {
        const showDetails = (this.props.buttonType === 'INFO') ? !(shiftDetails.type === 'CLOCKED IN' || shiftDetails.type == 'PAST SHIFT') : this.props.showDetails;
        const showMap = this.props.showMap;

        this.setState({
            showDetails,
            showMap
        });
    }

    showModal() {
        /*'Because this shift starts in less than 24 hours, ' +*/
        return(
            <Modal
                offset={200}
                open={this.state.showModal}
                overlayBackground={'rgba(0, 0, 0, 0.4)'}
                modalDidOpen={() => undefined}
                modalDidClose={() => this.setState({showModal: false})}
                containerStyle={styles.modalContainer}
                modalStyle={styles.modalContentContainer}
            >   
                <View>
                    <View style={styles.modalContent}>
                        <Image
                            resizeMode="contain"
                            style={{width: 140, height: 140}}
                            source={require('../assets/profile-icons/contact-info.png')}
                        />
                        <Text style={styles.modalText}>
                            {'The workplace has requested you call to cancel this shift'}
                        </Text>

                        <View>
                            <TouchableOpacity onPress={() => this.makeCall()} style={styles.modalButtonContainer}>
                                <Text style={styles.modalButtonName}>CALL NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modalFooterContainer}>
                        <TouchableOpacity onPress={() => this.setState({showModal: false})}>
                            <Image
                                resizeMode="contain"
                                style={{width: 50, height: 50, borderWidth: 0}}
                                source={require('../assets/profile-icons/close-button-modal.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    makeCall = () => {
        const shiftDetails = this.props.state.schedules[this.props.shiftId];
        const phoneNumber = shiftDetails.workplacePhoneNumber;
        if(phoneNumber){
            Communications.phonecall(phoneNumber, false);
            AsyncStorage.getItem('email').then((value)=>{
                //Tracker.trackEvent(value, "Phone call");
            }).catch((err)=>{
                //Tracker.trackEvent("Not Define", "Phone call");
            })
            //this.declineShift();
        }else {
            alert('Workplace Phone number not available');
        }
    };

    declineShift = (withdraw = false) => {
        let shiftData = {id: this.props.marketId, workerResponse: 'NO', isPending: false, employeeDateResponded: moment().format(), isBooked: false}
        if (withdraw) {
            shiftData.workerResponse = 'NONE';
        }
        this.setState({isLoading: true});
        this.props.updateShiftUser({
            variables: shiftData,
            updateQueries: {
                userShifts: (previousQueryResult, {
                    mutationResult
                }) => {
                    let market = mutationResult.data.updateMarketById.market;
                    previousQueryResult.allUserShiftsMobiles.nodes.map((node) => {
                        // find the specific market and change the response
                        if (node.marketId == market.id) {
                            node.workerResponse = market.workerResponse;
                        }
                    });
                    return {
                        allUserShiftsMobiles: previousQueryResult.allUserShiftsMobiles
                    };
                },
            }
        }).then((res) => {
                const worker = this.props.worker;
                const invited = this.props.workersInvited
                    ? this.props.workersInvited.filter(x => (x !== worker))
                    : null;
                const assigned = this.props.workersAssigned.filter(x => (x !== worker));
                AsyncStorage.getItem('email').then((value)=>{
                    //Tracker.trackEvent(value, "Decline Shift");
                }).catch((err)=>{
                    //Tracker.trackEvent("Not Define", "Decline Shift");
                })

                Actions.pop();
                /*this.props.updateShift({variables: {id: this.props.shiftId, workersInvited: invited, workersAssigned: assigned}})
                    .then(() => {
                            this.setState({isLoading: false});
                             Actions.pop();
                    });
                */
            }).catch(err => {
                this.setState({isLoading: false, error: 'Error Occurred, Check your internet connection and refresh shifts by clicking on logo at the top of the screen.'});
                Actions.pop();
        })
    }

    acceptShift = () => {
        this.setState({isLoading: true, showModal: false});
        var shiftData = {}
        
        if (this.state.isFromPhoneTree == true){
         shiftData = {id: this.props.marketId, workerResponse: 'YES', employeeDateResponded: moment().format(), isBooked: false}
        } else {
         shiftData = {id: this.props.marketId, workerResponse: 'YES', isPending: true, employeeDateResponded: moment().format(), isBooked: false}
        }
        
        this.props.updateShiftUser({
            variables: shiftData,
            updateQueries: {
                userShifts: (previousQueryResult, {
                    mutationResult
                }) => {
                    let market = mutationResult.data.updateMarketById.market;
                    previousQueryResult.allUserShiftsMobiles.nodes.map((node) => {
                        // find the specific market and change the response
                        if (node.marketId == market.id) {
                            node.workerResponse = market.workerResponse;
                        }
                    });
                    return {
                        allUserShiftsMobiles: previousQueryResult.allUserShiftsMobiles
                    };
                },
            }
            }).then(() => {
                const worker = this.props.worker;
                const invited = this.props.workersInvited
                    ? this.props.workersInvited.filter(x => (x !== worker))
                    : null;

                var newAssigned = []
                this.props.workersAssigned.map(function(user){
                    newAssigned.push(user)
                })
                newAssigned.push(worker)
                /*if (this.props.isFromPhoneTree == true) {
                    this.props.updateShift({variables: {id: this.props.shiftId, workersInvited: invited, workersAssigned: newAssigned }})
                       .then(() => {
                            this.setState({isLoading: false});
                           AsyncStorage.getItem('email').then((value)=>{
                               //Tracker.trackEvent(value, "Update Shift");
                           }).catch((err)=>{
                               //Tracker.trackEvent("Not Define", "Update Shift");
                           })

                           Actions.pop();
                        })
                        .catch((err)=>{
                            Alert.alert('Aday','Your Request Couldn\'t Be Completed');
                        })

                } else {
                    Actions.pop();
                }
                */ 
                Actions.pop();
            }).catch(err => {
                Alert.alert('Your Request Was Not Placed' ,'Shift has been filled or deleted.');
                this.setState({isLoading: false});
                Actions.pop();
        })
    }

    render() {
        const {showDetails, showMap} = this.state;
        const shiftDetails = this.props.state.schedules[this.props.shiftId] || this.props.shiftDetails;
        if(this.state.error) alert(this.state.error);

        return (
            <View style={{flex: 1}}>
                {this.showModal()}
                    {!showMap &&
                        <Header
                            isMap={this.state.btnText}
                            locationCoor={this.props.locationCoor}
                            positionName={this.props.positionName}
                            brandName={this.props.brandName}
                            workplaceName={this.props.workplaceName}
                            workplaceImageUrl={this.props.workplaceImageUrl}
                        />
                    }
                    {!showMap &&
                        <View style={{flex: 1}}>
                            {showDetails && <Details shiftDetails={shiftDetails} marketId={this.props.marketId} worker={this.props.worker} workersInvited={this.props.workersInvited}
                                                     countdownText={this.props.countdownText}
                                                     clockOutDate={this.props.clockOutDate}
                                                     clockInDate={this.props.clockInDate}
                                                     locationCoor={this.props.locationCoor}
                                                     address={this.props.addressJson}
                                                     // arrayShift = {this.props.arrayShift}
                                                     zipCode={this.props.zipCode}
                                                     fromDecline={this.props.fromDecline}
                                                     payment={this.props.payment}
                                                     end={this.props.end}
                                                     start={this.props.start}
                                                     wage={this.props.wage}
                                                     tentative={this.props.tentative}
                                                     workersAssigned={this.props.workersAssigned}
                                                     shiftId={this.props.shiftId}
                                                     status={this.props.status}
                                                     openModal={() => this.setState({ showModal: true })}
                                                     isLoading={this.state.isLoading}
                                                     clockInShift={this.props.clockInShift}
                                                     declineShift={this.declineShift}
                                                     acceptShift={this.acceptShift}
                                                     alldata={this.props.alldata}
                            />}
                            {!showDetails && <Rate actions={this.props.action} shiftId={this.props.shiftId} shiftDetails={shiftDetails} marketId={this.props.marketId}
                                                   worker={this.props.worker} workersInvited={this.props.workersInvited} workersAssigned={this.props.workersAssigned}/>}
                        </View>
                    }
            </View>
        );
    }
}

const updateShiftUser = gql`
  mutation updateMarket($id: Uuid!, $workerResponse: ResponseStatus!, $employeeDateResponded: Datetime!, $isBooked: Boolean! ) {
    updateMarketById(input: { id: $id , marketPatch: {workerResponse: $workerResponse, employeeDateResponded: $employeeDateResponded, isBooked: $isBooked }}) {
	    market{
	      id
	      workerResponse
	      shiftId
	    }
  	}
  }`;

const updateShift = gql`
  mutation updateShift($id: Uuid!, $workersInvited: [Uuid], $workersAssigned: [Uuid] ) {
    updateShiftById(input: { id: $id , shiftPatch: {workersInvited: $workersInvited, workersAssigned: $workersAssigned }}) {
	    shift{
	      id
	      workersAssigned
	    }
  	}
  }`;


export default compose(
    graphql(updateShiftUser, {
        name: 'updateShiftUser'
    }),
    graphql(updateShift, {
        name: 'updateShift'
    })
)(ShiftDetailsComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 0
            },
            android: {
                paddingTop: 0
            }
        }),
    },
    modalContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 100,
    },
    modalContentContainer: {
        marginTop: 110,
        width: width * 0.8,
        padding: 0,
        borderRadius: 5,
        backgroundColor: 'transparent'
    },
    modalContent: {
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderRadius: 5,
        padding: 10,
        borderColor: 'rgb(153,153,153)',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    modalText: {
        alignItems: 'center',
        color: '#888',
        textAlign: 'center',
        paddingVertical: 15,
        width: width * 0.715,
        fontSize: 15
    },
    modalButtonContainer: {
        backgroundColor:'#00A863',
        width: width * 0.55,
        height:40,
        alignItems:'center',
        justifyContent:'center',
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
});
