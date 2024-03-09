import Geolocation from 'react-native-geolocation-service';


function getMarkerExt(info,constantes,setConstantes,setDataToFetch) {
  console.log('getMarkerExt');
  if (constantes.showModal === false) {
    setDataToFetch({
      route: 'findAllMarkers&Acces',
      method: 'POST',
      data: info,
      callback: e => {
        console.log('reponse du fetch : '+ JSON.stringify(e));
        if (e.isConnected){ 
          setConstantes({...constantes,
          coordonates:{...info},
          markerList:[...e.jData],
          positionAcces:true,
          spinner:false,
          isConnected:true})}},});}
  else{
    setConstantes({...constantes, coordonates:{...info}})}}


export default geolock = {
  getPosition: (constantes, setConstantes, setDataToFetch)=> { 
    console.log('geolock.getposition()');
    Geolocation.getCurrentPosition(({coords}) => getMarkerExt(coords,constantes, setConstantes, setDataToFetch),
      error => console.log('errors: ', error.code, error.message));},

  getMarker: (info, constantes, setConstantes, setDataToFetch) => getMarkerExt(info, constantes, setConstantes, setDataToFetch),

  sendToBase: (
    adresse,
    code,
    accesType,
    constantes,
    setConstantes,
    setDataToFetch,) => {
      console.log('geolock.sendToBase()')
      const {showModal,coordonates} = constantes;
      if (!code) return alert('vous devez entrer un code!');
      setDataToFetch({
        route: 'create',
        method: 'POST',
        data: {
          adresse: adresse,
          latitude: constantes.coordonates.latitude,
          longitude: constantes.coordonates.longitude,
          acces: [{type: accesType, code}],},
        callback: e => {
          console.log('reponse du fetch : ' + JSON.stringify(e));
          if (e.isConnected) setConstantes({
            ...constantes, 
            showModal:false, 
            spinner:false, 
            isConnected:e.isConnected})},});},
}
