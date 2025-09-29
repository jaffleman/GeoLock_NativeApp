Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _reactNativeMaps=require("react-native-maps");
var _react=_interopRequireWildcard(require("react"));
var _constantesContext=require("../context/constantesContext");var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\NormalMarker.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}var _default=exports.default=
NormalMarker=function NormalMarker(_ref){var marker=_ref.marker,color=_ref.color;
var _useContext=(0,_react.useContext)(_constantesContext.ConstantesContext),setSelectMarker=_useContext.setSelectMarker;
if(color==='#1100ee'){
console.log('normal Marker: '+marker.id);
}else{
console.log('selected Marker: '+marker.id);
}
return(
_react.default.createElement(_reactNativeMaps.Marker,{
draggable:false,
key:marker.id,
pinColor:color,
coordinate:{
longitude:marker.longitude,
latitude:marker.latitude
},
onPress:function onPress(){
setSelectMarker(Object.assign({},marker));
},__self:_this,__source:{fileName:_jsxFileName,lineNumber:12,columnNumber:5}}));

};