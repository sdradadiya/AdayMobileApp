Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n query UserById($id: Uuid!){\n  userById(id: $id){\n    id\n    firstName\n    lastName\n    zipCode\n    homeAddress\n    userPhoneConfirmed\n    userPhoneNumber\n    aboutMeText\n    userEmail\n    avatarUrl\n    userReferencesByUserId{\n      edges{\n        node{\n          id\n          firstName\n          lastName\n          referencePhoneNumber\n          referenceEmailAddress\n          relationship\n          userId\n        }\n      }\n    }\n    userEmployersByUserId{\n      nodes{\n         id\n         userId\n         employerName\n         city\n         state\n         jobTitle\n         jobDescription\n         startDate\n         endDate\n      }\n    }\n  \tuserEducationsByUserId{\n      nodes{\n        id\n        userId\n        educationalInstitutionName,\n        city\n        state\n        awardType\n        fieldOfStudy\n        startDate\n        endDate\n      }\n    }\n    userLanguagesByUserId {\n      nodes {\n        id\n        userId\n        languageName\n      }\n    }\n    userAvailabilitiesByUserId {\n      nodes {\n        id\n        userId\n        hourRange\n      }\n    }\n  }\n}'],['\n query UserById($id: Uuid!){\n  userById(id: $id){\n    id\n    firstName\n    lastName\n    zipCode\n    homeAddress\n    userPhoneConfirmed\n    userPhoneNumber\n    aboutMeText\n    userEmail\n    avatarUrl\n    userReferencesByUserId{\n      edges{\n        node{\n          id\n          firstName\n          lastName\n          referencePhoneNumber\n          referenceEmailAddress\n          relationship\n          userId\n        }\n      }\n    }\n    userEmployersByUserId{\n      nodes{\n         id\n         userId\n         employerName\n         city\n         state\n         jobTitle\n         jobDescription\n         startDate\n         endDate\n      }\n    }\n  \tuserEducationsByUserId{\n      nodes{\n        id\n        userId\n        educationalInstitutionName,\n        city\n        state\n        awardType\n        fieldOfStudy\n        startDate\n        endDate\n      }\n    }\n    userLanguagesByUserId {\n      nodes {\n        id\n        userId\n        languageName\n      }\n    }\n    userAvailabilitiesByUserId {\n      nodes {\n        id\n        userId\n        hourRange\n      }\n    }\n  }\n}']),_templateObject2=_taggedTemplateLiteral(['\n  mutation updateUserById($id: Uuid!) {\n      updateUserById(input: {id: $id, userPatch: {userPhoneConfirmed: true}}) {\n          user{\n              id\n              userPhoneConfirmed\n          }\n      }\n  }'],['\n  mutation updateUserById($id: Uuid!) {\n      updateUserById(input: {id: $id, userPatch: {userPhoneConfirmed: true}}) {\n          user{\n              id\n              userPhoneConfirmed\n          }\n      }\n  }']),_templateObject3=_taggedTemplateLiteral(['\n    mutation createUserAvailability($id: Uuid!, $userId: Uuid!, $hourRange: String!) {\n        createUserAvailability(input: {userAvailability: {id: $id, userId: $userId, hourRange: $hourRange}}) {\n            userAvailability {\n                id\n                userId\n                hourRange\n            }\n        }\n    }'],['\n    mutation createUserAvailability($id: Uuid!, $userId: Uuid!, $hourRange: String!) {\n        createUserAvailability(input: {userAvailability: {id: $id, userId: $userId, hourRange: $hourRange}}) {\n            userAvailability {\n                id\n                userId\n                hourRange\n            }\n        }\n    }']),_templateObject4=_taggedTemplateLiteral(['\n    mutation updateUserAvailabilityById($id: Uuid!, $userId: Uuid!, $hourRange: String!) {\n        updateUserAvailabilityById(input: {id: $id, userAvailabilityPatch: {userId: $userId, hourRange: $hourRange}}) {\n            userAvailability {\n                id\n                userId\n                hourRange\n            }\n        }\n    }'],['\n    mutation updateUserAvailabilityById($id: Uuid!, $userId: Uuid!, $hourRange: String!) {\n        updateUserAvailabilityById(input: {id: $id, userAvailabilityPatch: {userId: $userId, hourRange: $hourRange}}) {\n            userAvailability {\n                id\n                userId\n                hourRange\n            }\n        }\n    }']);

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _nativeBase=require('native-base');






var _reactNative=require('react-native');











var _reactNativeRouterFlux=require('react-native-router-flux');


var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeImagePicker=require('react-native-image-picker');var _reactNativeImagePicker2=_interopRequireDefault(_reactNativeImagePicker);




