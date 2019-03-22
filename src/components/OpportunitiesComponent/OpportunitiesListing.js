import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
} from 'react-native';

import OpportunitiesList from './OpportunitiesList'
//import {Tracker} from "../../constants/index";

/**
 *  lists the available jobs by the brand of company, for example: all of Dunkin' Donuts
 * @description As a job seeker, I want to be able to search jobs by company so that I can follow and become engaged with companies who I'm a fan of their brand.
 * @todo add a chat room for each of the brands on this page so that they can manage their brands
 * @type {Object}
 */
const {
    width,
} = Dimensions.get('window');
export default class OpportunitiesLocationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [{
                id: 0,
                coordinate: {
                    latitude: 37.78261276633253,
                    longitude: -122.4358198991446
                },
                color: 'red',
                image: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/8/10/asset/buzzfeed-prod-fastlane03/sub-buzz-4392-1481212051-3.jpg',
                title: 'Flik Hospitality Group',
                name: 'Berkeley Law School'
            }]
        };
       //Tracker.trackScreenView("Opportunities Listing Location ");

    }

    render() {

        const data = this.props.data;

        return (
            <View style={ styles.container }>


                <View style={{ flex: 1, marginTop: 130, marginHorizontal: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <View style={ styles.shadowStyle }>
                                <Image
                                    style={ [{ height: 70, width: 70, resizeMode: 'contain', position: 'absolute', top: -25 }]}
                                    source={ require('./../assets/logos/logo1.png') }
                                />
                            </View>
                        </View>
                        <View style={{ marginLeft: 10, paddingTop: 10 }}>
                            <Text>Chao Center</Text>
                            <Text style={ styles.textStyle }>1585 Massachusetts Ave, Cambridge 0 mi away</Text>
                        </View>
                    </View>
                    <OpportunitiesList listData={data}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapContainer: {
        position: 'absolute',
        top: -64,
        width: width,
        height: 200
    },
    map: {
        width: width,
        height: 200
    },
    textInput: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 4,
    },
    shadowStyle: {
        height: 45,
        width: 70,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    textStyle: {
        fontSize: 12,
        color: '#a9a9a9'
    },
});
