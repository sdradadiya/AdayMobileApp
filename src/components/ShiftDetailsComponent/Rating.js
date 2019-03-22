import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    AsyncStorage
} from 'react-native';
import  Rating from 'react-native-easy-rating';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import { gql, graphql } from 'react-apollo';
import moment from 'moment';
const {width} = Dimensions.get('window');
import SpinnerComponent from './../SpinnerComponent';
import uuidv1 from 'uuid/v1';
//import {Tracker} from "../../constants/index";

class Rate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            rateText: "",
            isPublic: true,
            startTime: '',
            endTime: '',
            noRateError: false,
            isLoading: false
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.formatAMPM = this.formatAMPM.bind(this);
        this.handleShiftData = this.handleShiftData.bind(this);
       //Tracker.trackScreenView("Rate");

    }

    componentDidMount() {
        Object.keys(this.props.shiftDetails).length && this.handleShiftData(this.props.shiftDetails);
    }

    componentWillReceiveProps(nextProps) {
        Object.keys(nextProps.shiftDetails).length && this.handleShiftData(nextProps.shiftDetails);
    }

    handleShiftData(shiftDetails){
        const startTime = this.formatAMPM(new Date(shiftDetails.startTime));
        const endTime = this.formatAMPM(new Date(shiftDetails.endTime));
        const rate = shiftDetails.marketsByShiftId.edges["0"].node.ratingsByMarketId.edges.node ? shiftDetails.marketsByShiftId.edges["0"].node.ratingsByMarketId.edges.node.rating : 0;
        this.setState({
            startTime,
            endTime,
            rate
        })
    }

    formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    onTextChange(event) {
        const {contentSize, text} = event.nativeEvent;
        this.setState({
            rateText: text
        });
    }

    onSubmitPress() {
        const {rateText, rate} = this.state;
        const that = this;
        if(!rate){
            this.setState({noRateError: true});
            return
        }
        const ratingDate = moment().format();
        rating = {}
        rating["id"] = uuidv1();
        rating["marketId"] = this.props.shiftDetails.marketsByShiftId.edges["0"].node.id
        rating["raterId"] = this.props.shiftDetails.marketsByShiftId.edges["0"].node.workerId
        rating["rating"] = rate
        rating["ratingDate"] = ratingDate
        rating["comment"] = rateText
        rating["workplaceId"] = this.props.shiftDetails.workplaceId
        if (this.props.shiftDetails.managersOnShift[0]) {
            rating["rateeId"] = this.props.shiftDetails.managersOnShift[0]
        }
        this.setState({isLoading: true});
            this.props.createRating({variables: {data: { rating }}})
                .then((response)=>{
                    AsyncStorage.getItem('email').then((value)=>{
                       //Tracker.trackEvent(value, "Create Rate");
                    }).catch((err)=>{
                       //Tracker.trackEvent("Not Define", "Create Rate");
                    })
                    //const newShiftDetails = that.props.shiftDetails;
                    //newShiftDetails.marketsByShiftId.edges.node.ratingsByMarketId.edges.node.rating = rate;
                    //newShiftDetails.marketsByShiftId.edges.node.ratingsByMarketId.edges.node.comment = rateText;
                    //newShiftDetails.marketsByShiftId.edges.node.ratingsByMarketId.edges.node.ratingDate = ratingDate;
                    //that.props.actions(updateShiftDetails(newShiftDetails));
                    AsyncStorage.getItem('email', (err, email) => {
                        Actions.Account({email: email})
                    });
                });
    }

    onPublicPress() {
        this.setState({isPublic: true});
    }

    onAnonymousPress() {
        this.setState({isPublic: false});
    }

    render() {
        const {startTime, endTime, rate, noRateError} = this.state;

        return (
            <View style={{flex: 1, paddingHorizontal: 10}}>
                {this.state.isLoading &&
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent />
                </View>
                }
                <View style={styles.card}>
                    <Text>Timeclock Details</Text>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View style={{flexDirection: "row", marginHorizontal: 10 }}>
                            <Image resizeMode="contain"
                                   style={{width: 30, height: 30}}
                                   source={require('./../assets/startTime.png')}
                            />
                            <View style={{marginLeft: 10}}>
                                <Text>{startTime}</Text>
                                <Text style={{fontSize: 10}}>START TIME</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", marginLeft: 40}}>
                            <Image resizeMode="contain"
                                   style={{width: 30,height: 30}}
                                   source={require('./../assets/endTime.png')}
                            />
                            <View style={{marginLeft: 10}}>
                                <Text>{endTime}</Text>
                                <Text style={{fontSize: 10}}>END TIME</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text>Rate Chao Center Workplace</Text>
                    <View style={{marginTop: 10}}>
                        <Rating
                            rating={rate}
                            max={5}
                            iconWidth={40}
                            iconHeight={40}
                            iconSelected={require('./../assets/temp/full.png')}
                            iconUnselected={require('./../assets/temp/stroke.png')}
                            onRate={(rate) => this.setState({rate})}/>
                    </View>
                </View>

                <View style={styles.card}>
                    <View>
                        <Text>
                            What went well? What didn't go so well? (Optional)
                        </Text>
                    </View>
                    <View style={{height: 80, width: width-40, borderWidth: 0, marginTop: 8}}>
                        <TextInput
                            multiline
                            editable
                            numberOfLines={4}
                            style={{ height: 70 }}
                            onChange={this.onTextChange}
                            value={this.state.rateText}
                        />
                    </View>
                </View>
                {/*      <View style={styles.card}>
                 <View  style={{ flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                 <Button
                 onPress={() => this.onPublicPress()}
                 containerStyle={this.state.isPublic ? styles.activeButton : styles.passiveButton}
                 style={this.state.isPublic ? styles.activeButtonText : styles.passiveButtonText}>
                 PUBLIC
                 </Button>
                 <Button
                 onPress={() => this.onAnonymousPress()}
                 containerStyle={!this.state.isPublic ? styles.activeButton : styles.passiveButton}
                 style={!this.state.isPublic ? styles.activeButtonText : styles.passiveButtonText}>
                 ANONYMOUS
                 </Button>
                 </View>
                 </View>*/}
                {noRateError &&
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Please Rate Before Submit!</Text>
                </View>
                }
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Button
                        onPress={() => this.onSubmitPress()}
                        containerStyle={styles.saveButton}
                        style={{color: 'white'}}>
                        SUBMIT
                    </Button>
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 3, marginBottom: 30}}>
                    <Button
                        containerStyle={styles.shiftDetailsButton}
                        onPress={() => Actions.ShiftDetails({showDetails: true, shiftId: this.props.shiftId,  marketId: this.props.marketId, worker: this.props.worker, workersInvited: this.props.workersInvited, workersAssigned: this.props.workersAssigned })}
                        style={{color: 'black', fontSize: 16}}>
                        SHIFT DETAILS
                    </Button>
                </View>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    card: {
        paddingVertical: 10,
    },
    activeButton: {
        padding: 3,
        height: 25,
        width: width / 2 - 20,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#007AFF'
    },
    activeButtonText: {
        fontSize: 15,
        color: 'white'
    },
    passiveButton: {
        padding: 3,
        height: 25,
        width: width / 2 - 20,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#007AFF'
    },
    passiveButtonText: {
        fontSize: 15,
        color: '#007AFF'
    },
    saveButton: {
        padding: 7,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        backgroundColor: '#0022A1',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        height: 35,
        width: width / 2,
    },
    shiftDetailsButton: {
        padding: 7,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        height: 35,
        width: width / 2,
    }
});
const createRating = gql`
  mutation createRating($data: CreateRatingInput!) {
    createRating(input:$data) {
	    rating{
	      rating
	    }
  	}
  }`
export default graphql(createRating, {
        name: 'createRating'
    })(Rate);
