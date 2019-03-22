var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');


var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

MapComponent=function(_Component){_inherits(MapComponent,_Component);
function MapComponent(props){_classCallCheck(this,MapComponent);var _this=_possibleConstructorReturn(this,(MapComponent.__proto__||Object.getPrototypeOf(MapComponent)).call(this,
props));
_index.Tracker.trackScreenView("MAP");return _this;

}_createClass(MapComponent,[{key:'onMapPress',value:function onMapPress(




e){
this.props.onMapPress?this.props.onMapPress(e):null;
}},{key:'render',value:function render()

{var _props=
this.props,height=_props.height,width=_props.width,style=_props.style;var _props2=
this.props,region=_props2.region,provider=_props2.provider,markerDescription=_props2.markerDescription,markerTitle=_props2.markerTitle;var _props3=
this.props,cacheEnabled=_props3.cacheEnabled,scrollEnabled=_props3.scrollEnabled,pitchEnabled=_props3.pitchEnabled,zoomEnabled=_props3.zoomEnabled;
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}}));


}}]);return MapComponent;}(_react.Component);MapComponent.propTypes={region:_react2.default.PropTypes.object.isRequired};


module.exports=MapComponent;