var _SpinnerComponent=require('./../SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _reactApollo=require('react-apollo');









var _reactNativeSimpleModal=require('react-native-simple-modal');var _reactNativeSimpleModal2=_interopRequireDefault(_reactNativeSimpleModal);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _v=require('uuid/v1');var _v2=_interopRequireDefault(_v);
var _superagent=require('superagent');var _superagent2=_interopRequireDefault(_superagent);
var _constants=require('../../constants');
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var





MyProfileComponent=function(_Component){_inherits(MyProfileComponent,_Component);
function MyProfileComponent(props){_classCallCheck(this,MyProfileComponent);var _this2=_possibleConstructorReturn(this,(MyProfileComponent.__proto__||Object.getPrototypeOf(MyProfileComponent)).call(this,
props));
_this2.state={
id:null,
availabilityId:"",
showDetails:false,
isFullTime:true,
availabilityShow:true,
avatarSource:require('./../assets/profile-icons/anonymous-profile.png'),
openModal:false,
references:[],
homeAddress:{},
isIdentified:false,
contactInfoPhoneNumberEnterFields:false,
contactInfoPhoneNumber:"",
contactInfoErrorMessage:false,
phoneNumberVerifyCode:'',
isContactInfoVerified:false,
contactInfoEmail:'',
modalData:{
imgUrl:require('./../assets/profile-icons/book-icon.png'),
paragraph:'',
button1:{
name:'',
arguments:'',
url:''},

button2:{
name:'',
arguments:'',
url:''},

button3:{
name:'',
arguments:'',
url:''}},


isLoading:false,
ds:new _reactNative.ListView.DataSource({
rowHasChanged:function rowHasChanged(r1,r2){return r1!==r2;}})};


_this2.onAvailabilitySavePress=_this2.onAvailabilitySavePress.bind(_this2);
_this2.openModal=_this2.openModal.bind(_this2);
_this2.textVerificationCode=_this2.textVerificationCode.bind(_this2);
_this2.imagePicker=_this2.imagePicker.bind(_this2);
_this2.setAvatar=_this2.setAvatar.bind(_this2);
_this2.pickIdentityDocument=_this2.pickIdentityDocument.bind(_this2);
_this2.saveIdentityDocument=_this2.saveIdentityDocument.bind(_this2);
_this2.contactInfoPhoneNumberValidation=_this2.contactInfoPhoneNumberValidation.bind(_this2);
_this2.verifyPhoneNumber=_this2.verifyPhoneNumber.bind(_this2);
_index.Tracker.trackScreenView("User Profife");return _this2;
}_createClass(MyProfileComponent,[{key:'componentDidMount',value:function componentDidMount()

{

}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){var _this3=this;
this.props.data.refetch();
if(!nextProps.data.loading&&nextProps.data.loading!=this.props.loading){
var _this=this;

var references=nextProps.data.userById.userReferencesByUserId.edges;
var workHistory=nextProps.data.userById.userEmployersByUserId.nodes;
var educationHistory=nextProps.data.userById.userEducationsByUserId.nodes;
var languages=nextProps.data.userById.userLanguagesByUserId.nodes;
var availability=nextProps.data.userById.userAvailabilitiesByUserId.nodes[0];

this.setState({workHistory:workHistory});
this.setState({educationHistory:educationHistory});

var isFullTime=true;
if(availability&&availability.hourRange==="PART-TIME"){
isFullTime=false;
}

if(nextProps.data.userById){var _nextProps$data$userB=







nextProps.data.userById,id=_nextProps$data$userB.id,userEmail=_nextProps$data$userB.userEmail,avatarUrl=_nextProps$data$userB.avatarUrl,firstName=_nextProps$data$userB.firstName,lastName=_nextProps$data$userB.lastName,aboutMeText=_nextProps$data$userB.aboutMeText;
if(typeof aboutMeText==='string'){
aboutMeText=aboutMeText.trim();
}
}





if(!this.state.saveAboutMeData){
this.setState({saveAboutMeData:true},function(){
nextProps.actions.saveAboutMeData({
id:id,
userEmail:userEmail,
avatarUrl:avatarUrl,
firstName:firstName,
lastName:lastName,
aboutMeText:aboutMeText});

});
}


var phoneNumber=nextProps.data.userById.userPhoneNumber;
var email=nextProps.data.userById.userEmail;

if(!this.state.saveContactInfo){
this.setState({saveContactInfo:true},function(){
_this3.props.actions.saveContactInfo({
phoneNumber:phoneNumber,
email:email});

});
}


var address=JSON.parse(nextProps.data.userById.homeAddress)&&JSON.parse(nextProps.data.userById.homeAddress).home_address[0];
var zipCode=nextProps.data.userById.zipCode;
var homeAddress=null;
if(address){
var homeAddress1=address.address_line1;
var homeAddress2=address.address_line2;
var city=address.city;
var state=address.state;
homeAddress={
homeAddress1:homeAddress1,
homeAddress2:homeAddress2,
city:city,
state:state,
zipCode:zipCode};

}


var phoneConfirmed=nextProps.data.userById?nextProps.data.userById.userPhoneConfirmed:
this.state.isContactInfoVerified;

var avatarSource="";
if(avatarUrl){
var avatarSource={uri:avatarUrl+"?"+new Date().getTime()};
}

this.setState({
id:nextProps.state.myProfile.id,
references:references.map(function(all){return all.node;}),
homeAddress:homeAddress,
contactInfoPhoneNumber:nextProps.state.myProfile.phoneNumber,
contactInfoEmail:nextProps.state.myProfile.email,
isContactInfoVerified:phoneConfirmed,
isLoading:false,
availabilityId:availability&&availability.id,
isFullTime:isFullTime,
avatarSource:avatarSource,
languages:languages});


}
}},{key:'renderRow',value:function renderRow(

dataRow,sectionID,rowID){
return(
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'#F7F7F7',marginTop:10}},
_react2.default.createElement(_reactNative.Text,{style:{paddingLeft:20,fontWeight:'bold',fontSize:15}},'Reference ',++rowID),
_react2.default.createElement(_reactNative.View,{style:{marginTop:10,paddingVertical:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:{paddingLeft:20}},dataRow.firstName+" ",dataRow.lastName||""),
_react2.default.createElement(_reactNative.Text,{style:{paddingLeft:20}},dataRow.referencePhoneNumber)),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.AddReferenceManually({data:dataRow});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:40,height:40},
source:require('./../assets/profile-icons/edit-button.png')})))));





}},{key:'onAvailabilitySavePress',value:function onAvailabilitySavePress()

{var _this4=this;

var action=this.state.availabilityId?"updateUserAvailabilityById":"createUserAvailability";
var id=this.state.availabilityId?this.state.availabilityId:(0,_v2.default)();
var hourRange=this.state.isFullTime?"FULL-TIME":"PART-TIME";

var availability={
id:id,
hourRange:hourRange,
userId:this.props.state.myProfile.id};

this.setState({
isLoading:true});

this.props[action]({
variables:availability}).

then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update or Create User Availability");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update or Create User Availability");
});

