import React, {Component}  from 'react';
import {View, Text} from 'react-native';
//import {Tracker} from "../../constants/index";

class ShiftDecision extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shiftDecisionTime: [0, 0, 0, 0, 0, 0]
        };
        this.updateCountDown = this.updateCountDown.bind(this);
       //Tracker.trackScreenView("Shift Decision");

    }

    updateCountDown(countDown) {
        let timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDown - now;
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            hours = (hours < 10) ? ('0' + hours).split("") : hours.toString().split("");
            minutes = (minutes < 10) ? ('0' + minutes).split("") : minutes.toString().split("");
            seconds = (seconds < 10) ? ('0' + seconds).split("") : seconds.toString().split("");
            const shiftDecisionTime = this.state.shiftDecisionTime;
            shiftDecisionTime.length = 0;
            shiftDecisionTime.push(hours[0], hours[1], minutes[0], minutes[1], seconds[0], seconds[1]);
            this.setState({shiftDecisionTime});
            if (distance < 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    componentDidMount() {
        const countDownDate = new Date(this.props.countDownDate).getTime();
        this.updateCountDown(countDownDate);
    }

    render() {
        const shiftDecisionTime = this.state.shiftDecisionTime;
        return (
            <View style={styles.containerStyle}>
                <View style={{ marginHorizontal: 10, justifyContent: 'center'}}>
                    <Text style={{color: 'white'}}>Shift</Text>
                    <Text style={{color: 'white'}}>Decision</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>HOURS</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={styles.timeElement}>
                                <Text style={styles.timeText}>{shiftDecisionTime[0]}</Text>
                            </View>
                            <View style={styles.timeElement}>
                                <Text style={styles.timeText}>{shiftDecisionTime[1]}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', marginLeft: 6}}>
                        <Text style={{color: 'white'}}>MINUTES</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={styles.timeElement}>
                                <Text style={styles.timeText}>{shiftDecisionTime[2]}</Text>
                            </View>
                            <View style={styles.timeElement}>
                                <Text style={styles.timeText}>{shiftDecisionTime[3]}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 1, paddingVertical: 4}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>:</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>SECOND</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={styles.timeElement}>
                                <Text style={styles.timeText}>{shiftDecisionTime[4]}</Text>
                            </View>
                            <View style={styles.timeElement}>
                                <Text style={styles.timeText}>{shiftDecisionTime[5]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft: 10}}>
                    <View style={styles.waitingStyle}>
                        <Text style={{ fontSize: 12, color: 'white' }}>WAITING</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = {
    containerStyle: {
        height: 60,
        backgroundColor: '#999999',
        flexDirection: 'row'
    },
    timeElement: {
        marginHorizontal: 2,
        height: 25,
        width: 20,
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeText: {
        fontSize: 20
    },
    waitingStyle: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 1,
        backgroundColor: '#FFAD33',
        borderRadius: 20,
    }
};

export default ShiftDecision;
