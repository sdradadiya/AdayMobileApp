Object.defineProperty(exports,"__esModule",{value:true});



var _reactNative=require('react-native');exports.default=



_reactNative.StyleSheet.create({


calendarContainer:{
overflow:'hidden'},

datesStrip:{
flexDirection:'row'},

calendarDates:{
flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'center'},

calendarHeader:{
fontSize:16,
textAlign:'center',
fontWeight:'bold',
marginBottom:10,
marginTop:10},

iconContainer:{
justifyContent:'center',
alignItems:'center'},

icon:{
width:20,
height:20,
resizeMode:'contain'},



dateContainer:{
justifyContent:'center',
alignItems:'center',
padding:0,
width:43},

dateName:{
fontSize:10,
textAlign:'center'},

weekendDateName:{
fontSize:10,
color:'#A7A7A7',
textAlign:'center'},

dateNumber:{
fontSize:18,
fontWeight:'bold',
textAlign:'center'},

weekendDateNumber:{
fontSize:18,
color:'#A7A7A7',
fontWeight:'bold',
textAlign:'center'}});