console.log('done');
_this4.setState({
availabilityShow:true,
isLoading:false});

}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
console.log(id);
});

}},{key:'pickAvatar',value:function pickAvatar()

{
var options={
title:'Select Avatar',
mediaType:'photo',
maxWidth:1024,
maxHeight:1024,
storageOptions:{
skipBackup:true,
path:'images'}};


this.imagePicker(options,this.setAvatar);
}},{key:'setAvatar',value:function setAvatar(

response){var _this5=this;
if(response.didCancel){
console.log('User cancelled image picker');
}else if(response.error){
console.log('ImagePicker Error: ',response.error);
}else if(response.customButton){
console.log('User tapped custom button: ',response.customButton);
}else{
_superagent2.default.post(_constants.BASE_API+'/api/uploadImage').
field('keyword','user').
field('id',this.state.id).
attach("base64Data",response.data).
end(function(err,res){
if(err){

console.log(err);
alert('Error Uploading Profile Picture');
}else{
alert('File uploaded!');

var source={
uri:response.uri+"?"+new Date().getTime()};

_this5.setState({
avatarSource:source});

}
});


}
}},{key:'pickIdentityDocument',value:function pickIdentityDocument(

type){
var options={
title:'Select '+type,
storageOptions:{
skipBackup:true,
path:'images'}};


this.setState({
identifyDocType:type.toUpperCase(),
openModal:false});

this.imagePicker(options,this.saveIdentityDocument);
}},{key:'saveIdentityDocument',value:function saveIdentityDocument(

response){
var isIdentified=void 0;
if(response.didCancel){
console.log('User cancelled image picker');
}else if(response.error){
console.log('ImagePicker Error: ',response.error);
}else if(response.customButton){
console.log('User tapped custom button: ',response.customButton);
}else{
isIdentified=true;


}
this.setState({
isIdentified:isIdentified});

}},{key:'imagePicker',value:function imagePicker(

options,callback){
_reactNativeImagePicker2.default.showImagePicker(options,function(response){
callback(response);
});
}},{key:'renderWorkHistory',value:function renderWorkHistory(

dataRow,sectionID,rowID){
var isJobDescription=dataRow.jobDescription!=="";
var isEndDate=dataRow.endDate;
return(
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:{fontSize:16,marginLeft:20}},'EMPLOYER ',1+parseInt(rowID)),
_react2.default.createElement(_reactNative.View,{style:{flex:1,flexDirection:"row",marginVertical:5,backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.View,{style:{flex:0.9,marginVertical:10,marginLeft:20}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.employerName),
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.city),
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.state)),


_react2.default.createElement(_reactNative.Text,{style:styles.text},
(0,_moment2.default)(dataRow.startDate).format("MMM Do YYYY"),
isEndDate&&" - "+(0,_moment2.default)(dataRow.endDate).format("MMM Do YYYY")),

isJobDescription&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.jobDescription))),



