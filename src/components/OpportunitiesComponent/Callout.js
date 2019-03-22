/* @flow*/

import React, {
    Component
} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

/**
 * This is a component to be used with the map feature to view opportunities nearby me.
 * @type {Object}
 */
export default class Callout extends Component {
    render() {
        const {
            name,
            image,
            companyType
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.bubble }>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>{companyType}</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <View style={{ borderWidth: 0.5 }}>
                                <Image
                                    style={ styles.image }
                                    source={ image }
                                />
                            </View>
                            <View style={{ width: 110, marginLeft: 10 }}>
                                <Text style={{ fontSize: 10 }}>{ name }</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.props.onButtonPress(companyType)}>
                            <View style={[styles.shadowStyle, styles.buttonStyle]}>
                                <Text style={{ color: 'white', fontSize: 13 }}>VIEW OPPORTUNITIES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    // Callout bubble
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 200,
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    // Character name
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    // Character image
    image: {
        width: 50,
        height: 50,
    },
    shiftDetailsButton: {
        padding: 6,
        borderRadius: 2,
        borderColor: '#ddd',
        backgroundColor: '#0022A1',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        height: 30,
        width: 150,
    },
    shadowStyle: {
        height: 50,
        width: 70,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 20,
        marginTop: 10,
        backgroundColor: 'blue'
    }
});
