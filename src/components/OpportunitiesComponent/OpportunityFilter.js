import React, {
    Component
} from 'react';
import {
    Input
} from 'native-base';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
let {
    height,
    width
} = Dimensions.get('window');
import {
    RadioButtons
} from 'react-native-radio-buttons';
import Slider from 'react-native-slider';
//import {Tracker} from "../../constants/index";

/**
 * This triggers the component and resulting screen after the employee has indicated that they're searching for new employment opportunities
 * @type {Object}
 */
class OpportunityFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            sortBy: 'Distance',
            options: [
                'Distance',
                'Brand',
                'Job Title',
            ],
            distance: 0.5
        };
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.renderOption = this.renderOption.bind(this);
        this.renderContainer = this.renderContainer.bind(this);
       //Tracker.trackScreenView("Opportunities Filter");

    }

    setSelectedOption(selectedOption) {
        this.setState({
            sortBy: selectedOption
        });
    }

    renderOption(option, selected, onSelect, index) {
        const style = selected ? {
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white'
        } : {
            textAlign: 'center',
            color: '#007AFF'
        };
        const containerStyle = selected ? styles.selectedRadioButtonContainer : styles.unselectedRadioButtonContainer;
        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View style={containerStyle}><Text style={style}>{option}</Text></View>
            </TouchableWithoutFeedback>
        );
    }

    renderContainer(optionNodes) {
        return <View style={{flexDirection: 'row'}}>{optionNodes}</View>;
    }

    render() {
        const {
            sortBy,
            distance
        } = this.state;
        return (
            <View style={styles.filterContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={()=>this.props.toggleFilter()}>
                        <Image style={{width: 20, height: 20}}
                               source={require('../assets/buttons/close-button.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <Text style={{color: '#0022A1', fontWeight: '600', fontSize: 18}}>Filter</Text>
                    </TouchableOpacity>
                    <View style={{width: 20}}/>
                </View>
                <View style={styles.filterContentContainer}>
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputFieldIconContainer}>
                            <Image style={{width: 25, height: 25}} source={require('./../assets/searchIcon.png')}/>
                        </View>
                        <Input
                            onChangeText={(text) =>  this.setState({searchValue: text})}
                            inputColorPlaceholder="rgba(74,74,74,0.5)"
                            placeholderTextColor="rgba(74,74,74,0.5)"
                            placeholder="Search for Jobs Near You"
                        />
                    </View>
                    <View style={{paddingHorizontal: 30, paddingBottom: 10, backgroundColor: 'white', borderBottomColor: '#B8B8B8', borderBottomWidth: 1}}>
                        <Text style={{paddingBottom: 10, color: '#007AFF'}}>SORT BY:</Text>
                        <RadioButtons
                            options={ this.state.options }
                            onSelection={ this.setSelectedOption }
                            selectedOption={sortBy }
                            renderOption={ this.renderOption }
                            renderContainer={ this.renderContainer }
                        />
                    </View>
                    <View style={{paddingHorizontal: 30, paddingBottom: 10, backgroundColor: 'white'}}>
                        <Text style={{paddingVertical: 10, color: '#007AFF'}}>DISTANCE AWAY:</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Slider
                                trackStyle={styles.track}
                                thumbStyle={styles.thumb}
                                minimumTrackTintColor='#007AFF'
                                value={this.state.distance}
                                onValueChange={(distance) => this.setState({distance})}/>
                            <Text style={{ color: '#0022A1', fontSize: 17}}>{distance * 100} MILES</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.searchButton}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>SEARCH</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>this.props.toggleFilter()} style={{flex: 1}}>

                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    filterContainer: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    headerContainer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 1,
        paddingHorizontal: 15
    },
    filterContentContainer: {
        backgroundColor: '#FAFAFA'
    },
    inputFieldContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 30,
        height: 45,
        justifyContent: 'center',
        borderColor: 'rgba(74,74,74,0.5)',
        borderRadius: 6
    },
    inputFieldIconContainer: {
        backgroundColor: 'rgba(153,153,153,0.3)',
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedRadioButtonContainer: {
        backgroundColor: '#007AFF',
        flex: .3,
        borderWidth: 1,
        borderColor: '#007AFF',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    unselectedRadioButtonContainer: {
        flex: .3,
        borderWidth: 0.5,
        height: 30,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    track: {
        height: 3,
        borderRadius: 2,
        width: width - 140,
        marginRight: 5
    },
    thumb: {
        width: 25,
        height: 25,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        elevation: 5,
    },
    searchButton: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5,
        marginTop: 10,
        marginBottom: 20,
    }

});

export default OpportunityFilter;
