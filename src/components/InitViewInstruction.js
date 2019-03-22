import {
    Dimensions, View, StyleSheet, Text, TouchableOpacity, Image
} from 'react-native';
import React,{Component} from 'react';
let {
    height,
    width
} = Dimensions.get('window');

export default class InitViewInstruction extends Component {
    render() {
        const _this = this;
        return (
            <View style={styles.instruction}>
                <View style={{alignSelf:'flex-end', width:50, height:50, alignItems:'center', justifyContent:'center', backgroundColor:'rgb(0, 38, 157)', borderRadius:50, marginRight:9, marginBottom:25}}>
                    <Image resizeMode="contain"
                           style={{width: 27, height: 27}}
                           source={require('./assets/icons/menu.png')}
                    />
                </View>
                <View style={{alignSelf:'flex-end'}}>
                    <Image resizeMode="contain"
                           style={{width:100,height:100}}
                           source={require('./assets/Arrow.png')}
                    />
                 </View>
                <View style={{marginBottom:30}}>
                    <Text style={{ fontSize: 22,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff'}}> Bumps, Vacations & Preferences</Text>
                    <View style={{borderColor:'#fff',borderWidth:0.5, alignItems:'center', marginBottom: 15, marginTop: 7}}/>
                    <Text style={styles.subTextTitle}>{'\u2022'} See which shift bumps are available to you</Text>
                    <Text style={styles.subTextTitle}>{'\u2022'} Enter, edit and check status of vaction requests</Text>
                    <Text style={styles.subTextTitle}>{'\u2022'} Indicate which types of shifts you like most</Text>
                </View>
                <TouchableOpacity style={{
                    borderColor: '#fff',
                    borderWidth: 3,
                    borderRadius:5}}
                    onPress = {()=>this.props.initGotIt()}>
                    <Text style={styles.buttonStyle}>GOT IT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    instruction: {
        height: height,
        width: width,
        alignItems:'center',
        paddingTop: 15,
        backgroundColor:'rgba(0,0,0,0.8)',
        position:'absolute',
    },
    buttonStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    subTextTitle: {
        color:'#fff',
        fontSize:14
    }
});
