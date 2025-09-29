Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireWildcard(require("react"));
var _reactNativeMaps=require("react-native-maps");
var _coordonatesContext=require("../context/coordonatesContext");var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\EditMarker.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}var _default=exports.default=

EditMarker=function EditMarker(_ref){var coords=_ref.coords;
console.log('EditMarker creation');
var _React$useContext=_react.default.useContext(_coordonatesContext.CoordonatesContext),saveMarkerCoords=_React$useContext.saveMarkerCoords;
return(
_react.default.createElement(_reactNativeMaps.Marker,{
key:0,
onDragEnd:function onDragEnd(e){return saveMarkerCoords(e.nativeEvent.coordinate);},
draggable:true,
coordinate:coords,
pinColor:'red',__self:_this,__source:{fileName:_jsxFileName,lineNumber:9,columnNumber:5}}
));

};