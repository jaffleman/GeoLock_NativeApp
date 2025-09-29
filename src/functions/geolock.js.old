import Geolocation from 'react-native-geolocation-service';


async function getMarkerExt(constantes,setConstantes,setDataToFetch, logMarging) {
  console.log(logMarging+' getMarkerExt');
  // console.log('constantes.coordonates pour fetch '+JSON.stringify(constantes.coordonates))
  if (constantes.showModal === false) {
    try {
      setDataToFetch({
        route: 'findAllMarkers&Acces',
        method: 'POST',
        data: {...constantes.coordonates},
        callback: e => {
          console.log(logMarging+' reponse du fetch : '+ JSON.stringify(e));
          if (e.isConnected){ 
            setConstantes({
              ...constantes,
              markerList:[...e.jData],
              positionAcces:true,
              spinner:false,
              isConnected:true})}},});
      return true;
    } catch (error) { console.log(logMarging+' error ocurre in trying to setDataToFetch by getMarkerExt...')}}
  else{ setConstantes({...constantes}) }}


export default geolock = {
  getPosition: (constantes, setConstantes, setDataToFetch , logMarging = '')=> { 
    console.log(logMarging+' geolock.getposition()');
    setTimeout(() => {
      Geolocation.getCurrentPosition(({coords}) => {
        // console.log('coords de geolocation.getCurrentPosition: '+JSON.stringify(coords));
        getMarkerExt({...constantes, coordonates:{...constantes.coordonates, longitude:coords.longitude, latitude:coords.latitude}}, 
          setConstantes, setDataToFetch, logMarging)},
        error => console.log(logMarging+' errors: ', error.code, error.message));      
    }, 500);},

  getMarker: (constantes, setConstantes, setDataToFetch, logMargin='') =>getMarkerExt(constantes, setConstantes, setDataToFetch, logMargin),

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
          // console.log('reponse du fetch : ' + JSON.stringify(e));
          if (e.isConnected) {
            getMarkerExt(constantes, setConstantes, setDataToFetch)
            setTimeout(() => {
             setConstantes({
            ...constantes, 
            showModal:false, 
            spinner:false, 
            isConnected:e.isConnected}) 
            }, 100);}},});},
}
