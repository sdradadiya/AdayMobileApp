/**
 * Created by Kendall on 7/5/2017
 */
import React, {Component} from 'react';
import {graphql } from 'react-apollo';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    AsyncStorage
} from 'react-native';
import Modal from 'react-native-modal';
import { userTimeOffRequestQuery, deleteTimeOffRequestMutation} from './TimeOffQueries';
import moment from 'moment';
//import {Tracker} from "../../constants/index";
const uuidv4 = require('uuid/v4');

class TimeOffRequestsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsPopup: false,
            confirmDeletePopup: false,
        };
        this.detailsPopupChange = this.detailsPopupChange.bind(this);
        this.confirmDeletePopupChange = this.confirmDeletePopupChange.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
       //Tracker.trackScreenView("TimeOff Request Deatil");

    }
    detailsPopupChange() {
        this.setState({detailsPopup: !this.state.detailsPopup});
    }
    confirmDeletePopupChange() {
        this.setState({confirmDeletePopup: !this.state.confirmDeletePopup});
    }
    deleteRequest() {
        let data = {"data": {"clientMutationId": uuidv4(),
                             "id": this.props.details.id}};
        this.props.mutate({variables: data, refetchQueries:[{query: userTimeOffRequestQuery,
                                                            variables: { requestorId: this.props.userId, }}]})
            .then((res)=>{
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Delete TimeOffRequest");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "Delete TimeOffRequest");
                })
            })
            .catch((err)=>{
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
            })
        this.confirmDeletePopupChange();
        this.detailsPopupChange();
    }
    generateMessage(details) {
        switch (details.decisionStatus) {
            case "PENDING":
                return 'Submitted: ' + moment(details.submissionDate).format('MMMM Do');
            case 'APPROVED':
                if (details.minutesPaid > 0) {
                    return 'Approved - Paid Minutes: ' + details.minutesPaid;
                } else {
                    return 'Approved - Unpaid';
                }
            case 'DENIED':
                return 'Denied';
            default:
                return 'Past'; //Previously "Unrecognized Status"
        }
    }
    render() {
        let details = this.props.details;
        var oneDate = null 
        var timeRange = "(12:00 AM - 11:59pm)"
        if (details.startDate == details.endDate){
            oneDate =  moment(details.endDate).format('MMMM Do, YYYY')
        } else {
           oneDate = moment(details.startDate).format('MMMM Do') + " to " + moment(details.endDate).format('MMMM Do, YYYY');
        }
        let submissionDay = details.submissionDate? moment(details.submissionDate).format('MMMM Do'): "N/A";
        return (
            <TouchableOpacity style={styles.preferenceContainer} onPress={this.detailsPopupChange}>
                <View style={styles.preferenceTopContainer}>
                    <View style={{marginRight: 20}}>
                    </View>

                    <View>
                        <Text style={styles.preferenceName}>
                          Time Off Request
                        </Text>
                        <Text style={styles.preferenceDescription}>
                           { oneDate }
                        </Text>
                    </View>
                </View>

                <Text style={styles.supplementalText}>
                    {this.generateMessage(details)}
                </Text>

                <Modal isVisible={this.state.detailsPopup}>
                    { this.state.confirmDeletePopup?
                        <View style={styles.miniModal}>
                            <Text style={styles.detailText}>
                                Are you sure?
                            </Text>
                            <TouchableOpacity onPress={this.deleteRequest} style={styles.deleteButton}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.confirmDeletePopupChange} style={styles.closeButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.detailsContainer}>
                            <Text style={styles.headerText}>
                                Request Details
                            </Text>
                            <Text style={styles.detailText} numberOfLines={7}>
                                <Text style={{fontWeight: 'bold'}}>Time Range: </Text>
                                { oneDate } { timeRange } {"\n"}
                                <Text style={{fontWeight: 'bold'}}>Submitted: </Text>
                                {submissionDay} {"\n"}
                                <Text style={{fontWeight: 'bold'}}>Paid Minutes: </Text>
                                {details.minutesPaid} {"\n"}
                                <Text style={{fontWeight: 'bold'}}>Status: </Text>
                                {details.decisionStatus} {"\n"}
                                <Text style={{fontWeight: 'bold'}}>Request Type: </Text>
                                {details.requestType} {"\n"}
                                <Text style={{fontWeight: 'bold'}}>Pay Date: </Text>
                                {details.payDate ? moment(details.payDate).format('MMMM Do, YYYY') : "N/A"} {"\n"}
                                <Text style={{fontWeight: 'bold'}}>Notes: </Text>
                            </Text>
                            <View style={styles.notesContainer}>
                                <ScrollView>
                                <Text style={styles.detailText}>
                                    {details.notes ? details.notes : ""}
                                </Text>
                                </ScrollView>
                            </View>
                            {  moment(details.startDate).isBefore(moment().format())? 
                            <Text> Time off request has past. </Text>:
                            <TouchableOpacity onPress={this.confirmDeletePopupChange} style={styles.deleteButton}>
                                <Text style={styles.buttonText}>Delete Request</Text>
                            </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={this.detailsPopupChange} style={styles.closeButton}>
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        }
                </Modal>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        ...Platform.select({
            ios: {
                marginTop: 64
            },
            android: {
                marginTop: 54
            }
        }),
        borderRadius: 12,
        marginBottom: 45,
    },
    miniModal: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        marginTop: '55%',
        marginHorizontal: '5%',
        borderRadius: 12,
        marginBottom: '50%',
    },
    notesContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 10,
        marginBottom: 9,
    },
    preferenceContainer: {
        width: "96%",
        marginBottom: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: 'white',
        shadowRadius: 2,
        shadowColor: '#999',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    preferenceTopContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingLeft: 15,
        borderBottomColor: '#C9C9C9',
    },
    headerText: {
        fontSize: 24,
        paddingHorizontal: 20,
        color: '#0022A1',
        textAlign: 'center',
    },
    detailText: {
        fontSize: 18,
        lineHeight: 30,
        paddingHorizontal: 20,
        paddingVertical: 4,
        color: '#000000',
        textAlign: 'justify',
    },
    preferenceName: {
        fontSize: 16,
        color: '#0022A1',
    },
    preferenceDescription: {
        fontSize: 12,
        color: '#4A4A4A',
    },
    supplementalText: {
        fontSize: 12,
        marginLeft: 15,
        color: '#4A4A4A',
    },
    closeButton: {
        marginTop: 10,
        padding: 7,
        height: 40,
        width: 200,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#0022A1',
        alignItems: 'center',
        marginBottom: 25,
        justifyContent:'center'
    },
    deleteButton: {
        marginTop: 15,
        padding: 7,
        height: 40,
        width: 200,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#d80202',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default graphql(deleteTimeOffRequestMutation)(TimeOffRequestsDetails);
