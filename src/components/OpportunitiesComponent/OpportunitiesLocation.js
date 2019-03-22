import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux';
//import {Tracker} from "../../constants/index";

/**
 *  Shows the physical map of jobs that are in the area near the user, everything is on the map
 * @description As a job seeker, I'd like to search for jobs that are nearby or at points of interest so that I can coordinate my workplaces with other places I need to be or to coordinate with public transportation
 * @type {Object}
 */
const {
    width,
    height
} = Dimensions.get('window');
export default class OpportunitiesLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            region: {
                latitude: 37.79825,
                longitude: -122.4354,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        };
       //Tracker.trackScreenView("Opportunities Location");

    }

    onRegionChange(region) {
        this.setState({
            region
        });
    }

    onButtonPress(e) {
        console.log(e);
        Actions.OpportunitiesListing({})
    }

    render() {

        const opportunities = this.props.opportunities;

        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
            {/*
             /* Deleting 'opportunities' branch and inserting line below for the sole differing line; likely to be deleted.
                <View style={{ position: 'absolute', top: 25, left: 3, marginLeft: 10 }}>
            */}    
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => Actions.pop({})}>
                            <Image
                                style={{width: 20, height: 20}}
                                source={require('./../assets/cross.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 300, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(search) => this.setState({search})}
                            value={this.state.search}
                            placeholder={"  street address, city, state, or zip"}
                        />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapContainer: {
        width: width,
        height: height
    },
    map: {
        width: width,
        height: height
    },
    textInput: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 4,
    },
    callout: {
        width: 140,
    }
});
