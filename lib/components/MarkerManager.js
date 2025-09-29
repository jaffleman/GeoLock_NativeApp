Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireWildcard(require("react"));
var _reactNativeMaps=require("react-native-maps");var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\MarkerManager.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}var _default=exports.default=

MarkerManager=function MarkerManager(_ref){var constantes=_ref.constantes,setConstantes=_ref.setConstantes,getMarker=_ref.getMarker;
if(!constantes.showCreatMarkerModal){
return constantes.markerList.map(function(marker,index){
var markerColor=marker.isFocused?'#9900ee':'#1100ee';
return(
_react.default.createElement(_reactNativeMaps.Marker,{

zIndex:-index,
draggable:false,
key:marker.id,
coordinate:{
longitude:marker.longitude,
latitude:marker.latitude
},
onPress:function onPress(){

setConstantes(Object.assign({},
constantes,{
markerList:constantes.markerList.map(function(marker2){
return Object.assign({},
marker2,{
isFocused:marker2.id==marker.id?true:false});

})})
);
},
pinColor:markerColor,__self:_this,__source:{fileName:_jsxFileName,lineNumber:9,columnNumber:9}}));

});
}else if(constantes.showCreatMarkerModal){
return(
_react.default.createElement(_reactNativeMaps.Marker,{
onDragEnd:function onDragEnd(e){return(
getMarker(Object.assign({},
constantes.coordonates,{
longitude:e.nativeEvent.coordinate.longitude,
latitude:e.nativeEvent.coordinate.latitude})
));},

draggable:true,
coordinate:{
longitude:constantes.coordonates.longitude,
latitude:constantes.coordonates.latitude
},
pinColor:'red',__self:_this,__source:{fileName:_jsxFileName,lineNumber:35,columnNumber:7}}
));

}
};