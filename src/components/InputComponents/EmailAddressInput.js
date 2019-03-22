import React, {
    Component
} from 'react';
import {
    Input,
} from 'native-base';
import {
    View,
    Image
} from 'react-native';

/**
 * Simple Email Input
 * @author Rahkeem
 * @todo email regex validation
 * @type {Object}
 */
export default class EmailAddressInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    margin: 10,
                    height: 40,
                    justifyContent: 'center',
                    borderColor: 'rgba(74,74,74,0.5)',
                borderRadius: 6
            }}>
                <View style={{
                    backgroundColor: 'rgba(153,153,153,0.3)',
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image style={{
                        width: 25,
                        height: 25
                    }} source={require('../assets/login_email.png')}/>
                </View>
                <Input
                    onChangeText={(text) => this.onInputFieldChange('email', text)}
                    inputColorPlaceholder="rgba(74,74,74,0.5)"
                    placeholderTextColor="rgba(74,74,74,0.5)"
                    placeholder="EMAIL ADDRESS"
                    style={{height: 40}}
                />
            </View>
        )
    }
}
