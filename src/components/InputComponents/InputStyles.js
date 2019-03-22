import React, {
    Component
} from 'react';
import {
    StyleSheet
} from 'react-native';

const InputStyles = StyleSheet.create({
    inputFieldContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        margin: 10,
        height: 40,
        justifyContent: 'center',
        borderColor: 'rgba(74,74,74,0.5)',
        borderRadius: 6
    },
    inputFieldIconContainer: {
        backgroundColor: 'rgba(153,153,153,0.3)',
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputFieldButtonContainer: {
        borderWidth: 1,
        borderColor: 'rgba(74,74,74,0.5)',
        borderRadius: 6,
        margin: 5,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

module.exports = {
    InputStyles,
}; 
