import Geolocation from 'react-native-geolocation-service';
function getMerkerExt(info,constantes,setConstantes,setDataToFetch) {
  const {
    showModal,} = constantes;
    console.log('getMerkerExt valeur de constantes: '+ JSON.stringify(constantes))
    console.log('getMerkerExt valeur de info: '+JSON.stringify(info))
if (showModal === false) {
  setDataToFetch({
    route: 'findAllMarkers&Acces',
    method: 'POST',
    data: info,
    callback: e => {
      console.log('e : ' + JSON.stringify(e));
      console.log('e.isConnected: '+e.isConnected)
      if (e.isConnected) setConstantes({...constantes,
        markerList:[...e.jData],
        positionAcces:true,
        spinner:false,
      isConnected:e.isConnected})
    },});}  
}


export default geolock = {
  getPosition: (constantes, setConstantes, setDataToFetch=()=>{})=> {
    
    Geolocation.getCurrentPosition(
      ({coords}) => {
        constantes = {...constantes, coordonates:{...coords}}
        console.log('on est ici dans getPosition!')
        getMerkerExt(constantes,setConstantes,setDataToFetch)
        },
      error => console.log('errors: ', error.code, error.message));},

  getMarker: (info, constantes, setConstantes, setDataToFetch)=>{getMerkerExt(info, constantes, setConstantes, setDataToFetch)},

  showModalSwitcher: (constantes, setConstantes,) => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        console.log('les coordonnés du showModalSwitcher: '+ JSON.stringify(coords))
        setConstantes({...constantes, coordonates:{...coords}, showModal:true, markerList:[]})},
      error => console.log('errors: ', error.code, error.message));},

  hideModalSwitcher: (constantes, setConstantes) => {
    setConstantes({...constantes, markerList:[], showModal:false})},
    

  sendToBase: (
    constantes,
    setConstantes,
    adresse,
    code,
    accesType,
    setDataToFetch,) => {
      const {showModal,coordonates} = constantes;
    if (!code) return alert('vous devez entrer un code!');
    setDataToFetch({
      route: 'create',
      method: 'POST',
      data: {
        adresse: adresse,
        latitude: coordonates.latitude,
        longitude: coordonates.longitude,
        acces: [{type: accesType, code}],},
      callback: e => {
        console.log('e : ' + JSON.stringify(e));
        if (e.isConnected) setConstantes({...constantes, 
          showModal:false, 
          spinner:false, 
          isConnected:e.isConnected})},});},

  requestLocationPermission: (agrement, setCoordonates, setPositionAcces) => {
    if (agrement) {
      geolock.getPosition(coords => {
        setCoordonates(coords);
        setPositionAcces(agrement);});}},};
