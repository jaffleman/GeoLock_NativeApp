var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireWildcard(require("react"));
var _reactNative=require("react-native");
var _constantesContext=require("../context/constantesContext");
var _AddMarkerModal=_interopRequireDefault(require("./AddMarkerModal"));
var _InfoMarkerModal=_interopRequireDefault(require("./InfoMarkerModal"));
var _CustomMapView=_interopRequireDefault(require("./CustomMapView"));var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\CustomView.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}var _default=exports.default=

CustomView=function CustomView(){
var _useContext=(0,_react.useContext)(_constantesContext.ConstantesContext),constantes=_useContext.constantes;
console.log('**************CustomView');

var showInfoMarker=constantes.selectedMarker.id==0?false:true;
console.log('CustomView:marker is selected ? : '+showInfoMarker);

return(
_react.default.createElement(_reactNative.TouchableWithoutFeedback,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:16,columnNumber:5}},
_react.default.createElement(_reactNative.View,{style:{flex:1,flexDirection:'column'},__self:_this,__source:{fileName:_jsxFileName,lineNumber:17,columnNumber:7}},
showInfoMarker&&
_react.default.createElement(_reactNative.View,{
style:{
position:'relative',
display:'flex',
top:0,
left:0,
right:0,
zIndex:100
},__self:_this,__source:{fileName:_jsxFileName,lineNumber:19,columnNumber:11}},
_react.default.createElement(_InfoMarkerModal.default,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:28,columnNumber:13}})
),

_react.default.createElement(_CustomMapView.default,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:31,columnNumber:9}}),
constantes.showCreatMarkerModal&&
_react.default.createElement(_reactNative.View,{
style:{
position:'relative',
display:'flex',
bottom:0,
left:0,
right:0,
zIndex:100
},__self:_this,__source:{fileName:_jsxFileName,lineNumber:33,columnNumber:11}},
_react.default.createElement(_AddMarkerModal.default,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:42,columnNumber:13}})
)

)
));

};