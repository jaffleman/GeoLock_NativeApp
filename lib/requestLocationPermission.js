var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=requestLocationPermission;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _reactNativeGeolocationService=_interopRequireDefault(require("react-native-geolocation-service"));
var _reactNative=require("react-native");function

requestLocationPermission(){return _requestLocationPermission.apply(this,arguments);}function _requestLocationPermission(){_requestLocationPermission=(0,_asyncToGenerator2.default)(function*(){
console.log('App:useEffect:Request location permission...');
if(Platform.OS==='ios'){
_reactNativeGeolocationService.default.setRNConfiguration({
authorizationLevel:'whenInUse'
});

_reactNativeGeolocationService.default.requestAuthorization();

return null;
}else if(Platform.OS==='android'){
try{
console.log('App:useEffect:Check permission android');
var granted=yield _reactNative.PermissionsAndroid.request(
_reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
);

if(granted===_reactNative.PermissionsAndroid.RESULTS.GRANTED){
return true;
}else{
return false;
}
}catch(err){
return false;
}
}
});return _requestLocationPermission.apply(this,arguments);}