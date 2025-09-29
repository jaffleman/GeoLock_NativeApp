var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=fetcher;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));function


fetcher(_x){return _fetcher.apply(this,arguments);}function _fetcher(){_fetcher=(0,_asyncToGenerator2.default)(function*(_ref)


{var route=_ref.route,method=_ref.method,data=_ref.data,_ref$callback=_ref.callback,callback=_ref$callback===void 0?function(e){}:_ref$callback;var logMargin=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';
console.log('**** FETCH ****');
var controleurIpv4=new AbortController();
var controleurIpv6=new AbortController();
var signal4=controleurIpv4.signal;
var signal6=controleurIpv6.signal;

var erroCounter=0;
var abort=setTimeout(function(){
controleurIpv4.abort('over time');
controleurIpv6.abort('over time');
console.log('>>>>>>>>ABORT BY SETTIMEOUT<<<<<<<<');
callback(false);
},600000);

var bothRequestError=function bothRequestError(){
erroCounter++;
if(erroCounter>1){
console.log('>>>>>>>>ABORT BY bothRequestError()<<<<<<<<');
clearTimeout(abort);
callback(false);
}
};

var lePaquet={
method:method,
body:JSON.stringify(data),
headers:{'Content-Type':'application/json'}
};


console.log(logMargin+' Envoie du Fetch ipv6: '+route);
fetch("https://api.jaffleman.tech/geolock/"+route,Object.assign({},lePaquet,{signal:signal6})).
then(function(result){return result.json();}).
then(function(resultData){
controleurIpv4.abort('ipv6 request completed');
clearTimeout(abort);
console.log('**** FIN DU FETCH IPV6****');
callback(resultData);
}).
catch(function(err){
console.log(logMargin+' echec envoi IpV6 => '+err);
if('TypeError: Network request failed'.localeCompare(err)==0)
bothRequestError();
});


console.log(logMargin+' Envoie du Fetch ipv4: '+route);
fetch("http://192.168.0.29/geolock/"+route,Object.assign({},lePaquet,{signal:signal4})).
then(function(result){return result.json();}).
then(function(resultData){
controleurIpv6.abort('ipv4 request completed');
clearTimeout(abort);
console.log('**** FIN DU FETCH IPV4****');
callback(resultData);
}).
catch(function(err){
console.log(logMargin+' echec envoi IpV4 => '+err);
if('TypeError: Network request failed'.localeCompare(err)==0)
bothRequestError();
});
});return _fetcher.apply(this,arguments);}