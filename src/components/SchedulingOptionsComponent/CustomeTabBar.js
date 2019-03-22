const React = require('react');
const createReactClass = require('create-react-class');
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    TouchableHighlight,
} from 'react-native';

const CustomTabBar = createReactClass({

    getDefaultProps() {
        return {
            activeTextColor: 'black',
            inactiveTextColor: 'black',
            backgroundColor: null,
        };
    },

    renderTabOption(name, page) {
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return <TouchableHighlight
            style={{flex: 1, }}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            underlayColor={'transparent'}
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab, this.props.tabStyle,{backgroundColor:'#fff'}]}>
                {name==="SHIFT BUMPS" && <Image source={require("../assets/icons/shiftbumps.png")} style={{height:25,width:25,marginBottom:2,marginTop:10}}/>
                ||
                name==="TIME OFF" && <Image source={require("../assets/icons/timeoff.png")} style={{height:25,width:25,marginBottom:2,marginTop:10}}/>
                ||
                name==="WORK HISTORY" && <Image source={require("../assets/icons/history.png")} style={{height:25,width:25,marginBottom:2,marginTop:10}}/>
                ||
                name==="PREFERENCES" && <Image source={require("../assets/icons/preferences.png")} style={{height:25,width:25,marginBottom:2,marginTop:10}}/>
                ||
                name==="MY BALANCE"
                ||
                name==="MY POSITION"
                ||
                name==="MY TEAMMATES"
                }
                <Text style={[{color: textColor, fontWeight, },
                    textStyle,
                    (name === "MY POSITION" || name === "MY TEAMMATES") && {fontSize: 16,fontWeight:'100'} || {fontSize: 12,fontWeight:'100'} ]}>
                    {name}
                </Text>
            </View>
        </TouchableHighlight>;
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 3,
            backgroundColor: 'red',
            bottom: 0,
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  containerWidth / numberOfTabs],
        });
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
                <Animated.View
                    style={[
                        tabUnderlineStyle,
                        {
                            transform: [
                                { translateX },
                            ]
                        },
                        this.props.underlineStyle,
                    ]}
                />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});

module.exports = CustomTabBar;