_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.work({work:dataRow,workId:rowID});}},
_react2.default.createElement(_reactNative.View,{style:{flex:0.1,marginTop:5}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:50,height:50},
source:require('./../assets/profile-icons/edit-button.png')}))))));






}},{key:'renderEducationHistory',value:function renderEducationHistory(

dataRow,sectionID,rowID){
var isAwardType=dataRow.awardType!=="";
var isFieldOfStudy=dataRow.fieldOfStudy!=="";
var isEndDate=dataRow.endDate!=="";
return(
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:{fontSize:16,marginLeft:20}},'DEGREE ',1+parseInt(rowID)),
_react2.default.createElement(_reactNative.View,{style:{flex:1,flexDirection:"row",marginTop:5,backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.View,{style:{flex:0.9,marginVertical:10,marginLeft:20}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.educationalInstitutionName),
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.city),
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.state)),

_react2.default.createElement(_reactNative.Text,{style:styles.text},
(0,_moment2.default)(dataRow.startDate).format("MMM Do YYYY"),
isEndDate&&" - "+(0,_moment2.default)(dataRow.endDate).format("MMM Do YYYY")),

isAwardType&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.awardType)),


isFieldOfStudy&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.text},dataRow.fieldOfStudy))),



_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Education({education:dataRow,educationId:rowID});}},
_react2.default.createElement(_reactNative.View,{style:{flex:0.1,marginTop:5}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:50,height:50},
source:require('./../assets/profile-icons/edit-button.png')}))))));






}},{key:'renderLanguages',value:function renderLanguages(

dataRow,sectionID,rowID){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,flexDirection:"row",marginTop:5,backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.View,{style:{flex:0.9,marginTop:10,marginLeft:20}},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:16}},dataRow.languageName)),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Languages({language:dataRow});}},
_react2.default.createElement(_reactNative.View,{style:{flex:0.1,marginTop:5}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:50,height:50},
source:require('./../assets/profile-icons/edit-button.png')})))));





}},{key:'openModal',value:function openModal(


type){
var modalData=this.state.modalData;
if(type==='references'){
modalData.type=type;
modalData.imgUrl=require('./../assets/profile-icons/book-icon.png');
modalData.paragraph='How do you want to add a new reference?';
modalData.button1.name='BY CONTACTS - Coming Soon';
modalData.button1.url=_reactNativeRouterFlux.Actions.AddReferenceManually;
modalData.button1.arguments='';
modalData.button2.name='MANUALLY';
modalData.button2.url=_reactNativeRouterFlux.Actions.AddReferenceManually;
modalData.button2.arguments='';
}else if(type==='identification'){
modalData.type=type;
modalData.imgUrl=require('./../assets/profile-icons/identification-modal.png');
modalData.paragraph='Aday must confirm your identity before applying to more than 3 jobs, how would you like to verify?';
modalData.button1.name='STATE ID';
modalData.button1.url=this.pickIdentityDocument;
modalData.button1.arguments='State Id';
modalData.button2.name='PASSPORT';
modalData.button2.url=this.pickIdentityDocument;
modalData.button2.arguments='Passport';
}else if(type==='contactInfo'){
modalData.type=type;
modalData.imgUrl=require('./../assets/profile-icons/contact-info.png');
modalData.paragraph='Aday must confirm your phone number to begin accepting shifts, how would you like to verify?';
modalData.button1.name='TEXT ME';
modalData.button1.url=this.textVerificationCode;
modalData.button1.arguments='';
modalData.button2.name='CALL ME - coming soon';
modalData.button2.url=this.openModal;
modalData.button2.arguments='contactInfo';
modalData.button3.name='I HAVE A CODE';
modalData.button3.url=this.openModal;
modalData.button3.arguments='verifyPhoneNumber';
}else if(type==='verifyPhoneNumber'){
modalData.type=type;
modalData.imgUrl=require('./../assets/profile-icons/contact-info.png');
modalData.button1.name='VERIFY NUMBER';
modalData.button1.url=this.verifyPhoneNumber;
modalData.button1.arguments='';
modalData.button2.name="DIDN'T RECEIVE A CODE?";
modalData.button2.url=this.openModal;
modalData.button2.arguments='contactInfo';
}
this.setState({
openModal:true,
modalData:modalData});


}},{key:'textVerificationCode',value:function textVerificationCode()


{

fetch(_constants.BASE_API+'/api/sendCode',{
method:'POST',
headers:{
Accept:'application/json',
'Content-Type':'application/json'},

body:JSON.stringify({
userId:this.props.state.myProfile.id,
firstName:this.props.state.aboutMe.firstName,
phoneNumber:this.props.state.myProfile.phoneNumber})}).

catch(function(error){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed while sending TextVerificationCode');
console.error(error);
});
this.openModal('verifyPhoneNumber');
}},{key:'verifyPhoneNumber',value:function verifyPhoneNumber()


{var _this6=this;

var verifyCode=false;
fetch(_constants.BASE_API+'/api/verifyCode',{
method:'POST',
headers:{
Accept:'application/json',
'Content-Type':'application/json'},

body:JSON.stringify({
userId:this.state.id,
confirmationCode:this.state.phoneNumberVerifyCode})}).

then(function(response){
if(response._bodyText=="Code expired"||response._bodyText=="Code invalid"){

_this6.setState({
contactInfoErrorMessage:response._bodyText,
openModal:false});

}else if(response._bodyText=="Success"){
verifyCode=true;
}
}).then(function(){

if(verifyCode){
_this6.setState({
openModal:false,
isContactInfoVerified:true,
contactInfoErrorMessage:null});



















}else
if(!_this6.state.contactInfoErrorMessage){

errorMessage='Unable to Verify';
_this6.setState({
contactInfoErrorMessage:errorMessage,
openModal:false});

}
}).catch(function(error){
_reactNative.Alert.alert('ADay','Your Code is Expired!!');
console.error(error);
}).catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed while Verifying Code');
});

}},{key:'contactInfoPhoneNumberValidation',value:function contactInfoPhoneNumberValidation()



{
var phoneNumber=this.state.contactInfoPhoneNumber;
var id=this.state.id;
var errorMessage=false;
if(phoneNumber){
this.openModal('contactInfo');
}else{

errorMessage='Please Enter Phone Number!';
this.setState({
contactInfoErrorMessage:errorMessage});

}
}},{key:'render',value:function render()

{var _this7=this;



if(this.props.data.loading||this.state.isLoading){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));


}var

