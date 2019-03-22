/**
 * Created by Vardan on 2/1/2017.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Animated,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class ZipCodeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCode: [],
            spinnersIsVisible: false,
            size: 100,
            error: false
        };
        this.deleteNumber = this.deleteNumber.bind(this);
        this.spring = this.spring.bind(this);
        this.searchAddress = this.searchAddress.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.springValue = new Animated.Value(0.9)
    }

    spring() {

        this.springValue.setValue(0.9);
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 1
            }
        ).start()
    }

    addNumber(number) {

        let zipCodeArray = this.state.zipCode;
        if (zipCodeArray.length === 5) {
            this.spring();
        } else {
            zipCodeArray.push(number);
            this.setState({zipCode: zipCodeArray})
        }
    }

    deleteNumber() {
        let zipCodeArray = this.state.zipCode;
        zipCodeArray.pop();
        this.setState({zipCode: zipCodeArray})
    }

    searchAddress() {
        let zipCodeArray = this.state.zipCode;
        if (zipCodeArray.length === 5) {
            let zipCode = '';
            for (let i = 0; i < zipCodeArray.length; i++) {
                zipCode += zipCodeArray[i].toString();
            }
            this.getLocation(zipCode);
        } else {
            this.spring();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.zipCode.zipCode !== 'Invalid Zip Code') {
            if (nextProps.state.zipCode.homeAddress) {
                Actions.HomeAddress();
            }
        } else {
            let error = '';
            let spinnersIsVisible: false;
            let emptyZipCode = this.state.zipCode;
            emptyZipCode.length = 0;
            error = 'Invalid zip code';
            this.setState({
                error: error.toUpperCase(),
                zipCode: emptyZipCode,
                spinnersIsVisible: false
            });
        }
    }

    getLocation(zipCode) {
        this.setState({spinnersIsVisible: true});
        this.props.actions.getZipCodeLocation(zipCode, this.props.addressName);
    }


    render() {
        let zipCodeArray = [];
        for (let i = 0; i < 5; i++) {
            zipCodeArray.push(this.state.zipCode ? this.state.zipCode[i] : null)
        }
        return (
            <View style={styles.container}>
                {this.state.spinnersIsVisible &&
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    Loading...
                </View>
                }
                <View style={styles.zipCodePartContainer}>
                    <Text style={{fontSize: 17, paddingVertical: 10}}>What is your zip code?</Text>
                    <Animated.View style={{ flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            transform: [{scale: this.springValue}]}}
                    >
                        {
                            zipCodeArray.map((el, index) => {
                                return (
                                    (el || el === 0) ? <Text style={styles.zipCodeNumber} key={index}>{el}</Text> :
                                        <View style={styles.zipCodeCircle} key={index}/>
                                )
                            })
                        }
                    </Animated.View>
                    {this.state.error &&
                    <Text style={{flex: 1, paddingBottom: 5, fontSize: 20}}>{this.state.error}</Text>}
                </View>

                <View style={styles.keyboardContainer}>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 1)}>
                            <Text style={styles.keyNumberWithoutText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 2)}>
                            <Text style={styles.keyNumber}>2</Text>
                            <Text style={styles.keyLetter}>ABC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 3)}>
                            <Text style={styles.keyNumber}>3</Text>
                            <Text style={styles.keyLetter}>DEF</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 4)}>
                            <Text style={styles.keyNumber}>4</Text>
                            <Text style={styles.keyLetter}>GHI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 5)}>
                            <Text style={styles.keyNumber}>5</Text>
                            <Text style={styles.keyLetter}>JKL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 6)}>
                            <Text style={styles.keyNumber}>6</Text>
                            <Text style={styles.keyLetter}>MNO</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 7)}>
                            <Text style={styles.keyNumber}>7</Text>
                            <Text style={styles.keyLetter}>PQRS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 8)}>
                            <Text style={styles.keyNumber}>8</Text>
                            <Text style={styles.keyLetter}>TUV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 9)}>
                            <Text style={styles.keyNumber}>9</Text>
                            <Text style={styles.keyLetter}>WXYZ</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.keyContainerWithoutBorder}>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainer} onPress={this.addNumber.bind(this, 0)}>
                            <Text style={styles.keyNumberWithoutText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyContainerWithoutBorder} onPress={this.deleteNumber}>
                            <Text style={styles.keyLetterWithoutNumber}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.searchButtonContainer}>
                    <TouchableOpacity style={styles.searchButton} onPress={this.searchAddress}>
                        <Text style={styles.searchButtonName}>LOOKING ZIP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 64
            },
            android: {
                paddingTop: 54
            }
        }),
        flexDirection: 'column'
    },
    spinner: {
        marginBottom: 50
    },
    zipCodePartContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyboardContainer: {
        flex: 4,
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    searchButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    keyContainer: {
        height: 70,
        width: 70,
        borderRadius: 64,
        borderWidth: 2,
        borderColor: '#EEF3F5',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyContainerWithoutBorder: {
        height: 70,
        width: 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    keyNumber: {
        flex: 1,
        fontSize: 25,
        color: '#233539',
        textAlign: 'center'
    },
    keyNumberWithoutText: {
        fontSize: 25,
        color: '#233539',
        textAlign: 'center'
    },

    keyLetter: {
        flex: 1,
        fontSize: 15,
        color: '#AFB8BB'
    },
    keyLetterWithoutNumber: {
        fontSize: 15,
        color: '#233539'
    },
    zipCodeCircle: {
        height: 20,
        width: 20,
        borderRadius: 64,
        borderColor: '#4A4A4A',
        borderWidth: 1.5,
        marginLeft: 4,
        marginRight: 4
    },
    zipCodeNumber: {
        fontSize: 25,
        height: 35
    },
    searchButton: {
        width: 160,
        paddingVertical: 10,
        backgroundColor: '#0022A1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButtonName: {
        color: 'white',
        fontWeight: 'bold'
    }
});
