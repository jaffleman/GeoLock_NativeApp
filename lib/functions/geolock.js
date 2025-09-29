var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _react=require("react");
var _reactNativeGeolocationService=_interopRequireDefault(require("react-native-geolocation-service"));
var _constantesContext=require("../context/constantesContext");
var _coordonatesContext=require("../context/coordonatesContext");
var _fetcher=_interopRequireDefault(require("./fetcher"));function

getMarkerExt(_x,_x2){return _getMarkerExt.apply(this,arguments);}function _getMarkerExt(){_getMarkerExt=(0,_asyncToGenerator2.default)(function*(coords,callback){
console.log(' getMarkerExt');
(0,_fetcher.default)({
route:'findAllMarkers&Acces',
method:'POST',
data:Object.assign({},coords),
callback2:function callback2(e){
console.log(' reponse du fetch : '+JSON.stringify(e));
if(e.isConnected){
callback(e.jData);
}
}
});
});return _getMarkerExt.apply(this,arguments);}var _default=exports.default=

geolock={
getPosition:function getPosition(setDataToFetch){var logMarging=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';},

getMarkers:function getMarkers(coords,callback){
getMarkerExt(coords,callback);
},

sendToBase:function sendToBase(
adresse,
code,
accesType,
constantes,
setConstantes,
setDataToFetch)
{
console.log('geolock.sendToBase()');
var showModal=constantes.showModal,coordonates=constantes.coordonates;
if(!code)return alert('vous devez entrer un code!');
setDataToFetch({
route:'create',
method:'POST',
data:{
adresse:adresse,
latitude:constantes.coordonates.latitude,
longitude:constantes.coordonates.longitude,
acces:[{type:accesType,code:code}]
},
callback:function callback(e){

if(e.isConnected){
getMarkerExt();
setTimeout(function(){
setConstantes(Object.assign({},
constantes,{
showModal:false,
spinner:false,
isConnected:e.isConnected})
);
},100);
}
}
});
},

objectComparator:function objectComparator(source,alter){
var newMarker={};
var newAcces=[];
var updatedAcces=[];
var deletedAcces=[];

if(typeof source==='object'&&typeof alter==='object'){
if(source.adresse.trim()!=alter.adresse.trim()){
newMarker.id=source.id;
newMarker.adresse=alter.adresse;
}

alter.accesList.map(function(acces2){
if('identifier'in acces2){
switch(acces2.identifier){
case 0:
deletedAcces.push(Object.assign({},acces2));
break;
case 1:
newAcces.push(Object.assign({},acces2));
break;
case 2:
updatedAcces.push(Object.assign({},acces2));
break;

default:
break;
}
}
});
return{newMarker:newMarker,newAcces:newAcces,updatedAcces:updatedAcces,deletedAcces:deletedAcces};
}
}
};