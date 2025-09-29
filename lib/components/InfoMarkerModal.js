var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=InfoMarkerModal;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _reactNative=require("react-native");
var React=_interopRequireWildcard(require("react"));
var _reactNativePaper=require("react-native-paper");
var _constantesContext=require("../context/constantesContext");
var _geolock=_interopRequireDefault(require("../functions/geolock"));
var _coordonatesContext=require("../context/coordonatesContext");
var _AccesCode=_interopRequireDefault(require("./AccesCode"));var _jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\InfoMarkerModal.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}

function InfoMarkerModal(){var _this=this;
console.log('**************InfoMarkerModal');
var _React$useContext=







React.useContext(_constantesContext.ConstantesContext),constantes=_React$useContext.constantes,deselectMarker=_React$useContext.deselectMarker,updateAcces=_React$useContext.updateAcces,updateMarker=_React$useContext.updateMarker,createAcces=_React$useContext.createAcces,deleteAcces=_React$useContext.deleteAcces,deleteMarker=_React$useContext.deleteMarker;
var _React$useContext2=React.useContext(_coordonatesContext.CoordonatesContext),forceSaveRefCoords=_React$useContext2.forceSaveRefCoords;
var adresseRef=React.useRef(null);
var _React$useState=React.useState(false),_React$useState2=(0,_slicedToArray2.default)(_React$useState,2),isEditable=_React$useState2[0],setIsEditable=_React$useState2[1];
var _React$useState3=React.useState(Object.assign({},
constantes.selectedMarker,{
accesList:(0,_toConsumableArray2.default)(constantes.selectedMarker.accesList)})
),_React$useState4=(0,_slicedToArray2.default)(_React$useState3,2),localMarker=_React$useState4[0],setLocalMarker=_React$useState4[1];

var LeftContent=function LeftContent(props){return React.createElement(_reactNativePaper.Avatar.Icon,(0,_extends2.default)({},props,{icon:"map-marker",__self:_this,__source:{fileName:_jsxFileName,lineNumber:28,columnNumber:32}}));};
var RightContent=function RightContent(props){return(
React.createElement(_reactNative.TouchableWithoutFeedback,{onPress:function onPress(){return setIsEditable(true);},__self:_this,__source:{fileName:_jsxFileName,lineNumber:30,columnNumber:5}},
React.createElement(_reactNativePaper.Avatar.Icon,(0,_extends2.default)({
style:{marginRight:10}},
props,{
icon:"circle-edit-outline",__self:_this,__source:{fileName:_jsxFileName,lineNumber:31,columnNumber:7}})
)
));};

var changeData=function changeData(index,data){
var accesList2=localMarker.accesList.map(function(acces,i){
return index!=i?Object.assign({},acces):Object.assign({},data);
});
setLocalMarker(Object.assign({},localMarker,{accesList:(0,_toConsumableArray2.default)(accesList2)}));
};

var handleDeleteButton=function handleDeleteButton(){
_reactNative.Alert.alert(
'Attention',
'Vous etes sur le point de supprimer définitivement ce marker. Êtes vous sur de vouloir continuer',
[
{
text:'Non',
onPress:function onPress(){return console.log('Cancel Pressed');},
style:'cancel'
},
{
text:'Oui',
onPress:function onPress(){
setLocalMarker({id:0,adresse:'',accesList:[]});
deleteMarker();
}
}]

);
};

var handleUpdateButton=function handleUpdateButton(){
var _geolock$objectCompar=
_geolock.default.objectComparator(constantes.selectedMarker,localMarker),newMarker=_geolock$objectCompar.newMarker,newAcces=_geolock$objectCompar.newAcces,updatedAcces=_geolock$objectCompar.updatedAcces,deletedAcces=_geolock$objectCompar.deletedAcces;
var commandeTable=[];
commandeTable.push(function(){return(
console.log('//////////////////////////commandeTable[0]=>executé...'));}
);
if(newMarker.id>0)commandeTable.push(function(){return updateMarker(newMarker);});
if(newAcces.length)commandeTable.push(function(){return createAcces(newAcces);});
if(updatedAcces.length)
commandeTable.push(function(){return updateAcces(updatedAcces);});
if(deletedAcces.length)
commandeTable.push(function(){return deleteAcces(deletedAcces);});
_reactNative.Alert.alert(
'Attention',
'Vous etes sur le point de modifier définitivement ce marker. Êtes vous sur de vouloir continuer',
[
{
text:'Non',
onPress:function onPress(){return console.log('Cancel Pressed');},
style:'cancel'
},
{
text:'Oui',
onPress:function onPress(){
commandeTable.map(function(commande){
console.log(
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
);
commande();
});
deselectMarker();
forceSaveRefCoords();
}
}]

);
};

var add=function add(){return(
setLocalMarker(Object.assign({},
localMarker,{
accesList:[].concat((0,_toConsumableArray2.default)(
localMarker.accesList),[
{id:0,type:'',code:'',mk:localMarker.id}])})

));};

return(
React.createElement(_reactNativePaper.Card,{__self:this,__source:{fileName:_jsxFileName,lineNumber:115,columnNumber:5}},
React.createElement(_reactNativePaper.Card.Title,{
title:"Information du Marker",
subtitle:'Editon des données du marker selectionné.',
left:LeftContent,
right:!isEditable&&RightContent,__self:this,__source:{fileName:_jsxFileName,lineNumber:116,columnNumber:7}}
),
React.createElement(_reactNativePaper.Card.Content,{__self:this,__source:{fileName:_jsxFileName,lineNumber:122,columnNumber:7}},
React.createElement(_reactNativePaper.TextInput,{
editable:isEditable,
returnKeyType:"next",
onSubmitEditing:function onSubmitEditing(){return accesTypeRef.current.focus();},
blurOnSubmit:false,
ref:adresseRef,
style:{height:35,textAlign:'auto'},
label:"Adresse",
mode:"outlined",
placeholder:"copier/coller l'adresse ici...",
onChangeText:function onChangeText(e){
setLocalMarker(Object.assign({},localMarker,{adresse:e}));
},
value:
isEditable?localMarker.adresse:constantes.selectedMarker.adresse,__self:this,__source:{fileName:_jsxFileName,lineNumber:123,columnNumber:9}}

),

React.createElement(_reactNativePaper.Divider,{__self:this,__source:{fileName:_jsxFileName,lineNumber:141,columnNumber:9}}),

(0,_toConsumableArray2.default)(
isEditable?
localMarker.accesList:
constantes.selectedMarker.accesList).
map(function(acces,i){
console.log(
'InfoMarkerModal: acces de accesList: '+JSON.stringify(acces)
);
return(
React.createElement(_AccesCode.default,{
key:i,
isEditable:isEditable,
i:i,
localMarker:localMarker,
acces:acces,
changeData:changeData,__self:_this,__source:{fileName:_jsxFileName,lineNumber:152,columnNumber:13}}
));

}),
React.createElement(_reactNativePaper.Divider,{__self:this,__source:{fileName:_jsxFileName,lineNumber:162,columnNumber:9}}),
isEditable&&
React.createElement(_reactNative.View,{style:{display:'flex',flexDirection:'row',marginTop:10},__self:this,__source:{fileName:_jsxFileName,lineNumber:164,columnNumber:11}},
React.createElement(_reactNativePaper.Button,{
style:{flex:1},
mode:"outlined",
color:"green",
onPress:add,__self:this,__source:{fileName:_jsxFileName,lineNumber:165,columnNumber:13}},"Ajout acces"

),
React.createElement(_reactNativePaper.Button,{
style:{flex:1},
mode:"outlined",
color:"red",
onPress:handleDeleteButton,__self:this,__source:{fileName:_jsxFileName,lineNumber:172,columnNumber:13}},"supprimer"

),
React.createElement(_reactNativePaper.Button,{
style:{flex:1},
mode:"outlined",
color:"blue",
onPress:handleUpdateButton,__self:this,__source:{fileName:_jsxFileName,lineNumber:179,columnNumber:13}},"Valider"

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