/* @flow*/

import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    ListView
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
//import {Tracker} from "../../constants/index";

/**
 * A component that generates the list of jobs available for the opportunities screen either global or by brand
 */
class OpportunitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            ds: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        };
        this.renderRow = this.renderRow.bind(this);
       //Tracker.trackScreenView("Opportunities List");

    }

    componentDidMount() {
        const listData = this.props.listData;
        this.setState({
            listData
        });
    }

    componentWillReceiveProps(nextProps) {
        const listData = nextProps.listData;
        this.setState({
            listData
        });
    }

    renderRow(dataRow, sectionID, rowID) {
        const {
            name,
            companyType,
            address,
            logo
        } = dataRow;
        return (
            <View style={{ padding: 2 }}>
                <TouchableOpacity onPress={()=> Actions.Associates({})} style={styles.opportunityContainer}>
                    <View style={styles.opportunityTopContainer}>
                        <Image style={{ width: 40, height: 40 }} source={logo}/>
                        <View>
                            <Text style={styles.opportunityName}> {name} </Text>
                            <Text style={styles.opportunityDescription}>
                                {companyType}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.opportunityDescription}>
                        {address}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {
            listData
        } = this.state;
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.ds.cloneWithRows(listData)}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 10
            },
            android: {
                paddingTop: 0
            }
        }),
    },
    opportunityContainer: {
        marginTop: 2,
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: 'white',
    },
    opportunityTopContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingLeft: 15,
        borderBottomColor: '#C9C9C9',
    },
    opportunityName: {
        fontSize: 16,
        paddingHorizontal: 20,
        color: '#0022A1',
    },
    opportunityDescription: {
        marginLeft: 3,
        fontSize: 12,
        paddingHorizontal: 20,
        color: '#4A4A4A',
    }

});

export default OpportunitiesList;
