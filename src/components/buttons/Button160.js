import React, { Component } from 'react';
import { Row, List, ListItem, Input, Thumbnail } from 'native-base';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
let { width } = Dimensions.get('window');

export default class Button160 extends React.Component {
    constructor(props: Props) {
        super(props);
        this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {

    }

    render() {
        return (
            <TouchableOpacity style={{
                display: 'flex',
                backgroundColor:  '#002DB0',
                height: 40,
                width: width / 2,
                borderRadius: 2,
                alignSelf: 'center',
                shadowRadius: 2,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 1,
                    height: 2,
                },
                shadowOpacity: 0.5,
                marginTop: 20,
                marginBottom: 20
            }} onPress={this.handlePress}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'Lato-Regular',
                        color: 'white',
                        fontWeight: 'bold',
                    }}> {this.props.title} </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
