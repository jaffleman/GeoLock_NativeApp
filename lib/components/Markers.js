var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireWildcard(require("react"));
var _EditMarker=_interopRequireDefault(require("./EditMarker"));
var _NormalMarker=_interopRequireDefault(require("./NormalMarker"));
var _constantesContext=require("../context/constantesContext");var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\Markers.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}var _default=exports.default=

Markers=function Markers(_ref){var coords=_ref.coords;
console.log('**************Markers');
var _useContext=(0,_react.useContext)(_constantesContext.ConstantesContext),constantes=_useContext.constantes;
if(constantes.showCreatMarkerModal){
console.log('mode creation d1 marker');
return[_react.default.createElement(_EditMarker.default,{key:'editMarker',coords:coords,__self:_this,__source:{fileName:_jsxFileName,lineNumber:11,columnNumber:13}})];
}else{
console.log('mode affichage des markers');
console.log('nombre de marker: '+constantes.markerList.length);
return constantes.markerList.map(function(marker){
return(
_react.default.createElement(_NormalMarker.default,{
marker:marker,
key:
marker.id===constantes.selectedMarker.id?'#9900ee':marker.id,

color:
marker.id===constantes.selectedMarker.id?'#9900ee':'#1100ee',__self:_this,__source:{fileName:_jsxFileName,lineNumber:17,columnNumber:9}}

));

});
}
};