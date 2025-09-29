var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.ConstantesContext=void 0;var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _react=_interopRequireWildcard(require("react"));
var _coordonatesContext=_interopRequireWildcard(require("./coordonatesContext"));
var _fetcher=_interopRequireDefault(require("../functions/fetcher"));var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\context\\constantesContext.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}
var ConstantesContext=exports.ConstantesContext=(0,_react.createContext)({
constantes:{
markerList:[],
showCreatMarkerModal:false,
spinner:true,
isConnected:false,
selectedMarker:{id:0,adresse:'',accesList:[]}
},
setConstantes:function setConstantes(){},
showFechedMarkers:function showFechedMarkers(){},
createMarker:function createMarker(){},
createAcces:function createAcces(){},
updateAcces:function updateAcces(){},
updateMarker:function updateMarker(){},
deleteMarker:function deleteMarker(){},
deleteAcces:function deleteAcces(){},
fetchMode:function fetchMode(){},
refreshConstantes:function refreshConstantes(){},
setSelectMarker:function setSelectMarker(){},
deselectMarker:function deselectMarker(){},
showCreateMarkerModale:function showCreateMarkerModale(){},
hideCreateMarkerModale:function hideCreateMarkerModale(){}
});

var ConstantesProvider=function ConstantesProvider(_ref){var children=_ref.children;
console.log('**************ConstantesProvider');

var _useState=(0,_react.useState)({
markerList:[],
showCreatMarkerModal:false,
spinner:true,
isConnected:false,
selectedMarker:{id:0,adresse:'',accesList:[]}
}),_useState2=(0,_slicedToArray2.default)(_useState,2),constantes=_useState2[0],setConstantes=_useState2[1];
var _useContext=(0,_react.useContext)(_coordonatesContext.CoordonatesContext),coords=_useContext.coords,refCoords=_useContext.refCoords;
(0,_react.useEffect)(function(){
console.log('ConstantesProvider:useEffect');
if(constantes.showCreatMarkerModal===false){
setConstantes(Object.assign({},
constantes,{
spinner:true,
isConnected:false})
);
try{
console.log(
'ConstantesProvider:useEffect: coords avant fetch: '+
JSON.stringify(refCoords)
);
(0,_fetcher.default)({
route:'findAllMarkers&Acces',
method:'POST',
data:Object.assign({},refCoords),
callback:function callback(e){
console.log(
' ConstantesProvider:useEffect: reponse du fetch : '+
JSON.stringify(e)
);
if(!e){
setConstantes(Object.assign({},
constantes,{
spinner:false,
isConnected:false})
);
}else{
setConstantes(Object.assign({},
constantes,{
spinner:false,
isConnected:true,
markerList:(0,_toConsumableArray2.default)(e),
showCreatMarkerModal:false})
);
}
}
});
}catch(error){
console.log(' error ocurre in trying to fetcher by getMarkerExt...');
}
}else{
refreshConstantes();
}
},[refCoords]);

var showFechedMarkers=function showFechedMarkers(data){
console.log('ConstantesProvider:useEffect:showFechedMarkers');
setConstantes(Object.assign({},
constantes,{
markerList:(0,_toConsumableArray2.default)(data),
positionAcces:true,
spinner:false,
showCreatMarkerModal:false,
isConnected:true})
);
};

var fetchMode=function fetchMode(){
console.log('ConstantesProvider:useEffect:fetchMode');
setConstantes(Object.assign({},
constantes,{
spinner:true,
isConnected:false})
);
};

var refreshConstantes=function refreshConstantes(){
console.log('ConstantesProvider:useEffect:refreshConstantes');
setConstantes(Object.assign({},constantes));
};

var deselectMarker=function deselectMarker(){
console.log('ConstantesProvider:useEffect:deselectMarker');
setConstantes(Object.assign({},
constantes,{
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
};

var setSelectMarker=function setSelectMarker(marker){
console.log('ConstantesProvider:useEffect:setSelectMarker');
setConstantes(Object.assign({},
constantes,{
selectedMarker:Object.assign({},marker)})
);
};

var showCreateMarkerModale=function showCreateMarkerModale(){
console.log('ConstantesProvider:useEffect:showCreateMarkerModale');
setConstantes(Object.assign({},
constantes,{
showCreatMarkerModal:true,
showMarkerAdresseEdit:false})
);
};

var hideCreateMarkerModale=function hideCreateMarkerModale(){
console.log('ConstantesProvider:useEffect:hideCreateMarkerModale');
setConstantes(Object.assign({},
constantes,{
showCreatMarkerModal:false,
showMarkerAdresseEdit:true})
);
};

var updateMarker=function updateMarker(item){
if('id'in item){
console.log('updating Marker: '+JSON.stringify(item));
setConstantes(Object.assign({},
constantes,{
spinner:true,
isConnected:false,
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
(0,_fetcher.default)({
route:'updateMarker',
method:'put',
data:{
isLast:true,
marker:Object.assign({},
item,{
latitude:coords.latitude,
longitude:coords.longitude})

},
callback:function callback(e){
console.log(
' ConstantesProvider:useEffect: reponse du fetch : '+
JSON.stringify(e)
);
if(!e){
setConstantes(Object.assign({},constantes,{spinner:false}));
}else{
setConstantes(Object.assign({},
constantes,{
spinner:false,
isConnected:true,
markerList:(0,_toConsumableArray2.default)(e.refresh),
showCreatMarkerModal:false,
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
}
}
});
}
};

var createAcces=function createAcces(item){
if(item.length>0){
console.log('creating acces: '+JSON.stringify(item));
(0,_fetcher.default)({
route:'createAcces',
method:'POST',
data:{
isLast:true,
accesList:item
},
callback:function callback(e){
console.log(
' ConstantesProvider:useEffect: reponse du fetch : '+
JSON.stringify(e)
);
if(!e){
setConstantes(Object.assign({},constantes,{spinner:false}));
}else{
setConstantes(Object.assign({},
constantes,{
spinner:false,
isConnected:true,
markerList:(0,_toConsumableArray2.default)(e.refresh),
showCreatMarkerModal:false,
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
}
}
});
}
};

var updateAcces=function updateAcces(item){
if(item.length>0){
console.log('updating acces: '+JSON.stringify(item));
(0,_fetcher.default)({
route:'updateAcces',
method:'PUT',
data:{
isLast:true,
accesList:item
},
callback:function callback(e){
console.log(
' ConstantesProvider:useEffect: reponse du fetch : '+
JSON.stringify(e)
);
if(!e){
setConstantes(Object.assign({},constantes,{spinner:false}));
}else{
setConstantes(Object.assign({},
constantes,{
spinner:false,
isConnected:true,
markerList:(0,_toConsumableArray2.default)(e.refresh),
showCreatMarkerModal:false,
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
}
}
});
}
};

var deleteAcces=function deleteAcces(item){
if(item.length>0){
console.log('deleting acces: '+JSON.stringify(item));
(0,_fetcher.default)({
route:'deleteAcces',
method:'DELETE',
data:{
isLast:true,
accesList:item
},
callback:function callback(e){
console.log(
' ConstantesProvider:useEffect: reponse du fetch : '+
JSON.stringify(e)
);
if(!e){
setConstantes(Object.assign({},constantes,{spinner:false}));
}else{
setConstantes(Object.assign({},
constantes,{
spinner:false,
isConnected:true,
markerList:(0,_toConsumableArray2.default)(e.refresh),
showCreatMarkerModal:false,
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
}
}
});
}
};

var createMarker=function createMarker(_ref2){var adresse=_ref2.adresse,code=_ref2.code,accesType=_ref2.accesType;
var showCreatMarkerModal=constantes.showCreatMarkerModal,coordonates=constantes.coordonates;
console.log('createMarker code: '+code);
if(!code)return alert('vous devez entrer un code!');
(0,_fetcher.default)({
route:'createMarker',
method:'POST',
data:{
adresse:adresse,
latitude:coords.latitude,
longitude:coords.longitude,
author:'Jaffleman',
acces:[{type:accesType,code:code}]
},
callback:function callback(e){
if(!e){
setConstantes(Object.assign({},constantes,{spinner:false}));
}else{
setConstantes(Object.assign({},
constantes,{
showCreatMarkerModal:false,
spinner:false,
isConnected:true,
markerList:(0,_toConsumableArray2.default)(e.refresh)})
);
}
}
});
};

var deleteMarker=function deleteMarker(){
var id=constantes.selectedMarker.id;
setConstantes(Object.assign({},
constantes,{
spinner:true,
isConnected:false,
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
(0,_fetcher.default)({
route:'deleteMarker',
method:'DELETE',
data:{
isLast:true,
marker:{
id:id,
longitude:coords.longitude,
latitude:coords.latitude
}
},
callback:function callback(e){
if(!e){
setConstantes(Object.assign({},constantes,{spinner:false}));
}else{
setConstantes(Object.assign({},
constantes,{
showCreatMarkerModal:false,
spinner:false,
isConnected:true,
markerList:(0,_toConsumableArray2.default)(e.refresh),
selectedMarker:{id:0,adresse:'',accesList:[]}})
);
}
console.log('refresh Markers List => forceSaveRefCoords');

}
});
};

return(
_react.default.createElement(ConstantesContext.Provider,{
value:{
constantes:constantes,
createMarker:createMarker,
updateMarker:updateMarker,
createAcces:createAcces,
updateAcces:updateAcces,
deleteMarker:deleteMarker,
deleteAcces:deleteAcces,
setConstantes:setConstantes,
showFechedMarkers:showFechedMarkers,
fetchMode:fetchMode,
refreshConstantes:refreshConstantes,
setSelectMarker:setSelectMarker,
deselectMarker:deselectMarker,
showCreateMarkerModale:showCreateMarkerModale,
hideCreateMarkerModale:hideCreateMarkerModale
},__self:_this,__source:{fileName:_jsxFileName,lineNumber:353,columnNumber:5}},
children
));

};var _default=exports.default=

ConstantesProvider;