import React, {Component} from 'react';
import {
    View
} from 'react-native';
//import {Tracker} from "../../constants/index";

class MapComponent extends Component {
    constructor(props) {
        super(props);
       //Tracker.trackScreenView("MAP");

    }

    static propTypes = {
        region: React.PropTypes.object.isRequired,
    };
    onMapPress(e) {
        this.props.onMapPress ? this.props.onMapPress(e) : null;
    }

    render() {
        const { height, width, style } = this.props;
        const { region, provider, markerDescription, markerTitle } = this.props;
        const { cacheEnabled, scrollEnabled, pitchEnabled, zoomEnabled} = this.props;
        return (
          <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
          </View>
        );
    }
}

module.exports = MapComponent;
