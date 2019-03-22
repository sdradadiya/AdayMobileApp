import React from 'react';
import { Dimensions,Platform } from 'react-native';

export const HEADER_COLOR = 'rgb(0, 0, 160)';
export const SERVER_URL = 'https://forward-chess-157313.appspot.com';
//export const SERVER_URL = 'https://20170808t142850-dot-forward-chess-157313.appspot.com';
// test:
// export const SERVER_URL = 'https://20170919t201545-dot-forward-chess-157313.appspot.com';
//'https://forward-chess-157313.appspot.com'

let env = 'prod';

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  env = 'prod';
} else if (process.env.NODE_ENV === 'local') {
  env = 'local';
} else if (process.env.NODE_ENV === 'test') {
  env = 'test';
}

const baseUrls = {
  prod: 'https://forward-chess-157313.appspot.com',
  dev: 'https://forward-chess-157313.appspot.com',
  test: 'https://20170919t201545-dot-forward-chess-157313.appspot.com',
  local: 'https://715d08ea.ngrok.io'
};

export const BASE_API =  baseUrls[env];
//import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
//let tracker = new GoogleAnalyticsTracker("UA-118304080-1");
//export const Tracker =  tracker;


export const isIphoneX = () => {
    let d = Dimensions.get('window');
    const { height, width } = d;

        // This has to be iOS duh
       if( Platform.OS === 'ios' && (height === 812 || width === 812)){
           return true
       }else{
           return false
       }
};