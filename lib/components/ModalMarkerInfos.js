var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=AddMarkerModal;var _react=_interopRequireDefault(require("react"));
var _reactNative=require("react-native");
var _reactNativePaper=require("react-native-paper");
var _reactNativeMaps=_interopRequireWildcard(require("react-native-maps"));var _jsxFileName="Z:\\code\\GeoLock_NativeApp\\src\\components\\ModalMarkerInfos.js";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){if("default"!==u&&{}.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}}return n.default=e,t&&t.set(e,n),n;}

function AddMarkerModal(_ref)










{var latitude=_ref.latitude,longitude=_ref.longitude,latitudeDelta=_ref.latitudeDelta,longitudeDelta=_ref.longitudeDelta,coordonates=_ref.coordonates,setMarkerCoordonates=_ref.setMarkerCoordonates,accesType=_ref.accesType,code=_ref.code,modalswitcher=_ref.modalswitcher,sendToBase=_ref.sendToBase;
return(
_react.default.createElement(_react.default.Fragment,null,
_react.default.createElement(_reactNative.Text,{
selectable:false,
style:{
color:'#6200ee',
fontWeight:'500',
fontSize:15,
textAlign:'center',
margin:10,
borderBottomColor:'#a9a9a9',
borderBottomWidth:1,
margin:0,
padding:7
},__self:this,__source:{fileName:_jsxFileName,lineNumber:20,columnNumber:7}},"AJOUTER UN CODE D'ACCES"

),
_react.default.createElement(_reactNativePaper.TextInput,{
style:{width:370,marginLeft:'auto',marginRight:'auto'},
autoCapitalize:true,
placeholder:"Hall, portail, ascenseur, escalier...",
label:"Type d'acces",
left:_react.default.createElement(_reactNativePaper.TextInput.Icon,{name:"boom-gate",__self:this,__source:{fileName:_jsxFileName,lineNumber:40,columnNumber:15}}),
onChangeText:function onChangeText(e){return accesType=e;},__self:this,__source:{fileName:_jsxFileName,lineNumber:35,columnNumber:7}}),
_react.default.createElement(_reactNativePaper.TextInput,{
autoCapitalize:"characters",
style:{width:370,marginLeft:'auto',marginRight:'auto'},
label:"CODE",
left:_react.default.createElement(_reactNativePaper.TextInput.Icon,{name:"lock",__self:this,__source:{fileName:_jsxFileName,lineNumber:46,columnNumber:15}}),
onChangeText:function onChangeText(e){return code=e;},__self:this,__source:{fileName:_jsxFileName,lineNumber:42,columnNumber:7}}),
_react.default.createElement(_reactNative.View,{style:{flexDirection:'row'},__self:this,__source:{fileName:_jsxFileName,lineNumber:48,columnNumber:7}},
_react.default.createElement(_reactNativePaper.Button,{mode:"containedtext",style:{flex:1},onPress:modalswitcher,__self:this,__source:{fileName:_jsxFileName,lineNumber:49,columnNumber:9}},"Annuler"

),
_react.default.createElement(_reactNativePaper.Button,{mode:"containedtext",style:{flex:1},onPress:sendToBase,__self:this,__source:{fileName:_jsxFileName,lineNumber:52,columnNumber:9}},"Enregistrer"

)
)
));

}


var styles=_reactNative.StyleSheet.create({
map2:{
marginLeft:'auto',
marginRight:'auto',
width:370,
height:250
}
});