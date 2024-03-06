import Geolocation from 'react-native-geolocation-service';
function getMerkerExt(info,constantes,setConstantes,setDataToFetch) {
  console.log('get Merker ext')
  const {showModal,} = constantes;
  console.log('showModal:'+showModal)
  if (showModal === false) {
    setDataToFetch({
      route: 'findAllMarkers&Acces',
      method: 'POST',
      data: info,
      callback: (e) => {
        console.log('reponse du fetch...')
        if (e.isConnected){ 
          console.log('SetDataToFetch...');
          setConstantes({...constantes,
          coordonates:{...info},
          markerList:[...e.jData],
          positionAcces:true,
          spinner:false,
        isConnected:true})}
      },});
  }  
}


export default geolock = {
  getPosition: (constantes, setConstantes, setDataToFetch)=> { 
    console.log('get position');
    Geolocation.getCurrentPosition(
      ({coords}) => {
        // setConstantes({...constantes, coordonates:{...coords}})
        console.log('on est ici dans getPosition!')
        // setConstantes({...constantes, coordonates:{...coords},positionAcces:true})
        getMerkerExt(coords,constantes, setConstantes, setDataToFetch)
        },
      error => console.log('errors: ', error.code, error.message));
    },

  getMarker: (info, constantes, setConstantes, setDataToFetch)=>{getMerkerExt(info, constantes, setConstantes, setDataToFetch)},

  // showModalSwitcher: (constantes, setConstantes,) => {
  //   Geolocation.getCurrentPosition(
  //     ({coords}) => {
  //       console.log('les coordonnés du showModalSwitcher: '+ JSON.stringify(coords))
  //       setConstantes({...constantes, showModal:true, markerList:[]})},
  //     error => console.log('errors: ', error.code, error.message));},

  // hideModalSwitcher: (constantes, setConstantes, setDataToFetch) => {
  //   Geolocation.getCurrentPosition(
  //     ({coords}) => {
  //       // setConstantes({...constantes, coordonates:{...coords}})
  //       console.log('on est ici dans getPosition!')
  //       // setConstantes({...constantes, coordonates:{...coords},positionAcces:true})
  //       getMerkerExt(coords,{...constantes, showModal:false}, setConstantes, setDataToFetch)
  //       },
  //     error => console.log('errors: ', error.code, error.message))},
    

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
