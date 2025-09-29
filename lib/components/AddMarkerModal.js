var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=AddMarkerModal;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _reactNative=require("react-native");
var React=_interopRequireWildcard(require("react"));
var _reactNativePaper=require("react-native-paper");
var _constantesContext=require("../context/constantesContext");
var _geolock=_interopRequireDefault(require("../functions/geolock"));
var _coordonatesContext=require("../context/coordonatesContext");var _this=this,_jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\AddMarkerModal.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}

var LeftContent=function LeftContent(props){return React.createElement(_reactNativePaper.Avatar.Icon,(0,_extends2.default)({},props,{icon:"map-marker",__self:_this,__source:{fileName:_jsxFileName,lineNumber:8,columnNumber:30}}));};
function AddMarkerModal(){
console.log('**************AddMarkerModal');
var _React$useContext=React.useContext(_constantesContext.ConstantesContext),constantes=_React$useContext.constantes,createMarker=_React$useContext.createMarker;
var _React$useContext2=React.useContext(_coordonatesContext.CoordonatesContext),forceSaveRefCoords=_React$useContext2.forceSaveRefCoords;
var _React$useState=React.useState(''),_React$useState2=(0,_slicedToArray2.default)(_React$useState,2),adresse=_React$useState2[0],setAdresse=_React$useState2[1];
var _React$useState3=React.useState(''),_React$useState4=(0,_slicedToArray2.default)(_React$useState3,2),accesType=_React$useState4[0],setAccesType=_React$useState4[1];
var _React$useState5=React.useState(''),_React$useState6=(0,_slicedToArray2.default)(_React$useState5,2),code=_React$useState6[0],setCode=_React$useState6[1];
var adresseRef=React.useRef(null);
var accesTypeRef=React.useRef(null);
var codeRef=React.useRef(null);

React.useEffect(function(){
console.log('AddMarkerModal is Monted');
return function(){
forceSaveRefCoords;
console.log('AddMarkerModal is Demonted');
};
},[]);

React.useEffect(function(){
if(constantes.showCreatMarkerModal)adresseRef.current.focus();else
{
setAdresse('');
setAccesType('');
setCode('');
}
},[constantes.showCreatMarkerModal]);

return(
React.createElement(_reactNativePaper.Card,{__self:this,__source:{fileName:_jsxFileName,lineNumber:38,columnNumber:5}},
React.createElement(_reactNativePaper.Card.Title,{
title:"Ajouter un marker",
subtitle:"Positionner le marker et renseigner les infos:",
left:LeftContent,__self:this,__source:{fileName:_jsxFileName,lineNumber:39,columnNumber:7}}
),
React.createElement(_reactNativePaper.Card.Content,{__self:this,__source:{fileName:_jsxFileName,lineNumber:44,columnNumber:7}},
React.createElement(_reactNativePaper.TextInput,{
returnKeyType:"next",
onSubmitEditing:function onSubmitEditing(){return accesTypeRef.current.focus();},
blurOnSubmit:false,
ref:adresseRef,
style:{height:35},
value:adresse,
label:"Adresse",
mode:"outlined",
placeholder:"copier/coller l'adresse ici...",
onChangeText:function onChangeText(text){return setAdresse(text);},__self:this,__source:{fileName:_jsxFileName,lineNumber:45,columnNumber:9}}
),
React.createElement(_reactNative.View,{style:{flexDirection:'row',justifyContent:'space-evenly'},__self:this,__source:{fileName:_jsxFileName,lineNumber:57,columnNumber:9}},
React.createElement(_reactNativePaper.TextInput,{
returnKeyType:"next",
onSubmitEditing:function onSubmitEditing(){return codeRef.current.focus();},
blurOnSubmit:false,
ref:accesTypeRef,
style:{flex:3,height:35},
value:accesType,
label:"Type",
mode:"outlined",
placeholder:"saisisser le type d'acces",
onChangeText:function onChangeText(type){return setAccesType(type);},__self:this,__source:{fileName:_jsxFileName,lineNumber:58,columnNumber:11}}
),
React.createElement(_reactNativePaper.TextInput,{
returnKeyType:"send",
onSubmitEditing:function onSubmitEditing(){return createMarker({accesType:accesType,code:code,adresse:adresse});},
ref:codeRef,
autoCapitalize:"characters",
value:code,
style:{flex:1,height:35},
label:"Code",
mode:"outlined",
placeholder:"#",
onChangeText:function onChangeText(codeText){return setCode(codeText);},__self:this,__source:{fileName:_jsxFileName,lineNumber:70,columnNumber:11}}
)
)
)
));

}


var styles2=_reactNative.StyleSheet.create({
map2:{

borderColor:'#6200ee',
borderWidth:1,
borderRadius:10,
backgroundColor:'#a9a9'
}
});