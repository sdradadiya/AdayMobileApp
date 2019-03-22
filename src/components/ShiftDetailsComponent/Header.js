import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MapView, {Marker} from 'react-native-maps';
import image from '../../../images/flag-pink.png';
import geolib from "geolib";
let _constants = require('../../constants');
//import {Tracker} from "../../constants";

export default class Header extends Component {

    constructor(props) {
        super(props);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let result = false;
                if (props.locationCoor) {
                    result = geolib.isPointInCircle(
                        {latitude: JSON.parse(props.locationCoor).lat,
                         longitude: JSON.parse(props.locationCoor).lng},
                        {latitude: position.coords.latitude, longitude:position.coords.longitude},
                         500
                    );
                }
                this.setState({latitude: position.coords.latitude, longitude:position.coords.longitude, result: result});
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000000, maximumAge: 10000000 },
        );

        this.state = {
            positionName: '',
            brandName: '',
            workplaceName: '',
            locationCoor: JSON.parse(props.locationCoor),
            result: false,
        };
        this.handleData = this.handleData.bind(this);
    }

    componentDidMount() {
        this.handleData(this.props);
    };

    handleData(data){
        const positionName = data.positionName || '';
        const brandName = data.brandName || '';
        const workplaceName = data.workplaceName || '';
        this.setState({
            positionName,
            brandName,
            workplaceName,
        })
    }

    render() {
        const {positionName, brandName, workplaceName} = this.state;
        return (
            <View style={{height: _constants.isIphoneX() && 250 || 210}}>
                {this.props.isMap && this.state.locationCoor ?
                    <MapView
                        showsUserLocation={this.state.result}
                        minZoomLevel={14}
                        maxZoomLevel={20}
                        zoomEnabled={true}
                        loadingEnabled={true}
                        followsUserLocation={this.state.result}
                        region={{latitude: this.state.locationCoor.lat,
                                 longitude: this.state.locationCoor.lng}}
                        style={StyleSheet.absoluteFillObject}
                    >
                        <Marker coordinate={{latitude: this.state.locationCoor.lat,
                                             longitude: this.state.locationCoor.lng}}
                                image={require('../assets/placeholder.png')}
                                pinColor="red"/>

                    </MapView>

                    :

                    this.props.workplaceImageUrl ?
                        <Image style={styles.backImageContainer} source={{uri: this.props.workplaceImageUrl}}/>
                        :
                        <Image style={styles.backImageContainer} source={require('../assets/temp/black.png')}/>
                }


                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity style={styles.backBtnContainer}
                                          onPress={() => Actions.pop()}>
                            <View style={styles.displayInCenterRow}>
                                <Image style={{backgroundColor: 'transparent', height: 16, width: 12, alignSelf:'center'}}
                                       source={require('./../assets/chevron-white.png')}/>
                                <Text style={styles.backText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.screenTitle}>Shift Details</Text>
                        <View style={{flex:1, backgroundColor: 'transparent'}}/>
                    </View>
                </View>
                <View style={styles.backdropView}>
                    <Text style={styles.positionText}>{positionName}</Text>
                    <View style={styles.displayInCenterRow}>
                        <Text style={styles.infoText}>{brandName}</Text>
                        <View style={styles.centerDotStyle}/>
                        <Text style={styles.infoText}>{workplaceName}</Text>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        ...Platform.select({
            ios: {
                paddingTop: 20
            },
            android: {
                paddingTop: 0
            }
        }),
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    screenTitle: {
        color: '#EEE',
        fontSize: 20,
        flex: 1,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        textAlign:'center',
        fontFamily: 'RobotoCondensed-Bold'
    },
    backdropView: {
        marginTop: _constants.isIphoneX() && 110 || 90,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 7,
        width: '100%',
    },
    backBtnContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    displayInCenterRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height:_constants.isIphoneX() && 40 || 20
    },
    positionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'center'
    },
    infoText: {
        fontSize: 11,
        color: '#FFF',
    },
    centerDotStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFF',
        borderRadius: 2,
        borderWidth: 2,
        height: 2,
        marginTop: 5,
        marginHorizontal: 5,
    },
    backImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 250,
        width: '100%'
    },
    titleContainer: {
        width:'100%',
        flexDirection: 'row',
        padding: 10
    },
    backText: {
        fontSize: 18,
        backgroundColor: 'transparent',
        color: 'white',
        marginLeft:5,
        paddingTop:(_constants.isIphoneX() && 10 || 0)
    },
});

function renderMarker({ location }) {
    return (
        <MapView.Marker
            image={image}
            coordinate={location}
        >
            <MapView.Callout>
                <Text>BiG BiG Callout</Text>
            </MapView.Callout>
        </MapView.Marker>
    );
}
