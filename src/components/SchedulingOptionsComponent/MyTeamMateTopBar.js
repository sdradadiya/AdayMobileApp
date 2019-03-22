import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

class MyTeamMateTopBar extends Component
{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 1, height: this.props.labelColor[0]? 45: 35}}>
                    <View style={[ styles.textBackground, this.props.labelColor[0] ? styles.textBackground_Active : styles.textBackground_Disactive ]}>
                        <Text style={[ styles.textStyle, this.props.labelColor[0] ? styles.textStyle_Active : styles.textStyle_Disactive ]} onPress={()=>this.props.onText("text1")}>{this.props.label[0]}</Text>
                    </View>
                    {this.props.labelColor[0] && <View style={styles.triangle} />}
                </View>
                <View style={{flex: 1, height: this.props.labelColor[1]? 45: 35}}>
                    <View style={[ styles.textBackground, this.props.labelColor[1] ? styles.textBackground_Active : styles.textBackground_Disactive ]}>
                        <Text style={[ styles.textStyle, this.props.labelColor[1] ? styles.textStyle_Active : styles.textStyle_Disactive ]} onPress={()=>this.props.onText("text2")}>{this.props.label[1]}</Text>
                    </View>
                    {this.props.labelColor[1] && <View style={styles.triangle} />}
                </View>
            </View>
        )
    }
}

export default MyTeamMateTopBar;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:5,
        paddingBottom:5,
        paddingRight:15,
        paddingLeft:15,

        marginTop:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
    },
    textBackground: {
        height: 35,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:5,
        marginRight:5,
        borderRadius: 20,
        borderWidth: 1,
    },
    textBackground_Active: {
        backgroundColor: 'rgb(0,0,156)',
        borderColor:'rgb(0,0,156)',
    },
    textBackground_Disactive: {
        backgroundColor: '#fff',
        borderColor:'rgb(50,50,156)',
    },
    textStyle: {
        fontSize:14,
        textAlign: 'center',
    },
    textStyle_Active:{
        color: '#fff',
        fontWeight: 'bold',
    },
    textStyle_Disactive:{
        color: 'rgb(50,50,156)',
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: 'rgb(0,0,156)',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
    }
});