aboutMe=this.props.state.aboutMe;var _state=
this.state,workHistory=_state.workHistory,educationHistory=_state.educationHistory,languages=_state.languages;
var references=this.state.references;
var homeAddress=this.state.homeAddress;
var isReferences=references.length>0;
var isHomeAddress=homeAddress&&Object.keys(homeAddress).length>0;
var isWorkExperience=workHistory&&workHistory.length>0;
var isEducation=educationHistory&&educationHistory.length>0;
var modalData=this.state.modalData;
var isLanguages=languages&&languages.length>0;
var isIdentified=this.state.isIdentified;
var identifyDocType=this.state.identifyDocType;
var contactInfoPhoneNumberEnterFields=this.state.contactInfoPhoneNumberEnterFields;
var contactInfoErrorMessage=this.state.contactInfoErrorMessage;
var isContactInfoVerified=this.state.isContactInfoVerified;
var phoneNumber=this.state.contactInfoPhoneNumber;
var email=this.state.contactInfoEmail;
var id=this.state.id;

return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.View,{style:{flex:1}},
_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginTop:10}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this7.pickAvatar();}},
_react2.default.createElement(_nativeBase.Thumbnail,{
style:{width:100,height:100,borderRadius:50},
source:this.state.avatarSource})),


_react2.default.createElement(_reactNative.Text,{style:{fontSize:22,fontWeight:'bold'}},aboutMe.firstName),
_react2.default.createElement(_reactNative.Text,{style:{fontSize:22,fontFamily:'Roboto'}},aboutMe.lastName)),

_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginTop:20,flexDirection:'row',marginHorizontal:30}]},
_react2.default.createElement(_reactNative.View,{style:[styles.center,{justifyContent:'flex-start'}]},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:20,height:20},
source:require('./../assets/comma.png')})),


_react2.default.createElement(_reactNative.View,{style:{marginHorizontal:10}},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:20,fontFamily:'Roboto',textAlign:'center'}},
aboutMe.aboutMeText)),


_react2.default.createElement(_reactNative.View,{style:[styles.center,{justifyContent:'flex-end'}]},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:20,height:20},
source:require('./../assets/commavv.png')}))),



_react2.default.createElement(_reactNative.View,{style:[styles.center,{height:100,backgroundColor:'#F7F7F7',marginVertical:5}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.AboutMe();}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:75,height:75},
source:require('./../assets/profile-icons/edit.png')}))),





_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',backgroundColor:'#F7F7F7',marginTop:5}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/suitcase-white-bg.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},'WORK EXPERIENCE'),
isWorkExperience&&

_react2.default.createElement(_reactNative.View,{style:{position:'absolute',right:10}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.work({});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/plus-button.png')})))),





!isWorkExperience&&
_react2.default.createElement(_reactNative.View,{
style:[styles.center,{height:100,backgroundColor:'#F7F7F7',marginVertical:10}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.work({userId:id});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:75,height:75},
source:require('./../assets/profile-icons/add.png')}))),




