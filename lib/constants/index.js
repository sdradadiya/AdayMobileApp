Object.defineProperty(exports,"__esModule",{value:true});exports.Tracker=exports.BASE_API=exports.SERVER_URL=exports.HEADER_COLOR=undefined;























var _reactNativeGoogleAnalyticsBridge=require('react-native-google-analytics-bridge');var HEADER_COLOR=exports.HEADER_COLOR='rgb(0, 0, 160)';var SERVER_URL=exports.SERVER_URL='https://forward-chess-157313.appspot.com';var env='prod';if(process.env.NODE_ENV==='prod'||process.env.NODE_ENV==='production'){env='prod';}else if(process.env.NODE_ENV==='local'){env='local';}else if(process.env.NODE_ENV==='test'){env='test';}var baseUrls={prod:'https://20170808t142850-dot-forward-chess-157313.appspot.com',dev:'https://forward-chess-157313.appspot.com',test:'https://20170919t201545-dot-forward-chess-157313.appspot.com',local:'https://715d08ea.ngrok.io'};var BASE_API=exports.BASE_API=baseUrls[env];
var tracker=new _reactNativeGoogleAnalyticsBridge.GoogleAnalyticsTracker("UA-118304080-1");
var Tracker=exports.Tracker=tracker;