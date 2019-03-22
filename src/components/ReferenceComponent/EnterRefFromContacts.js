/* @flow */

import {
    Content,
    List,
    ListItem,
    Input,
    Thumbnail,
    Textarea
} from 'native-base';
import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    UselessTextInput,
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux'
//import {Tracker} from "../../constants/index";

/**
 * Allows a user to enter the reference information for their contacts via their phone's contacts
 * @author Robert
 * Date: 7/3/2017
 * @type {Object}
 */
export default class EnterRefFromContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            error: ""
        };
        this.saveContacts = this.saveContacts.bind(this);
       //Tracker.trackScreenView("Enter Reference From Contacts");

    }

    componentDidMount() {
        Actions.BrowseContacts({
            saveContacts: this.saveContacts
        })
    }

    saveContacts(contacts) {
        let references = [];
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            references.push({
                id: contact.contactID,
                firstName: contact.name,
                phoneNumber: contact.phoneNumber[0].number
            })
        }
        this.props.actions.saveReferenceData(references);
        Actions.Account({tab: "PROFILE"});
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
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
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5
    },

});
