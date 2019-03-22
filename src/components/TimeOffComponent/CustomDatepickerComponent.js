import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {View} from 'react-native';

export default class CustomDatepicker extends Component {
  render(){
    return (
        <View style={{flexDirection: 'row'}}>
          {/* <Ionicons name="md-calendar" size={40} style={{marginLeft: 10}}/> */}
          <DatePicker
             style={{width: '90%', height: 40}}
             date={this.props.date}
             mode="date"
             format="dddd, MMM D, YYYY"
             showIcon={false}
             confirmBtnText="Enter"
             cancelBtnText="Cancel"
             placeholder="Select Date"
             onDateChange={(date) => {this.props.onChange(date)}}
             disabled={this.props.disabled}
             customStyles={{
               dateText: {
                  fontSize: 18,
                  color: '#666666',
                  textAlign: 'left'
               },
               // ... You can check the source to find the other keys.
             }}
           />
        </View>
    )
  }
}
