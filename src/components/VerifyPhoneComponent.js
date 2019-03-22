/**
 * Created by Vardan on 2/1/2017.
 */
import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Platform,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class VerifyPhoneComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: ['(', '_ ', '_ ', '_ ', ') ', '_ ', '_ ', '_ ', '- ', '_ ', '_ ', '_ ', '_ '],
            index: 1,
            enterPhonePage: true
        };
        this.deleteNumber = this.deleteNumber.bind(this);
        this.onDonePressed = this.onDonePressed.bind(this);
    }

    addNumber(num) {

        let index = this.state.index;
        let number = this.state.number;

        if (this.state.enterPhonePage) {
            if (index === 4 || index === 8) {
                index++;
            }
            if (index > 12) {
                return
            }
        } else {
            if (index > 3) {
                return
            }
        }
        number[index] = num + ' ';
        index++;
        this.setState({
            number,
            index
        })
    }

    deleteNumber() {

        let number = this.state.number;
        let index = this.state.index;
        index--;
        if (this.state.enterPhonePage) {
            if (index < 1) {
                return
            }
            if (index === 4 || index === 8) {
                index--;
                number[index] = '_ ';
            } else {
                number[index] = '_ ';
            }
        } else {
            if (index < 0) {
                return
            } else {
                number[index] = 'o ';
            }
        }
        this.setState({
            number,
            index
        });
    }

    onDonePressed() {

        if (this.state.index === 13) {
            this.setState({
                enterPhonePage: false,
                index: 0,
                number: ['o ', 'o ', 'o ', 'o ']
            });
        }
        if (this.state.index > 3 && !this.state.enterPhonePage) {
            Actions.Account();
        }
    }

    getPhoneNumberInput() {

        return (
            <View>
                <View style={[styles.center, {marginVertical:10}]}>
                    <Text style={{fontSize:16}}>Last Step!</Text>
                    <Text style={{fontSize:16}}>Please Verify Your Phone Number</Text>
                </View>
                <View style={[styles.center, {marginBottom:20}]}>
                    <Text style={{fontSize:20}}>{this.state.number}</Text>
                </View>
            </View>
        )
    }

    getCodeInput() {

        return (
            <View>
                <View style={[styles.center, {marginVertical:10}]}>
                    <Text style={{fontSize:20}}>{this.state.number}</Text>
                </View>
                <View style={[styles.center, {marginBottom:20}]}>
                    <Text style={{fontSize:18}}>RESEND CODE</Text>
                </View>
            </View>
        )
    }

    render() {
        let footerImg = (this.state.enterPhonePage) ? require('./assets/buttons/phone-verify.png') : require('./assets//buttons/OK.png');

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={{flex:0.2, marginLeft:10, justifyContent:'flex-start', alignSelf:'center'}}>
                            <TouchableOpacity onPress = {() => {Actions.pop()}}>
                                <Image resizeMode="contain"
                                       style={{width:25,height:25}}
                                       source={require('./assets/Icons_Exit.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[{flex:0.6, justifyContent:'center', alignItems:'center'}]}>
                            {(this.state.enterPhonePage) ?
                                (<Image resizeMode="contain"
                                       style={{width:130}}
                                       source={require('./assets/logos/aday-logo-white.png')}
                                />) :
                                (<Text style={{fontSize:20}}>CONFIRM NUMBER</Text>)
                            }
                        </View>
                        <View style={{flex:0.2}}>

                        </View>
                    </View>
                    <View style={{height:80}}>
                        {(this.state.enterPhonePage) ?
                            this.getPhoneNumberInput() :
                            this.getCodeInput()
                        }
                    </View>
                    <View style={[styles.keyboardContainer, styles.center]}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.keyContainer} onPress={() => this.addNumber(1)}>
                                <Text style={styles.keyNumberWithoutText}>1</Text>
                                <Text style={styles.keyLetter}> </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.keyContainer, {marginHorizontal:20}]} onPress={() => this.addNumber(2)}>
                                <Text style={styles.keyNumber}>2</Text>
                                <Text style={styles.keyLetter}>ABC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.keyContainer} onPress={() => this.addNumber(3)}>
                                <Text style={styles.keyNumber}>3</Text>
                                <Text style={styles.keyLetter}>DEF</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.keyContainer} onPress={() => this.addNumber(4)}>
                                <Text style={styles.keyNumber}>4</Text>
                                <Text style={styles.keyLetter}>GHI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.keyContainer, {marginHorizontal:20}]} onPress={() => this.addNumber(5)}>
                                <Text style={styles.keyNumber}>5</Text>
                                <Text style={styles.keyLetter}>JKL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.keyContainer} onPress={() => this.addNumber(6)}>
                                <Text style={styles.keyNumber}>6</Text>
                                <Text style={styles.keyLetter}>MNO</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.keyContainer} onPress={() => this.addNumber(7)}>
                                <Text style={styles.keyNumber}>7</Text>
                                <Text style={styles.keyLetter}>PQRS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.keyContainer, {marginHorizontal:20}]} onPress={() => this.addNumber(8)}>
                                <Text style={styles.keyNumber}>8</Text>
                                <Text style={styles.keyLetter}>TUV</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.keyContainer} onPress={() => this.addNumber(9)}>
                                <Text style={styles.keyNumber}>9</Text>
                                <Text style={styles.keyLetter}>WXYZ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.keyContainerWithoutBorder}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.keyContainer, {marginHorizontal:20}]} onPress={() => this.addNumber(0)}>
                                <Text style={styles.keyNumberWithoutText}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.keyContainerWithoutBorder} onPress={this.deleteNumber}>
                                <Text style={styles.keyLetterWithoutNumber}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.center, {marginTop:15}]}>
                        <TouchableOpacity onPress={this.onDonePressed}>
                            <Image resizeMode="contain"
                                   style={{width:100,height:100}}
                                   source={footerImg}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 24
            },
            android: {
                paddingTop: 54
            }
        }),
    },
    header: {
        height: 60,
        borderBottomWidth: 3,
        borderBottomColor: '#F2F2F2',
        flexDirection: 'row'
    },
    keyboardContainer: {
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
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
    searchButton: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    doneButton: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 64,
        borderColor: '#EEF3F5',
        borderWidth: 1.5
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
