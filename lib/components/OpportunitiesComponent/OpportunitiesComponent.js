Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n query allOpportunities {\n    allOpportunities {\n        edges{\n          node{\n            workplaceId\n            positionId\n            opportunityWage\n            isPublic\n            id\n            workplaceByWorkplaceId {\n              address\n              workplaceImageUrl\n              brandByBrandId {\n                brandName\n                brandIconUrl\n              }\n            }\n            positionByPositionId{\n              positionName\n            }\n          }\n        }\n    }\n  }'],['\n query allOpportunities {\n    allOpportunities {\n        edges{\n          node{\n            workplaceId\n            positionId\n            opportunityWage\n            isPublic\n            id\n            workplaceByWorkplaceId {\n              address\n              workplaceImageUrl\n              brandByBrandId {\n                brandName\n                brandIconUrl\n              }\n            }\n            positionByPositionId{\n              positionName\n            }\n          }\n        }\n    }\n  }']);var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');











var _reactNativeRouterFlux=require('react-native-router-flux');






var _reactApollo=require('react-apollo');













var _OpportunitiesList=require('./OpportunitiesList');var _OpportunitiesList2=_interopRequireDefault(_OpportunitiesList);
var _OpportunityFilter=require('./OpportunityFilter');var _OpportunityFilter2=_interopRequireDefault(_OpportunityFilter);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;

var allOpportunitiesQuery=(0,_reactApollo.gql)(_templateObject);var
































Opportunities=function(_Component){_inherits(Opportunities,_Component);

function Opportunities(props){_classCallCheck(this,Opportunities);var _this=_possibleConstructorReturn(this,(Opportunities.__proto__||Object.getPrototypeOf(Opportunities)).call(this,
props));
_this.state={
listData:[],
showFilter:false,
isData:false,
isAssociatesList:false,
associatesName:''};

_index.Tracker.trackScreenView("Oppotunities");return _this;

}_createClass(Opportunities,[{key:'componentDidMount',value:function componentDidMount()

{
var listData=this.props.state.opportunities.data;

var isData=listData.length>0;
var associatesName="Restaurant Associate's";
this.setState({
listData:listData,
isData:isData,
associatesName:associatesName});

}},{key:'render',value:function render()

{var _this2=this;var _state=






this.state,listData=_state.listData,showFilter=_state.showFilter,isData=_state.isData,isAssociatesList=_state.isAssociatesList,associatesName=_state.associatesName;





return(
_react2.default.createElement(_reactNative.View,{style:{flex:627/667}},


_react2.default.createElement(_reactNative.View,{style:styles.contentContainer},
isData&&
_react2.default.createElement(_OpportunitiesList2.default,{listData:listData}),

!isData&&
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'#FAFAFA',flex:1,alignItems:'center'}},
_react2.default.createElement(_reactNative.Image,{style:{width:150,height:150,marginVertical:30},
source:require('../assets/noOpportunitiesIcon.png')}),
_react2.default.createElement(_reactNative.View,{style:{alignItems:'center',width:width*0.7}},
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold',fontSize:18,marginBottom:5,textAlign:'center'}},'No Opportunities Found'),
_react2.default.createElement(_reactNative.Text,{style:{fontSize:15,textAlign:'center'}},'We cannot find any opportunities in your area, please check back soon!'),
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.setState({isData:true});},style:styles.buttonContainer},
_react2.default.createElement(_reactNative.Text,{style:{color:'white'}},'START OVER')))))));







}}]);return Opportunities;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
contentContainer:{
paddingHorizontal:5,
flex:1},

buttonContainer:{
marginTop:30,
backgroundColor:'#0022A1',
paddingVertical:5,
paddingHorizontal:30}});



Opportunities.propTypes={
client:_react2.default.PropTypes.instanceOf(_reactApollo.ApolloClient).isRequired};


var OpportunitiesComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(allOpportunitiesQuery))(
(0,_reactApollo.withApollo)(Opportunities));exports.default=

OpportunitiesComponent;