isWorkExperience&&
_react2.default.createElement(_reactNative.View,{style:{marginVertical:10}},
_react2.default.createElement(_reactNative.ListView,{
enableEmptySections:true,
dataSource:this.state.ds.cloneWithRows(workHistory),
renderRow:this.renderWorkHistory.bind(this)})),





_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',backgroundColor:'#F7F7F7',marginTop:5}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/icons-graduation.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},'EDUCATION'),
isEducation&&
_react2.default.createElement(_reactNative.View,{style:{position:'absolute',right:10}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Education({});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/plus-button.png')})))),





!isEducation&&
_react2.default.createElement(_reactNative.View,{
style:[styles.center,{height:100,backgroundColor:'#F7F7F7',marginVertical:10}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Education({});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:75,height:75},
source:require('./../assets/profile-icons/add.png')}))),




isEducation&&
_react2.default.createElement(_reactNative.View,{style:{marginVertical:10}},
_react2.default.createElement(_reactNative.ListView,{
enableEmptySections:true,
dataSource:this.state.ds.cloneWithRows(educationHistory),
renderRow:this.renderEducationHistory.bind(this)})),





_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',backgroundColor:'#F7F7F7',marginTop:5}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/reference-icon.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},'REFERENCES'),
isReferences&&
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this7.openModal('references');},style:{position:'absolute',right:5}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/plus-button.png')}))),




!isReferences&&
_react2.default.createElement(_reactNative.View,{style:[styles.center,{height:100,backgroundColor:'#F7F7F7',marginVertical:10}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this7.openModal('references');}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:75,height:75},
source:require('./../assets/profile-icons/add.png')}))),




isReferences&&
_react2.default.createElement(_reactNative.View,{style:{marginVertical:10}},
_react2.default.createElement(_reactNative.ListView,{
enableEmptySections:true,
dataSource:this.state.ds.cloneWithRows(this.state.references),
renderRow:this.renderRow.bind(this)})),





_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',backgroundColor:'#F7F7F7',marginTop:5}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/discussion-white-bg.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},'AVAILABILITY')),


_react2.default.createElement(_reactNative.View,{style:[styles.center,{height:100,backgroundColor:'#F7F7F7',marginVertical:10}]},

!this.state.availabilityShow&&
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this7.setState({availabilityShow:true});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:75,height:75},
source:require('./../assets/profile-icons/add.png')})),



this.state.availabilityShow&&
_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center'}},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',justifyContent:'center'}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this7.setState({isFullTime:true});},
containerStyle:this.state.isFullTime?styles.activeButton:styles.passiveButton,
style:this.state.isFullTime?styles.activeButtonText:styles.passiveButtonText},
'Full-Time (> 30 Hours)'),

_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this7.setState({isFullTime:false});},
containerStyle:!this.state.isFullTime?styles.activeButton:styles.passiveButton,
style:!this.state.isFullTime?styles.activeButtonText:styles.passiveButtonText},
'Part-Time (< 30 Hours)')),


_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',justifyContent:'center',marginTop:10}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this7.onAvailabilitySavePress();},
containerStyle:styles.saveButton,
style:{color:'white'}},'SAVE')))),







_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',marginTop:10,backgroundColor:'#F7F7F7'}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:40,height:40},
source:require('./../assets/profile-icons/privacy.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10,color:'red',fontWeight:'bold',fontSize:18}},'PERSONAL INFORMATION')),

_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginVertical:10}]},
_react2.default.createElement(_reactNative.Text,null,'The information below is not available to the'),


_react2.default.createElement(_reactNative.Text,null,'employer until you are hired')),





_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',backgroundColor:'#F7F7F7'}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/icons-home.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},'HOME ADDRESS')),


!isHomeAddress&&
_react2.default.createElement(_reactNative.View,{style:[styles.center,{height:100,backgroundColor:'#F7F7F7',marginVertical:10}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.HomeAddress({addressName:'homeAddress'});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:75,height:75},
source:require('./../assets/profile-icons/add.png')}))),




isHomeAddress&&
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'#F7F7F7',marginTop:10}},
_react2.default.createElement(_reactNative.View,{style:{marginTop:10,paddingVertical:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:{paddingLeft:20}},homeAddress.homeAddress1),
_react2.default.createElement(_reactNative.Text,{style:{paddingLeft:20}},homeAddress.homeAddress2),
_react2.default.createElement(_reactNative.Text,{style:{paddingLeft:20}},homeAddress.city+", "+homeAddress.state+" ",
homeAddress.zipCode)),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.HomeAddress({addressName:'homeAddress',homeAddress:homeAddress});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:40,height:40},
source:require('./../assets/profile-icons/edit-button.png')})))),






_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',backgroundColor:'#F7F7F7',marginTop:5}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/icons-home.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},'CONTACT INFO')),

