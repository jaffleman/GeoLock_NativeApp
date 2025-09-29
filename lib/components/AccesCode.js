var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=AccesCode;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _reactNative=require("react-native");






var React=_interopRequireWildcard(require("react"));
var _reactNativePaper=require("react-native-paper");var _jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\AccesCode.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}










function AccesCode(props){
var isEditable=props.isEditable,i=props.i,localMarker=props.localMarker,acces=props.acces,changeData=props.changeData;
var _React$useState=React.useState(false),_React$useState2=(0,_slicedToArray2.default)(_React$useState,2),isSwitchOn=_React$useState2[0],setIsSwitchOn=_React$useState2[1];
var onToggleSwitch=function onToggleSwitch(){
isSwitchOn?
changeData(i,Object.assign({},acces,{identifier:acces.id==0?1:2})):
changeData(i,Object.assign({},acces,{identifier:0}));
setIsSwitchOn(!isSwitchOn);
};

return(
React.createElement(_reactNative.View,{
key:i,
style:{flexDirection:'row',justifyContent:'space-evenly'},__self:this,__source:{fileName:_jsxFileName,lineNumber:31,columnNumber:5}},
React.createElement(_reactNativePaper.TextInput,{
disabled:isSwitchOn,
editable:isEditable,
returnKeyType:"next",
onSubmitEditing:function onSubmitEditing(){return codeRef.current.focus();},
blurOnSubmit:false,
style:{flex:3,height:35},
label:"Type",
mode:"outlined",
placeholder:"saisisser le type d'acces",
value:isEditable?localMarker.accesList[i].type:acces.type,
onChangeText:function onChangeText(type){
changeData(i,Object.assign({},
acces,{
type:type,
identifier:acces.id==0?1:2})
);
},__self:this,__source:{fileName:_jsxFileName,lineNumber:34,columnNumber:7}}
),

React.createElement(_reactNativePaper.TextInput,{
disabled:isSwitchOn,
editable:isEditable,
returnKeyType:"send",
onSubmitEditing:function onSubmitEditing(){},
autoCapitalize:"characters",
style:{flex:1,height:35},
label:"Code",
mode:"outlined",
placeholder:"#",
value:isEditable?localMarker.accesList[i].code:acces.code,
onChangeText:function onChangeText(codeText){
changeData(i,Object.assign({},
acces,{
code:codeText,
identifier:acces.id==0?1:2})
);
},__self:this,__source:{fileName:_jsxFileName,lineNumber:54,columnNumber:7}}
),
isEditable&&
React.createElement(_reactNativePaper.Switch,{color:"red",value:isSwitchOn,onValueChange:onToggleSwitch,__self:this,__source:{fileName:_jsxFileName,lineNumber:74,columnNumber:9}})

));

}