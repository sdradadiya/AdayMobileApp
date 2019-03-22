var React=require('react');var _ReactNative=
ReactNative=require('react-native'),ViewPropTypes=_ReactNative.ViewPropTypes;
var PropTypes=require('prop-types');
var createReactClass=require('create-react-class');var _ReactNative2=








ReactNative,StyleSheet=_ReactNative2.StyleSheet,Text=_ReactNative2.Text,View=_ReactNative2.View,Animated=_ReactNative2.Animated,TouchableOpacity=_ReactNative2.TouchableOpacity,Image=_ReactNative2.Image,TouchableHighlight=_ReactNative2.TouchableHighlight;


var CustomTabBar=createReactClass({displayName:'CustomTabBar',
propTypes:{
goToPage:PropTypes.func,
activeTab:PropTypes.number,
tabs:PropTypes.array,
backgroundColor:PropTypes.string,
activeTextColor:PropTypes.string,
inactiveTextColor:PropTypes.string,
textStyle:Text.propTypes.style,
tabStyle:ViewPropTypes.style,
renderTab:PropTypes.func,
underlineStyle:ViewPropTypes.style},


getDefaultProps:function getDefaultProps(){
return{
activeTextColor:'black',
inactiveTextColor:'black',
backgroundColor:null};

},

renderTabOption:function renderTabOption(name,page){
},

renderTab:function renderTab(name,page,isTabActive,onPressHandler){var _props=
this.props,activeTextColor=_props.activeTextColor,inactiveTextColor=_props.inactiveTextColor,textStyle=_props.textStyle;
var textColor=isTabActive?activeTextColor:inactiveTextColor;
var fontWeight=isTabActive?'bold':'normal';

return React.createElement(TouchableHighlight,{
style:{flex:1},
key:name,
accessible:true,
accessibilityLabel:name,
accessibilityTraits:'button',
underlayColor:'transparent',
onPress:function onPress(){return onPressHandler(page);}},

React.createElement(View,{style:[styles.tab,this.props.tabStyle,{backgroundColor:'#fff'}]},
name==="SHIFT BUMPS"&&React.createElement(Image,{source:require("../assets/icons/shiftbumps.png"),style:{height:25,width:25,marginBottom:2,marginTop:10}})||

name==="TIME OFF"&&React.createElement(Image,{source:require("../assets/icons/timeoff.png"),style:{height:25,width:25,marginBottom:2,marginTop:10}})||

name==="PREFERENCES"&&React.createElement(Image,{source:require("../assets/icons/preferences.png"),style:{height:25,width:25,marginBottom:2,marginTop:10}}),

React.createElement(Text,{style:[{color:textColor,fontWeight:fontWeight},textStyle,{fontSize:12,fontWeight:'100'}]},
name)));



},

render:function render(){var _this=this;
var containerWidth=this.props.containerWidth;
var numberOfTabs=this.props.tabs.length;
var tabUnderlineStyle={
position:'absolute',
width:containerWidth/numberOfTabs,
height:3,
backgroundColor:'red',
bottom:0};


var translateX=this.props.scrollValue.interpolate({
inputRange:[0,1],
outputRange:[0,containerWidth/numberOfTabs]});

return(
React.createElement(View,{style:[styles.tabs,{backgroundColor:this.props.backgroundColor},this.props.style]},
this.props.tabs.map(function(name,page){
var isTabActive=_this.props.activeTab===page;
var renderTab=_this.props.renderTab||_this.renderTab;
return renderTab(name,page,isTabActive,_this.props.goToPage);
}),
React.createElement(Animated.View,{
style:[
tabUnderlineStyle,
{
transform:[
{translateX:translateX}]},


this.props.underlineStyle]})));




}});


var styles=StyleSheet.create({
tab:{
flex:1,
alignItems:'center',
justifyContent:'center',
paddingBottom:10},

tabs:{
height:50,
flexDirection:'row',
justifyContent:'space-around',
borderWidth:1,
borderTopWidth:0,
borderLeftWidth:0,
borderRightWidth:0,
borderColor:'#ccc'}});



module.exports=CustomTabBar;