contactInfoErrorMessage&&
_react2.default.createElement(_reactNative.Text,{style:styles.errorText},contactInfoErrorMessage),

_react2.default.createElement(_reactNative.View,{style:[styles.center,{backgroundColor:'#F7F7F7',marginVertical:10}]},

















































(isContactInfoVerified||true)&&
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'#F7F7F7',width:width}},
_react2.default.createElement(_reactNative.View,{style:{marginTop:10,paddingVertical:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.View,{style:[{flexDirection:'row',padding:10,alignItems:'center',backgroundColor:'#F7F7F7'}]},
!isContactInfoVerified?
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:20,height:20},
source:require('./../assets/profile-icons/alert-red.png')}):

_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:22,height:23},
source:require('./../assets/profile-icons/phone.png')}),


_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},phoneNumber)),

!isContactInfoVerified&&
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.TouchableOpacity,{
onPress:function onPress(){return _this7.contactInfoPhoneNumberValidation();},
style:styles.contactInfoSaveButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.contactInfoSaveButtonName},'VERIFY'))),



_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.EditContactInfo(
{id:id,contactInfo:{phoneNumber:phoneNumber,email:email,verified:isContactInfoVerified}});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:40,height:40},
source:require('./../assets/profile-icons/edit-button.png')}))),



_react2.default.createElement(_reactNative.View,{style:{marginTop:10,paddingVertical:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.View,{style:[{flexDirection:'row',padding:10,alignItems:'center',backgroundColor:'#F7F7F7'}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:22,height:23},
source:require('./../assets/profile-icons/email.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},email)),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.EditContactInfo(
{id:id,contactInfo:{phoneNumber:phoneNumber,email:email,verified:isContactInfoVerified}});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:40,height:40},
source:require('./../assets/profile-icons/edit-button.png')}))))),





















































_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',paddingVertical:7,backgroundColor:'white'}]}),
_react2.default.createElement(_reactNative.View,{style:[styles.center,{flexDirection:'row',marginTop:5,backgroundColor:'#F7F7F7'}]},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/profile.png')}),

_react2.default.createElement(_reactNative.Text,{style:{marginLeft:10}},'LANGUAGES'),
isLanguages&&
_react2.default.createElement(_reactNative.View,{style:{position:'absolute',right:10}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Languages();}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/profile-icons/plus-button.png')})))),





!isLanguages&&
_react2.default.createElement(_reactNative.View,{
style:[styles.center,{height:100,backgroundColor:'#F7F7F7',marginTop:10,marginBottom:20}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Languages();}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:75,height:75},
source:require('./../assets/profile-icons/add.png')}))),




isLanguages&&
_react2.default.createElement(_reactNative.View,{style:{marginBottom:10,marginTop:20}},
_react2.default.createElement(_reactNative.ListView,{
enableEmptySections:true,
dataSource:this.state.ds.cloneWithRows(languages),
renderRow:this.renderLanguages.bind(this)}))))),






_react2.default.createElement(_reactNativeSimpleModal2.default,{
offset:200,
open:this.state.openModal,
overlayBackground:'rgba(100, 100, 100, 0.3)',
modalDidOpen:function modalDidOpen(){return undefined;},
modalDidClose:function modalDidClose(){return _this7.setState({openModal:false});},
containerStyle:styles.modalContainer,
modalStyle:styles.modalContentContainer},

_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.View,{style:styles.modalContent},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:110,height:110},
source:modalData.imgUrl}),

_react2.default.createElement(_reactNative.Text,{style:styles.modalText},modalData.paragraph),
modalData.type==='verifyPhoneNumber'&&
_react2.default.createElement(_reactNative.View,{style:styles.verifyNumberInputField},
_react2.default.createElement(_nativeBase.Input,{
style:{paddingLeft:20,marginTop:2},
defaultValue:this.state.phoneNumberVerifyCode,
onChangeText:function onChangeText(text){return _this7.setState({phoneNumberVerifyCode:text});},
returnKeyType:'next',
keyboardType:'numeric',
placeholder:'CODE'})),



(modalData.type==='references'||modalData.type==='identification'||modalData.type==='verifyPhoneNumber')&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return modalData.button1.url(modalData.button1.arguments);},style:styles.modalButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.modalButtonName},modalData.button1.name)),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return modalData.button2.url(modalData.button2.arguments);},
style:modalData.type==='verifyPhoneNumber'?styles.modalWhiteBackgroundButtonContainer:styles.modalButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:modalData.type==='verifyPhoneNumber'?styles.modalWhiteBackgroundButtonName:styles.modalButtonName},modalData.button2.name))),



