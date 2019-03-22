import React from 'react';
import { View, Text, Image } from 'react-native';

const Congratulations = (props) => {
    return (
        <View style={styles.containerStyle}>
           <View style={{ marginHorizontal: 10}}>
               <Image resizeMode="contain"
                      style={{width:30,height:30}}
                      source={require('./../assets/NoSelected.png')}
               />
           </View>
            <View style={{ flex: 1, }}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'white'}}></Text>
                    <View style={styles.waitingStyle}>
                        <Text style={{ fontSize: 12, color: 'white' }}>SCHEDULED</Text>
                    </View>
                </View>
                <Text style={{color: 'white', fontSize: 12}}>
                    You're scheduled for this shift, see instructions belows
                </Text>
            </View>
        </View>
    );
};
const styles = {
    containerStyle: {
        height: 60,
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    waitingStyle: {
        paddingHorizontal: 10,
        paddingVertical: 1,
        backgroundColor:'red',
        borderRadius: 20,
        marginLeft: 50
    }
};
export default Congratulations;
