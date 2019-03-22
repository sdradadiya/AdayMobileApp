var React=require('react');
var ReactNative=require('react-native');var
StyleSheet=ReactNative.StyleSheet;





var styles=StyleSheet.create({





title:{
flex:1,
justifyContent:'center',
alignItems:'center'},

titleTextBlue:{
color:'#0022A1',
fontSize:16},

titleTextiOSBlue:{
color:'#007AFF',
fontSize:16},

titleTextRed:{
color:'#E33821',
fontSize:16},

header:{
height:50,
flexDirection:'row',
backgroundColor:'white'},



iosHeader:{
height:50,
flexDirection:'row',
backgroundColor:'#F7F7F7',
borderBottomWidth:0.75,
borderBottomColor:'#6D6D72'},

headerButtonImage:{
height:15,
width:15,
resizeMode:'contain',
justifyContent:'center'},

headerButton:{
alignItems:'center',
flex:0.3,
flexDirection:'row',
justifyContent:'center'},







avatarSize:{
width:30,
height:30},

center:{
justifyContent:'center',
alignItems:'center'},

contactsViewContainer:{
flex:1,
flexDirection:"row",
marginTop:5},

label:{
fontSize:12,
color:'#4A4A4A',
fontFamily:'Roboto'},

separator:{
flex:1,
height:0.25,
backgroundColor:'#979797'},

subText:{
fontSize:12,
color:'rgba(0,0,0,0.3)',
fontFamily:'Roboto'},

textFirstName:{
fontSize:16,
color:'rgba(0,0,0,0.8)',
fontFamily:'Helvetica-Light',
fontWeight:'bold'},

textLastName:{
fontSize:16,
color:'rgba(0,0,0,0.8)',
fontFamily:'Helvetica-Light'},

textNumber:{
fontSize:18,
color:'#4A4A4A',
fontFamily:'Roboto',
fontWeight:'bold'},






subtabContainer:{
flexDirection:'row',
justifyContent:'space-between',
height:26,
borderBottomWidth:2,
borderBottomColor:'rgba(0,0,0,0.3)',
padding:3,
margin:0},

subtabActiveText:{
color:'rgba(0,0,0,0.8)',
fontFamily:'Roboto',
fontSize:10},

subtabPassiveText:{
color:'rgba(0,0,0,0.4)',
fontFamily:'Roboto',
fontSize:10},

subtabStyle:{
flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'center'},





inputFieldIcon:{
borderColor:'#EEF4F5',
borderWidth:1,
flexDirection:'row',
height:50,
marginVertical:5},

inputButton:{
height:45,
width:45,
resizeMode:'contain',
justifyContent:'center',
alignItems:'center'}});




module.exports={
STYLES:styles};