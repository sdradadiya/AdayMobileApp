import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

class TopBar extends Component
{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={[styles.textStyle,{color: this.props.labelColor[0] ? '#f00' : '#000'}]} onPress={()=>this.props.onText("text1")}>{this.props.label[0]}</Text>
                <Text style={[styles.textStyle,{color: this.props.labelColor[1] ? '#f00' : '#000'}]} onPress={()=>this.props.onText("text2")}>{this.props.label[1]}</Text>
            </View>
        )
    }
}

export default TopBar;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'rgb(213,216,221)',
        justifyContent:'space-around',
        paddingTop:5,
        paddingBottom:5,
        paddingRight:15,
        paddingLeft:15,

        marginTop:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,

        borderRadius:3,
        shadowColor:'#000',
        shadowOffset:{width: 0, height: 2},
        shadowOpacity: 0.5,
    },
   textStyle:{
       fontSize:13,
   }
});