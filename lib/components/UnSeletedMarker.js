var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _react=_interopRequireWildcard(require("react"));
var _reactNativeMaps=require("react-native-maps");var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\UnSeletedMarker.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}var _default=exports.default=

UnselectedMarker=function UnselectedMarker(_ref)




{var constantes=_ref.constantes,setConstantes=_ref.setConstantes,poped=_ref.poped,setPoped=_ref.setPoped;
console.log(
'markerList dans UnSelectedMarker: '+
JSON.stringify(constantes.markerList)
);

var myView=constantes.markerList.map(function(marker,index){
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
var backupList=(0,_toConsumableArray2.default)(constantes.markerList);
setPoped(backupList.splice(index,1)[0]);
console.log('poped: '+JSON.stringify(poped));
setConstantes(Object.assign({},
constantes,{
markerInfo:Object.assign({},poped),
markerList:(0,_toConsumableArray2.default)(backupList)})
);
},
pinColor:"#1100ee",__self:_this,__source:{fileName:_jsxFileName,lineNumber:17,columnNumber:7}}));

});
if(poped.id>0){
console.log('poped.id: '+poped.id);
myView.push(
_react.default.createElement(_reactNativeMaps.Marker,{

draggable:false,
key:poped.id,
coordinate:{
longitude:poped.longitude,
latitude:poped.latitude
},
onPress:function onPress(){},
pinColor:"#9900ee",__self:_this,__source:{fileName:_jsxFileName,lineNumber:41,columnNumber:7}})
);
}
return myView;
};