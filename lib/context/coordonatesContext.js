var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.CoordonatesContext=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _react=_interopRequireWildcard(require("react"));
var _reactNativeGeolocationService=_interopRequireDefault(require("react-native-geolocation-service"));
var _requestLocationPermission=_interopRequireDefault(require("../requestLocationPermission"));var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\context\\coordonatesContext.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}

var CoordonatesContext=exports.CoordonatesContext=(0,_react.createContext)({
coords:{

longitude:0,
latitude:0,
longitudeDelta:0,
latitudeDelta:0
},
refCoords:{

longitude:0,
latitude:0,
longitudeDelta:0,
latitudeDelta:0
},
saveCoords:function saveCoords(){},
saveMarkerCoords:function saveMarkerCoords(coords){},
forceSaveRefCoords:function forceSaveRefCoords(coords){}
});

var CoordsProvider=function CoordsProvider(props){
console.log('*********coordsProvider');
var _props$value=props.value,initDimensions=_props$value.initDimensions,initialCoords=_props$value.initialCoords;
var height=initDimensions.height,width=initDimensions.width;
var longitude=initialCoords.longitude,latitude=initialCoords.latitude;
var ASPECT_RATIO=width/height;
var LATITUDE_DELTA=0.002;
var LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;

var _useState=(0,_react.useState)({

longitude:longitude,
latitude:latitude,
longitudeDelta:LONGITUDE_DELTA,
latitudeDelta:LATITUDE_DELTA
}),_useState2=(0,_slicedToArray2.default)(_useState,2),coords=_useState2[0],setCoords=_useState2[1];

var _useState3=(0,_react.useState)({
longitude:longitude,
latitude:latitude,
longitudeDelta:LONGITUDE_DELTA,
latitudeDelta:LATITUDE_DELTA
}),_useState4=(0,_slicedToArray2.default)(_useState3,2),refCoords=_useState4[0],setRefCoords=_useState4[1];

var forceSaveRefCoords=function forceSaveRefCoords(){var newCoords=arguments.length>0&&arguments[0]!==undefined?arguments[0]:Object.assign({},coords);
console.log('coordsContext: forceSaveRefCoords');
setRefCoords(Object.assign({},newCoords));
};

var saveMarkerCoords=function saveMarkerCoords(NewCoords){
console.log('sauvegarde des coordonées du EditMarker');
setCoords(Object.assign({},coords,NewCoords));
};

var saveCoords=function saveCoords(newCoords){
var longitudeDif=Math.abs(refCoords.longitude-newCoords.longitude);
var latitudeDif=Math.abs(refCoords.latitude-newCoords.latitude);
if(longitudeDif>0.001||latitudeDif>0.001){
console.log('fetch call for new coords');
setRefCoords(Object.assign({},newCoords));
}
console.log('CoordsProvider: saving coords: '+JSON.stringify(newCoords));

setCoords(Object.assign({},newCoords));
};
return(
_react.default.createElement(CoordonatesContext.Provider,{
value:{
coords:coords,
refCoords:refCoords,
saveCoords:saveCoords,
forceSaveRefCoords:forceSaveRefCoords,
saveMarkerCoords:saveMarkerCoords
},__self:_this,__source:{fileName:_jsxFileName,lineNumber:71,columnNumber:5}},
props.children
));

};var _default=exports.default=

CoordsProvider;