/* @flow*/

import React, {
    Component
} from 'react';
import viewStyles from './viewStyles';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
let {
    height,
    width
} = Dimensions.get('window');

/**
 * @global this is a style module that contains both a style sheet and stateless components.
 * Stateful components must have their
 *
 *  jsdoc tags can be found here {@link http://usejsdoc.org/}
 *  @author multiple contributors
 */

// Styling Functional Components<<Docblockr:Decorate>>

// Alignment Functional Components <<Docblockr:Decorate>>

/**
 * [colCtr description]
 *
 * @return {[type]} [description]
 */

colCtr = () => ({
    alignItems: 'center',
    flexDirection: 'column'
});

/**
 * [flexColCtr description]
 * @param  {[type]} flexNum [description]
 * @return {[type]}         [description]
 */
flexColCtr = flexNum => Object.assign({}, {
    flex: flexNum
}, colCtr())

// HTML emulated functional components <<Docblockr:Decorate>>

/**
 * [_br description]
 * @return {[type]} [description]
 */
_br = () => <Text>{"\n"}</Text>;

/**
 * [_h2 description]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
_p12 = props =>
    (<Text style = {{
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        color: '#505050',
        alignSelf: 'center',
        justifyContent: 'center'
    }}>
        {props.children}
    </Text>);

/**
 * [_h2 description]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
_h2 = props =>
    (<Text style = {{
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    }}>
        {props.children}
    </Text>);

/**
 * [_h3 description]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
_h3 = props =>
    (<Text style = {{
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      color: '#4A4A4A',
  }}>
      {props.children}
  </Text>);

// StyleSheet Components <<Docblockr:Decorate>>

/**
 *This is a spacer for the status bar. FYI, the header for iPhone is a fixed 20 pixels across devices
 */

StatusBarSpacer = () => (
    <View style={{
        ...Platform.select({
            ios: {
                height: 20,
                flex: 20/667
            },
            android: {
                height: 20,
                flex: 20/667
            }
        }),
    }}/>
)

/**
 * [styles description]
 * @function
 * @type {[type]}
 */
const styles = StyleSheet.create({
    squareCenter95: {
        width: width - (width * 0.95),
        height: (width - (width * 0.95)),
    },
});

/**
 * Temporary home for the button, will create component module at a later point in time.
 * @function
 */

/* button160 = props => (
    <TouchableOpacity style={{
        display: 'flex',
        backgroundColor: '#002DB0',
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
    }} onPress={()=>Actions.SignUpType({})}>

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
            }}> {props.children} </Text>
        </View>

    </TouchableOpacity>
)
*/

/**
 * the below is necessary because the stylesheet is not a class, thus, you must export the stylesheet as an explicit module
 * @type {Object}
 */
module.exports = {
    colCtr,
    flexColCtr,
    _br,
    _h2,
    _h3,
    /* button160, */
    styles,
};
