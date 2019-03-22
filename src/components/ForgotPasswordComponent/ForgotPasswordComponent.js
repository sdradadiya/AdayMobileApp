import React, {Component} from 'react';
import {Container, Content, Grid, Row, List, ListItem, Button, Input, Thumbnail} from 'native-base';
import {
    Animated,
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import styles from '../assets/styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from "../../constants/index";

let {height, width} = Dimensions.get('window');

export default class ForgotPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            phoneNumber: '',
            validationError: false
        };

        this.temporaryPassword = this.temporaryPassword.bind(this);
        this.validation = this.validation.bind(this);
        this.closeTemporaryPassword = this.closeTemporaryPassword.bind(this);
       //Tracker.trackScreenView("Forgot Password");
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim, {
                toValue: 1,
                duration: 100
            }
        ).start();
    }

    validation() {
        (this.state.phoneNumber ? this.temporaryPassword() : this.setState({validationError: true}));
    }

    temporaryPassword() {
        this.props.actions.temporaryPassword(this.state.phoneNumber);
        this.props.forgotPasswordStatusChange();
    }

    closeTemporaryPassword() {
        this.props.forgotPasswordStatusChange();
    }


    render() {
        return (
            <ScrollView>
            <Animated.View
                style={{opacity: this.state.fadeAnim, }}>

                <View style={componentStyle.pageContainer}>
                    <View style={componentStyle.pageHeaderContainer}>
                    </View>

                    <View style={{ marginLeft:10, marginTop:30 }}>
                            <TouchableOpacity onPress = {this.closeTemporaryPassword}>
                                        <Image resizeMode="contain"
                                               style={{width:25,height:25}}
                                               source={require('../assets/Icons_Exit.png')}
                                        />
                            </TouchableOpacity>
                    </View>
                    <View style={componentStyle.contentPart}>

                        {this.state.validationError &&
                            <Text style={componentStyle.validationError}>
                                Must enter phone number.
                            </Text>
                        }

                        <List style={this.state.validationError ? styles.contentContainerError  : styles.contentContainer}>

                                <View style={componentStyle.inputField}>
                                    <View style={componentStyle.center}>
                                        <Image resizeMode="contain"
                                               style={{width:30,height:30}}
                                               source={require('../assets/mobile_phone.png')}
                                        />
                                    </View>
                                    <View style={{flex:1}}>
                                    <Input
                                        onChangeText={(text) => this.setState({phoneNumber: text})}
                                        inputColorPlaceholder="rgba(74,74,74,0.5)"
                                        placeholder="(_ _ _) _ _ _ - _ _ _ _"
                                        secureTextEntry
                                        keyboardType="numeric"
                                    />
                                    </View>
                                </View>

                            <View style={componentStyle.buttonContainer}>
                                <Button block style={styles.buttonStyle}
                                        onPress={this.validation}>
                                        <Text style={componentStyle.buttonName}>SEND TEMPORARY PASSWORD</Text>
                                </Button>
                            </View>
                            <View style={componentStyle.textContainer}>
                                <Text style={componentStyle.textPart}>Your temporary password will be sent to your mobile phone number</Text>
                            </View>
                        </List>
                    </View>
                </View>

            </Animated.View>
                <KeyboardSpacer/>

            </ScrollView>
        );
    };
}

const componentStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        height: height,
        width: width,
        flexDirection: 'column'
    },
    pageHeaderContainer: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    contentPart: {
        flex: 1.6,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    contentContainer: {
        marginTop: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    contentContainerError: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    inputFieldContainer: {
        height:60,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 0,
        paddingBottom: 0
    },
    buttonContainer: {
        marginTop: 20,
        flex: 2
    },
    buttonStyle: {
        flex: 1,
        width: width - 20,
        maxHeight: 80,
        minHeight: 80,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
        paddingHorizontal: 0
    },
    buttonName: {
        color: 'white',
        fontSize: 20,
    },
    buttonBackground: {
        paddingHorizontal: 20,
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    textContainer: {
        flex: 2
    },
    bottomClearPart: {
        flex: 2
    },
    inputField: {
        flexDirection:'row',
        borderWidth:1,
        height: 40,
        marginHorizontal:10,
        paddingLeft: 10
    },
    textPart: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: '#4A4A4A'
    },
    validationError: {
        marginLeft: 10,
        textAlign: 'center',
        flex: .1,
        paddingTop: 30,
        fontSize: 18,
        color: 'red'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
