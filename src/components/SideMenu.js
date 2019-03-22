import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as React from 'react';
import { Thumbnail } from 'native-base';
//import { Tracker } from "../constants/index";

let { width } = Dimensions.get('window');

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            avatar: this.props.avatar
        };
    }

    render() {
        const _this = this;
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>

                <View style={ styles.avatarContainer}>
                    <Image style={{width: 105, height: 105, borderRadius: 105/2}}
                           source={{uri: this.state.avatar + "?" + new Date().getTime()}}/>
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', paddingTop: 20}}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <View>
                        <Text style={styles.firstName}>{this.state.firstName}</Text>
                        </View>
                        <View>
                        <Text style={styles.lastName}>{this.state.lastName}</Text>
                        </View>
                        </View>
                    </View>
                </View>

                <View style={ styles.menuContainer }>
                    <TouchableOpacity style={{flex: 1}} onPress={() =>{

                        this.props.onChangeTabs(0)
                    }}>
                        <View style={ styles.menuItem }>
                            <Image style={{width: 25, height: 23}}
                                source={require('./assets/Schedule_tab.png')}/>
                            <Text  style={styles.menuItemText}> Find Shifts </Text>
                        </View>
                    </TouchableOpacity>

                   {/* <TouchableOpacity style={{flex: 1}} onPress={() => this.props.onChangeTabs(1) }>
                        <View style={ styles.menuItem }>
                            <Image style={{width: 24, height: 28}}
                                source={require('./assets/logos/aday-logo-sidebar.png')}/>
                            <Text  style={styles.menuItemText}> Find Jobs </Text>
                        </View>
                    </TouchableOpacity>
                    */}
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.onChangeTabs(2) }>
                        <View style={ styles.menuItem }>
                            <Image style={{width: 25, height: 22}}
                                source={require('./assets/signUpTeamMemberIcon.png')}/>
                             <Text  style={styles.menuItemText}> My Profile </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.onChangeTabs(5) }>
                        <View style={ styles.menuItem }>
                            <Image style={{width: 25, height: 22}}
                                   source={require('./assets/WorkPlace.png')}/>
                            <Text  style={styles.menuItemText}> Workplace </Text>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{flex: 1}} onPress={() => this.props.onChangeTabs(3) }>
                        <View style={ styles.menuItem }>
                            <Image style={ styles.icon }
                                source={require('./assets/icons/ui-options.png')}/>
                             <Text  style={styles.menuItemText}> Preferences </Text>
                        </View>
                    </TouchableOpacity>
                    */}

                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.onChangeTabs(4) }>
                        <View style={ styles.menuItem }>
                            <Image style={{width: 25, height: 25}}
                                source={require('./assets/settings-icon.png')}/>
                            <Text  style={styles.menuItemText}> Settings </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
    },
    avatarContainer: {
        paddingTop: 60,
        paddingBottom: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: "#4A4A4A",
        borderBottomWidth: 1,
    },
    firstName: {
        paddingRight: 5,
        color: "#4A4A4A",
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'RobotoCondensed-Regular'
    },
    lastName: {
        color: "#4A4A4A",
        fontSize: 20,
        fontFamily:  'RobotoCondensed-Light'
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        alignItems: "flex-start",
    },
    menuItem: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItemText: {
        fontSize: 16,
        paddingLeft: 10,
        color: "#4A4A4A",
        fontFamily: 'Lato-Regular'
    },
    icon: {
        width: width * 0.07,
        height: width * 0.08
    },
    settingsIcon: {
        width: width * 0.09,
        height: width * 0.09
    }
});
