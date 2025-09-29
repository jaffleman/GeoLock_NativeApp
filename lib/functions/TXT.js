var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.getMarkerExt=getMarkerExt;exports.getPosition=getPosition;exports.objectComparator=objectComparator;exports.sendToBase=sendToBase;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _reactNativeGeolocationService=_interopRequireDefault(require("react-native-geolocation-service"));
var _constantesContext=require("../context/constantesContext");
var _fetcher=_interopRequireDefault(require("./fetcher"));function

getMarkerExt(_x,_x2){return _getMarkerExt.apply(this,arguments);}function _getMarkerExt(){_getMarkerExt=(0,_asyncToGenerator2.default)(function*(coords,callback){
console.log('getMarkerExt');
try{
yield(0,_fetcher.default)({
route:'findAllMarkers&Acces',
method:'POST',
data:Object.assign({},coords),
callback2:function callback2(e){
console.log('reponse du fetch : '+JSON.stringify(e));
if(e.isConnected){
callback(e.jData);
}
}
});
}catch(error){
console.error('Erreur getMarkerExt:',error);
}
});return _getMarkerExt.apply(this,arguments);}function

getPosition(){return _getPosition.apply(this,arguments);}function _getPosition(){_getPosition=(0,_asyncToGenerator2.default)(function*(){
return new Promise(function(resolve,reject){
_reactNativeGeolocationService.default.getCurrentPosition(
function(position){
resolve(position.coords);
},
function(error){
reject(error);
},
{enableHighAccuracy:true,timeout:15000,maximumAge:10000}
);
});
});return _getPosition.apply(this,arguments);}function

sendToBase(_x3,_x4,_x5,_x6,_x7,_x8){return _sendToBase.apply(this,arguments);}function _sendToBase(){_sendToBase=(0,_asyncToGenerator2.default)(function*(adresse,code,accesType,constantes,setConstantes,setDataToFetch){
console.log('geolock.sendToBase()');
var coordonates=constantes.coordonates;
if(!code){
alert('vous devez entrer un code!');
return;
}
try{
yield setDataToFetch({
route:'create',
method:'POST',
data:{
adresse:adresse,
latitude:coordonates.latitude,
longitude:coordonates.longitude,
acces:[{type:accesType,code:code}]
},
callback:function callback(e){
if(e.isConnected){
getMarkerExt(coordonates,function(markers){
setConstantes(Object.assign({},
constantes,{
showModal:false,
spinner:false,
isConnected:e.isConnected,
markers:markers})
);
});
}
}
});
}catch(error){
console.error('Erreur sendToBase:',error);
setConstantes(Object.assign({},constantes,{spinner:false}));
}
});return _sendToBase.apply(this,arguments);}

function objectComparator(source,alter){
var newMarker={};
var newAcces=[];
var updatedAcces=[];
var deletedAcces=[];

if(typeof source==='object'&&typeof alter==='object'){
if(source.adresse.trim()!==alter.adresse.trim()){
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