modalData.type==='contactInfo'&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.View,{style:styles.contactInfoModalButtonsRow},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return modalData.button1.url(modalData.button1.arguments);},style:styles.contactInfoModalSmallButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.modalButtonName},modalData.button1.name)),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return modalData.button2.url(modalData.button2.arguments);},style:styles.contactInfoModalSmallButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.modalButtonName},modalData.button2.name))),


_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center',alignItems:'center'}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return modalData.button3.url(modalData.button3.arguments);},style:styles.modalWhiteBackgroundButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.modalWhiteBackgroundButtonName},modalData.button3.name))))),





_react2.default.createElement(_reactNative.View,{style:styles.modalFooterContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this7.setState({openModal:false});}},
_react2.default.createElement(_reactNative.Image,{
resizeMode:'contain',
style:{width:50,height:50},
source:require('./../assets/profile-icons/close-button-modal.png')})))))));







}}]);return MyProfileComponent;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:0},

android:{
paddingTop:0}})),



center:{
justifyContent:'center',
alignItems:'center',
paddingVertical:10},

activeButton:{
padding:3,
height:25,
width:170,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#007AFF'},

activeButtonText:{
fontSize:15,
color:'white'},

passiveButton:{
padding:3,
height:25,
width:170,
overflow:'hidden',
borderRadius:1,
backgroundColor:'white',
borderWidth:1,
borderColor:'#007AFF'},

passiveButtonText:{
fontSize:15,
color:'#007AFF'},

saveButton:{
padding:7,
height:35,
width:130,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#0022A1'},

text:{
fontSize:15,
color:'#4A4A4A'},

modalContainer:{
justifyContent:'flex-start',
alignItems:'center'},

modalContentContainer:{
marginTop:65,
width:width*0.8,
padding:0,
borderRadius:5,
backgroundColor:'transparent'},

modalContent:{
paddingTop:10,
paddingBottom:20,
paddingHorizontal:20,
borderRadius:5,
borderColor:'rgb(153,153,153)',
justifyContent:'center',
alignItems:'center',
backgroundColor:'white'},

modalText:{
color:'#4A4A4A',
textAlign:'center',
paddingVertical:10,
width:width*0.6},

modalButtonContainer:{
backgroundColor:'#0022A1',
padding:10,
width:width*0.55,
marginVertical:5},

contactInfoModalSmallButtonContainer:{
backgroundColor:'#0022A1',
padding:10,
width:width*0.3,
marginVertical:5,
marginHorizontal:5},

modalWhiteBackgroundButtonContainer:{
backgroundColor:'white',
borderWidth:1,
borderColor:'grey',
padding:10,
width:width*0.55,
marginVertical:5},

modalButtonName:{
color:'white',
fontWeight:'bold',
textAlign:'center'},

modalWhiteBackgroundButtonName:{
color:'black',
fontWeight:'bold',
textAlign:'center'},

modalFooterContainer:{
backgroundColor:'transparent',
justifyContent:'center',
alignItems:'center',
marginTop:10},

inputField:{
borderColor:'rgba(74,74,74,0.5)',
backgroundColor:'white',
borderWidth:1,
height:40,
width:width-80},

verifyNumberInputField:{
borderColor:'rgba(74,74,74,0.5)',
backgroundColor:'white',
borderWidth:1,
height:40,
width:width*0.55},

whiteBackgroundButtonContainer:{
backgroundColor:'white',
padding:10,
width:(width-100)/2,
marginTop:10},

contactInfoCancelButtonContainer:{
backgroundColor:'white',
padding:10,
width:(width-100)/2,
marginTop:10},

contactInfoSaveButtonContainer:{
backgroundColor:'#0022A1',
padding:10,
width:(width-100)/2,
marginLeft:10,
marginTop:10},

contactInfoCancelButtonName:{
color:'black',
fontWeight:'bold',
textAlign:'center'},

contactInfoSaveButtonName:{
color:'white',
fontWeight:'bold',
textAlign:'center'},

errorText:{
color:'red',
textAlign:'center',
fontWeight:'bold',
marginTop:2},

contactInfoModalButtonsRow:{
flexDirection:'row'}});



var userQuery=(0,_reactApollo.gql)(_templateObject);




































































var confirmUserPhoneNumber=(0,_reactApollo.gql)(_templateObject2);









var createUserAvailability=(0,_reactApollo.gql)(_templateObject3);










var updateUserAvailabilityById=(0,_reactApollo.gql)(_templateObject4);










var MyProfile=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(userQuery,{
options:function options(ownProps){
return{
variables:{
id:ownProps.state.myProfile.id}};


}}),

(0,_reactApollo.graphql)(confirmUserPhoneNumber,{
name:'confirmUserPhoneNumber'}),

(0,_reactApollo.graphql)(createUserAvailability,{
name:'createUserAvailability'}),

(0,_reactApollo.graphql)(updateUserAvailabilityById,{
name:'updateUserAvailabilityById'}))(

MyProfileComponent);exports.default=

MyProfile;