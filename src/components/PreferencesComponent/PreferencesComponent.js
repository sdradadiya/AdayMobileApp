/* @flow */

import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
//import {Tracker} from "../../constants/index";

/**
 * @description This component is used for employees to enter into the system their preferences for job scheduling
 * As an employee, I want to submit my preferences for the weekly work schedule so that I can begin to design and craft my schedule for the week.
 *
 * @author Kendall
 * Date Created: 6/28/2017
 * @type {Object}
 */
export default class PreferencesComponent extends Component {

    constructor(props){
        super(props);
       //Tracker.trackScreenView("Opportunities Filter");
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.preferenceContainer}>
                    <View style={styles.preferenceTopContainer}>
                        <View>
                            <Text style={styles.preferenceName}> Time Off Requests  </Text>
                            <Text style={styles.preferenceDescription}>
                                Use this preference to submit time off requests
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.preferenceDescription}>
                        You have no pending vacation requests
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceContainer}>
                    <View style={styles.preferenceTopContainer}>
                        <Image style={{width: 40, height: 40}} source={require('./assets/Certification.png')}/>
                        <View>
                            <Text style={styles.preferenceName}> Certification  </Text>
                            <Text style={styles.preferenceDescription}>
                                Which position do you enjoy working the most?
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.preferenceDescription}>
                        You currently have no preferred certification
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceContainer}>
                    <View style={styles.preferenceTopContainer}>
                        <Image style={{width: 40, height: 40}} source={require('./assets/Location.png')}/>
                        <View>
                            <Text style={styles.preferenceName}> Location  </Text>
                            <Text style={styles.preferenceDescription}>
                                Which location do you enjoy working at the most?
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.preferenceDescription}>
                        You currently have no preferred location
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceContainer}>
                    <View style={styles.preferenceTopContainer}>
                        <Image style={{width: 40, height: 40}} source={require('./assets/People.png')}/>
                        <View>
                            <Text style={styles.preferenceName}> People  </Text>
                            <Text style={styles.preferenceDescription}>
                                What people do you like to work together with?
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.preferenceDescription}>
                        You currently have no preferred manager or coworkers
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceContainer}>
                    <View style={styles.preferenceTopContainer}>
                        <Image style={{width: 40, height: 40}} source={require('./assets/Time of Day.png')}/>
                        <View>
                            <Text style={styles.preferenceName}> Time  </Text>
                            <Text style={styles.preferenceDescription}>
                                Which times do you want to work?
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.preferenceDescription}>
                        You currently have no preferred weekdays or start/end times
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.preferenceContainer}>
                    <View style={styles.preferenceTopContainer}>
                        <Image style={{width: 40, height: 40}} source={require('./assets/Timer.png')}/>
                        <View>
                            <Text style={styles.preferenceName}> Shifts  </Text>
                            <Text style={styles.preferenceDescription}>
                                Rank your favorite shifts to work. (Overrides other preferences (?))
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.preferenceDescription}>
                        You currently have no preferred shifts
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 5,
        backgroundColor: '#F7F7F7'
    },
    preferenceContainer: {
        marginTop: 5,
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: 'white',
    },
    preferenceTopContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingLeft: 15,
        borderBottomColor: '#C9C9C9',
    },
    preferenceName: {
        fontSize: 16,
        paddingHorizontal: 20,
        color: '#0022A1',
    },
    preferenceDescription: {
        marginLeft: 3,
        fontSize: 12,
        paddingHorizontal: 20,
        color: '#4A4A4A',
    }
});
