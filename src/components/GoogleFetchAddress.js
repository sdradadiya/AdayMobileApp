/**
 * Created by Robert on 2/1/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Platform,
    Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

let {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
let {width} = Dimensions.get('window');

export default class GoogleFetchAddress extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const route = this.props.route;
        const img = this.props.img;
        return (
            <View style={styles.container}>
                <View style={ styles.center }>
                    <Text style={{ fontSize: 18 }}>{this.props.text}</Text>
                </View>
                <View style={[styles.center, {marginTop: 25}]}>
                    <Image resizeMode="contain" style={{width: 60, height: 60}} source={img}/>
                </View>
                <View style={{margin: 20, height: 300}}>
                    <GooglePlacesAutocomplete
                        placeholder={this.props.placeHolder}
                        minLength={2}
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={(address, details = null) => {
                            Actions[route]({address});
                        }}
                        getDefaultValue={() => {
                            return '';
                        }}
                        query={{
                            key: 'AIzaSyB6OGyP3KJ3OJoNSWbqNgF7U3b5zQmAa5o',
                            language: 'en'
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                        currentLocation={false}
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch'
                        GoogleReverseGeocodingQuery={{

                        }}
                        GooglePlacesSearchQuery={{
                            rankby: 'distance',
                            types: 'food'
                        }}
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                        predefinedPlaces={[]}
                        predefinedPlacesAlwaysVisible={true}
                        keyboardShouldPersistTaps='always'
                    />
                </View>

                <View style={{position: 'absolute', left: width/2-95, bottom: 20}}>
                    <Button
                        onPress={() => Actions[route]()}
                        containerStyle={styles.saveButton}
                        style={{color: 'black', fontSize: 16}}>
                        MANUAL ENTRY
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 104
            },
            android: {
                paddingTop: 90,
                padding: 10
            }
        }),
        flexDirection: 'column'
    },
    header: {
        flex: 0.4
    },
    body: {
        flex: 0.6
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButton: {
        padding: 7,
        borderRadius: 2,
        borderColor: '#ddd',
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
        marginTop: 10,
        height: 35,
        width: width / 2,
    },
});
