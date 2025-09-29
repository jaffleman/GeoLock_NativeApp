var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _react=_interopRequireWildcard(require("react"));
var _reactNative=require("react-native");
var _reactNativePaper=require("react-native-paper");

var _Markers=_interopRequireDefault(require("./Markers"));
var _coordonatesContext=require("../context/coordonatesContext");
var _reactNativeMaps=_interopRequireWildcard(require("react-native-maps"));
var _constantesContext=require("../context/constantesContext");var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\CustomMapView.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}

var _Dimensions$get=_reactNative.Dimensions.get('window'),width=_Dimensions$get.width;var _default=exports.default=

CustomMapView=function CustomMapView(){
var _useContext=





(0,_react.useContext)(_constantesContext.ConstantesContext),constantes=_useContext.constantes,isConnected=_useContext.isConnected,deselectMarker=_useContext.deselectMarker,showCreateMarkerModale=_useContext.showCreateMarkerModale,hideCreateMarkerModale=_useContext.hideCreateMarkerModale;
var _useContext2=
(0,_react.useContext)(_coordonatesContext.CoordonatesContext),coords=_useContext2.coords,saveCoords=_useContext2.saveCoords,forceSaveRefCoords=_useContext2.forceSaveRefCoords;
console.log('**************CustomMapView');
var _useState=(0,_react.useState)(Object.assign({},coords)),_useState2=(0,_slicedToArray2.default)(_useState,2),customCoords=_useState2[0],setCustomCoords=_useState2[1];
console.log('CustomMapView:user coords on map: '+JSON.stringify(coords));
var handleRegionChange=function handleRegionChange(info){
setCustomCoords(Object.assign({},info));
saveCoords(info);
};

return(
_react.default.createElement(_reactNative.View,{style:{flex:1000},__self:_this,__source:{fileName:_jsxFileName,lineNumber:31,columnNumber:5}},
_react.default.createElement(_reactNativeMaps.default,{
onPress:function onPress(){return deselectMarker();},
customMapStyle:mapStyle,
showsCompass:false,

onRegionChangeComplete:function onRegionChangeComplete(info,deteils){return(
deteils.isGesture?handleRegionChange(info):null);},

showsUserLocation:true,
provider:_reactNativeMaps.PROVIDER_GOOGLE,
style:{flex:1},
loadingEnabled:true,

region:coords,__self:_this,__source:{fileName:_jsxFileName,lineNumber:32,columnNumber:7}},
_react.default.createElement(_Markers.default,{coords:customCoords,__self:_this,__source:{fileName:_jsxFileName,lineNumber:46,columnNumber:9}})
),
_react.default.createElement(_reactNativePaper.FAB,{
icon:constantes.showCreatMarkerModal?'minus':'plus',
style:styles.fab,
onPress:function onPress(){
constantes.showCreatMarkerModal?
hideCreateMarkerModale():
showCreateMarkerModale();
},__self:_this,__source:{fileName:_jsxFileName,lineNumber:48,columnNumber:7}}
),
_react.default.createElement(_reactNativePaper.FAB,{
loading:constantes.spinner,
small:true,
icon:"access-point-network-off",
style:styles.networkIcon,
onPress:function onPress(){
forceSaveRefCoords();
},
visible:!constantes.isConnected,__self:_this,__source:{fileName:_jsxFileName,lineNumber:57,columnNumber:7}}
)
));

};

var styles=_reactNative.StyleSheet.create({
container:{
alignItems:'center',
position:'relative',
left:0,
right:0,
top:0,
bottom:0,
width:width,
flex:0
},

map:Object.assign({},_reactNative.StyleSheet.absoluteFillObject),
centeredView:{
backgroundColor:'rgba(0,0,0,0.75)',
flex:1,
justifyContent:'center',
alignItems:'center'
},

map2:{
marginLeft:'auto',
marginRight:'auto',
width:370,
height:250
},

fab:{
position:'absolute',
margin:16,
right:0,
bottom:0,
backgroundColor:'#1100ee'
},
networkIcon:{
position:'absolute',
margin:16,
right:300,
bottom:680
}
});

var mapStyle=[
{
elementType:'geometry',
stylers:[
{
color:'#242f3e'
}]

},
{
elementType:'labels.text.fill',
stylers:[
{
color:'#746855'
}]

},
{
elementType:'labels.text.stroke',
stylers:[
{
color:'#242f3e'
}]

},
{
featureType:'administrative.locality',
elementType:'labels.text.fill',
stylers:[
{
color:'#d59563'
}]

},
{
featureType:'poi',
elementType:'labels.text.fill',
stylers:[
{
color:'#d59563'
}]

},
{
featureType:'poi.park',
elementType:'geometry',
stylers:[
{
color:'#263c3f'
}]

},
{
featureType:'poi.park',
elementType:'labels.text.fill',
stylers:[
{
color:'#6b9a76'
}]

},
{
featureType:'road',
elementType:'geometry',
stylers:[
{
color:'#38414e'
}]

},
{
featureType:'road',
elementType:'geometry.stroke',
stylers:[
{
color:'#212a37'
}]

},
{
featureType:'road',
elementType:'labels.text.fill',
stylers:[
{
color:'#9ca5b3'
}]

},
{
featureType:'road.highway',
elementType:'geometry',
stylers:[
{
color:'#746855'
}]

},
{
featureType:'road.highway',
elementType:'geometry.stroke',
stylers:[
{
color:'#1f2835'
}]

},
{
featureType:'road.highway',
elementType:'labels.text.fill',
stylers:[
{
color:'#f3d19c'
}]

},
{
featureType:'transit',
elementType:'geometry',
stylers:[
{
color:'#2f3948'
}]

},
{
featureType:'transit.station',
elementType:'labels.text.fill',
stylers:[
{
color:'#d59563'
}]

},
{
featureType:'water',
elementType:'geometry',
stylers:[
{
color:'#17263c'
}]

},
{
featureType:'water',
elementType:'labels.text.fill',
stylers:[
{
color:'#515c6d'
}]

},
{
featureType:'water',
elementType:'labels.text.stroke',
stylers:[
{
color:'#17263c'
}]

}];