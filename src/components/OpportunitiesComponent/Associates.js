/* @flow*/

import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';
import {
    Actions
} from 'react-native-router-flux';

/**
 * As an existing employee or job seeker, I want to be able to apply to jobs with one click using my profile so that I * can obtain employment as fast as possible
 *
 * @author Robert
 * @type {[type]}
 */
export default class Associates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegisteredUser: true,
            isApplied: false
        };
    }

    onFirstButtonPress() {
        if (this.state.isRegisteredUser) {
            this.setState({
                isApplied: true
            });
            return
        }
        Actions.SignUp({});
    }

    onSecondButtonPress() {

    }

    getAppliedView() {
        return (
            <View style={styles.waitingStyle}>
                <Text style={{ fontSize: 12, color: 'white' }}>APPLIED</Text>
            </View>
        )
    }

    render() {
        let firstButtonText = "SIGN UP TO APPLY";
        let secondButtonText = "I ALREADY HAVE AN ACCOUNT";

        if (this.state.isRegisteredUser && !this.state.isApplied) {
            firstButtonText = "APPLY";
            secondButtonText = "EDIT PROFILE"
        }

        if (this.state.isRegisteredUser && this.state.isApplied) {
            firstButtonText = "YOU'VE ALREADY APPLIED";
            secondButtonText = "EDIT PROFILE"
        }

        return (
            <View style={{ flex : 1, backgroundColor: 'white' }}>
                <View style={ styles.header }>
                    <View style={{ position: 'absolute', top: -64 }}>
                        <Image
                            style={{ height: 210 }}
                            source={ require('./../assets/temp/building.png') }
                        />
                    </View>
                </View>
                <View style={ styles.body }>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <TouchableOpacity onPress={()=> Actions.Opportunities({})} style={ styles.shadowStyle }>
                                <Image
                                    style={ [{ height: 70, width: 70, resizeMode: 'contain', position: 'absolute', top: -25 }]}
                                    source={ require('./../assets/logos/logo1.png') }
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 10, paddingTop: 10 }}>
                            <Text>Chao Center</Text>
                            <Text style={ styles.textStyle }>1585 Massachusetts Ave, Cambridge 0 mi away</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Cashier, Part-Time</Text>
                            {this.state.isApplied && this.getAppliedView()}
                        </View>
                        <Text style={{ marginTop: 10, fontSize: 12, color: '#a9a9a9' }}>We have an opening for a part-time CASHIER position. Location: Harvard Law School</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={ styles.textStyle }>Schedule: P/T Schedule, more details upon interview.</Text>
                        <Text style={ styles.textStyle }>requirement: No experience required.</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={ styles.textStyle }>If you have a positive attitude and a love for learning, you may be interested in joining our team.</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={ styles.textStyle }>
                            Summary: Performs cashiering duties, including making cash transactions, verifying cash drawer,
                            giving change, counting cash receipts and completing cash reports. may also perform general
                            food service work. maintains sanitation standards in the preparation, service and dining room facilities
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
                        <Button
                            onPress={() => this.onFirstButtonPress()}
                            disabled={this.state.isApplied}
                            containerStyle={styles.saveButton}
                            style={{ fontSize: 14, color: 'white' }}>
                            {firstButtonText}
                        </Button>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.onSecondButtonPress()}>
                            <Text style={{ color: 'blue', fontSize: 12 }}>{secondButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 15,
        flex: 1,
        marginTop: 150
    },
    shadowStyle: {
        height: 45,
        width: 70,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    textStyle: {
        fontSize: 12,
        color: '#a9a9a9'
    },
    saveButton: {
        padding: 7,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        backgroundColor: '#0022A1',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        height: 35,
        width: 200,
    },
    waitingStyle: {
        paddingHorizontal: 10,
        paddingVertical: 1,
        backgroundColor: 'red',
        borderRadius: 20,
        marginLeft: 50,
        width: 70
    }
});
