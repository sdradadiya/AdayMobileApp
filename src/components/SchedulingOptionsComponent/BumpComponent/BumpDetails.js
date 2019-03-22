import React, {Component} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import {compose, graphql} from 'react-apollo';
import {Actions} from 'react-native-router-flux';
import moment from "moment/moment";
import {shiftsAssignedQuery, updateBumpMutation} from './BumpResolvers'
import TopBar from "../TopBar";
let {width} = Dimensions.get('window');

class BumpDetails extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            // these tabs should only change if employee choosing between alt bid line
            shiftsTab: true,
            altShiftsTab: false,
            shiftsAssigned: [],
            altShiftsAssigned: [],
            rejectModal: false,
            acceptModal: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let shifts = nextProps.shiftsAssigned.getShiftsByIds;
        // allow us to offer an alternative bid line that the employee can claim
        // but whenever bump is in accepted state the main bid line is the one accepted & shown
        let altShifts = nextProps.bump.rejected === null ?
                        nextProps.altShiftsAssigned.getShiftsByIds : [];
        this.setState({
            shiftsAssigned: shifts ? shifts.nodes : [],
            altShiftsAssigned: altShifts ? altShifts.nodes : []
        });
    }

    onText = (text) => {
        if(text==="text1"){
            this.setState({shiftsTab: true, altShiftsTab: false});
        }
        else {
            this.setState({shiftsTab: false, altShiftsTab: true});
        }
    }

    renderCards = ({item, index}) => {
        return(
            <View style={{flexDirection:'row',width:'100%',marginTop:12,marginBottom:5,paddingRight:25}}>
                <View style={{alignItems:'center',width:'11%',margin:6,marginTop:0}}>
                    <Text style={{fontSize:22,color:'#9c9c9c',fontWeight:'600'}}>{moment(item.startTime).format('D').toUpperCase()}</Text>
                    <Text style={{fontSize:12,color:'#3d3d3d'}}>{moment(item.startTime).format('MMM').toUpperCase()}</Text>
                    <Text style={{fontSize:12,color:'#adadad'}}>{moment(item.startTime).format('ddd').toUpperCase()}</Text>
                </View>
                <View style={{width:'89%',flexDirection:'row',elevation:5, borderRadius:3,shadowOffset:{width:1, height:1},shadowOpacity:0.5,shadowColor:'#000', padding:5}}>
                    <View style={{width:'2.5%', height:'100%', backgroundColor:'#f00', borderBottomLeftRadius:2, borderTopLeftRadius:2}}/>
                    <View style={{width:'97%',paddingLeft:5, height: 80}}>
                        <View style={{height: 30}}>
                            <Text style={{fontSize:20,fontWeight:'700', opacity:0.8}}>{item.positionByPositionId.positionName}</Text>
                        </View>
                        <Text style={{fontSize:11,top:-3,fontWeight:'600'}}>{item.positionByPositionId.brandByBrandId.brandName} | {item.workplaceByWorkplaceId.workplaceName}</Text>
                        <Text style={{fontSize:11,top:-5}}>Open</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:17}}>{moment(item.startTime).format('h:mm').toUpperCase()} </Text>
                                    <Text style={{fontSize:10,left:-3}}>{moment(item.startTime).format('a').toUpperCase()}</Text>
                                </View>
                                <View style={{flexDirection:'row',marginLeft:10}}>
                                    <Text style={{fontSize:17}}>{moment(item.endTime).format('h:mm').toUpperCase()} </Text>
                                    <Text style={{fontSize:10,left:-3}}>{moment(item.endTime).format('a').toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{
                                    marginLeft:5,
                                    fontFamily: 'Lato-Regular',
                                    fontSize: 9,
                                    width:'35%',
                                    color: '#999999',
                                }}>ESTIMATED PAYMENT</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:17}}>$ 105</Text>
                                    <Text style={{fontSize:9}}>.00</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    renderShifts = (data) => (
        <FlatList
            data={data}
            renderItem={this.renderCards}
        />
    )

    openRejectModal = () => {
        this.setState({rejectModal: true});
    };

    maximize = () => {
        this.setState({rejectModal: false}, () => {
            this.props.updateBump({
                variables: {
                    id: this.props.bump.id,
                    bumpPatch: {
                        rejected: true
                    }
                },
                // reduce the number of actions needed by one (in notifications)
                updateQueries: {
                    numBumpActionsNeeded: (previousQueryResult, {
                        mutationResult
                    }) => {
                        return {
                            numBumpActionsNeeded: previousQueryResult.numBumpActionsNeeded - 1
                        };
                    },
                }
            });
            Actions.pop();
        });
    };

    openAcceptModal = () => {
        this.setState({acceptModal: true});
    };

    understand = (alt = false) => {
        this.setState({acceptModal: false}, () => {
            let bumpPatch = {
                rejected: false
            }
            if (alt) {
                // when accepting alt bid line also set bid line id to alt id
                bumpPatch = {
                    rejected: false,
                    bidLineId: this.props.bump.altBidLineId
                }
            }
            this.props.updateBump({
                variables: {
                    id: this.props.bump.id,
                    bumpPatch: bumpPatch
                },
                // reduce the number of actions needed by one (in notifications)
                updateQueries: {
                    numBumpActionsNeeded: (previousQueryResult, {
                        mutationResult
                    }) => {
                        return {
                            numBumpActionsNeeded: previousQueryResult.numBumpActionsNeeded - 1
                        };
                    },
                }
            });
            Actions.pop();
        });
    };

    render(){
        // Display any errors
        if (this.props.shiftsAssigned.error) {
            return <Text>Error! {this.props.shiftsAssigned.error.message}</Text>;
        }
        // Display loader while fetching data
        if (this.props.shiftsAssigned.loading) {
            return (<View>
                <Text> Loading... </Text>
            </View>);
        }
        let bumpId = this.props.bump.id;
        let isShifts = this.state.shiftsAssigned && this.state.shiftsAssigned.length > 0;
        let isAltShifts = this.state.altShiftsAssigned && this.state.altShiftsAssigned.length > 0;

        let shiftDisplay = (
            <Text style={{lineHeight: 15, color: "#999999", marginTop: 8}}>No Shifts Assigned</Text>
        );
        let rejectButtonText = "REJECT BUMP";
        let acceptButtonText = "ACCEPT BUMP";
        let extraRejectText = "";
        let extraAcceptText = "";
        if (!isShifts) {
            // inform user that they have been bumped out
            shiftDisplay = (
            <View>
                <Text style={{ fontSize: 16 }}>
                   There were no suitable shifts to offer you. {'\n'}
                   You may have to request open shifts to work this week. {'\n'}
                   Contact a manager if you have any questions.
                </Text>
            </View>);
        }
        if (isShifts && !isAltShifts) {
            shiftDisplay = this.renderShifts(this.state.shiftsAssigned);
        }
        if (isShifts && isAltShifts) {
            shiftDisplay = (
                <View style={{height: '100%', paddingBottom: 0}}>
                    <TopBar label={["Bumped Up Schedule","Your Last Schedule"]}
                            labelColor={[this.state.shiftsTab,this.state.altShiftsTab]} onText={this.onText}/>
                    <ScrollView>
                    {/* default to bid line shifts (bumped schedule), can switch to alt bid line shifts (original schedule) */}
                        {this.state.shiftsTab ?
                            this.renderShifts(this.state.shiftsAssigned)
                            :
                            this.renderShifts(this.state.altShiftsAssigned)
                        }
                    </ScrollView>
                </View>
            );
            rejectButtonText = "Reject";
            extraRejectText = "Both Schedules";
            acceptButtonText = "Accept";
            extraAcceptText = (this.state.shiftsTab ? "Bumped Up Schedule" : "Last Schedule");
        }
        return(
            <View style={styles.container}>
                <View style={{height: '91%', paddingBottom: 0}}>
                    {shiftDisplay}
                </View>
                {/* add message or modal when rejecting to say "you will not be assigned ____?*/}
                {this.props.bump.rejected == null ?
                    <View style={styles.buttonContainer}>
                        {/*offer feedback option in tentative (first) stage of bumping process*/}
                        <TouchableOpacity style={extraRejectText === "" ? styles.rejectButton : styles.rejectExtraButton}
                                          onPress={() => this.openRejectModal()}>
                            <Text style={styles.buttonText}>{rejectButtonText}</Text>
                            <Text style={styles.smallButtonText}>{extraRejectText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={extraAcceptText === "" ? styles.confirmButton : styles.confirmExtraButton}
                                          onPress={() => this.openAcceptModal()}>
                            <Text style={styles.buttonText}>{acceptButtonText}</Text>
                            <Text style={styles.smallButtonText}>{extraAcceptText}</Text>
                        </TouchableOpacity>
                    </View> :
                    <View style={styles.buttonContainer}>
                        {/*if feedback already given, or assignment final (stage 2), just offer ok button*/}
                        <TouchableOpacity style={styles.okButton}
                                          onPress={() => Actions.pop()}>
                            <Text style={styles.buttonText}>OKAY, GOT IT</Text>
                        </TouchableOpacity>
                    </View>}
                <Modal
                    transparent={true}
                    transparent={true}
                    visible={this.state.rejectModal}
                    onRequestClose={this.state.rejectModal}
                    animate="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                resizeMode="contain" style={{width: 140, height: 140}}
                                source={require('../../assets/schedule_warning.png')}
                            />
                            <Text style={styles.modalTextTitle}>
                                {'Confirm Maximization'}
                            </Text>
                            <Text style={styles.modalText}>
                                {'By declining your bump, your employer will attempt to maximize your hours'}
                            </Text>

                            <View style={{marginTop:5}}>
                                <TouchableOpacity onPress={() => this.setState({rejectModal: false})} style={[styles.modalButtonContainer, {backgroundColor:'rgba(232, 49, 43, 1)'}]}>
                                    <Text style={styles.modalButtonName}>GO BACK</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => this.maximize()} style={styles.modalButtonContainer}>
                                    <Text style={styles.modalButtonName}>OKAY, MAXIMIZE ME</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.modalFooterContainer}>
                            <TouchableOpacity onPress={() => this.setState({rejectModal: false})}>
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
                    visible={this.state.acceptModal}
                    onRequestClose={this.state.acceptModal}
                    animate="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                resizeMode="contain" style={{width: 140, height: 140}}
                                source={require('../../assets/schedule_warning.png')}
                            />
                            <Text style={styles.modalTextTitle}>
                                {'Schedule Almost Final'}
                            </Text>
                            <Text style={styles.modalText}>
                                {'If a more senior employee declines their bump, then your schedule may change'}
                            </Text>

                            <View>
                                <TouchableOpacity onPress={() => this.understand(this.state.altShiftsTab)} style={styles.modalButtonContainer}>
                                    <Text style={styles.modalButtonName}>OKAY, I UNDERSTAND</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.modalFooterContainer}>
                            <TouchableOpacity onPress={() => this.setState({acceptModal: false})}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 50, height: 50, borderWidth: 0}}
                                    source={require('../../assets/profile-icons/close-button-modal.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default compose (
    graphql(shiftsAssignedQuery,
        {name: "shiftsAssigned",
            options: (ownProps) => ({
                variables: {
                    // array of shiftIds assigned (via bid line)
                    ids: ownProps.bump.bidLineByBidLineId ? ownProps.bump.bidLineByBidLineId.shifts : []
                }
            })}),
    graphql(shiftsAssignedQuery,
            {name: "altShiftsAssigned",
                options: (ownProps) => ({
                    variables: {
                        // array of shiftIds assigned (via bid line)
                        ids: ownProps.bump.bidLineByAltBidLineId ? ownProps.bump.bidLineByAltBidLineId.shifts : []
                    }
                })}),
    graphql(updateBumpMutation, {name: 'updateBump'}),
)(BumpDetails);

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'flex-start',
        backgroundColor: '#F7F7F7',
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50
    },
    confirmButton: {
        backgroundColor:'rgb(0,164,99)',
        padding:15,
        width: '50%'
    },
    rejectButton: {
        backgroundColor:'rgb(227,56,33)',
        padding:15,
        width: '50%'
    },
    confirmExtraButton: {
        backgroundColor:'rgb(0,164,99)',
        padding:7,
        width: '50%'
    },
    rejectExtraButton: {
        backgroundColor:'rgb(227,56,33)',
        padding:7,
        width: '50%'
    },
    okButton: {
        backgroundColor:'rgb(0,164,99)',
        padding:10,
        width:'100%'
    },
    buttonText: {
        color:'white',
        alignSelf:'center',
        fontSize:18,
        fontWeight:'bold'
    },
    smallButtonText: {
        color:'white',
        alignSelf:'center',
        fontSize:14,
        fontWeight:'bold'
    },
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