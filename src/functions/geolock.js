import { useContext } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { ConstantesContext } from '../context/constantesContext';
import { CoordonatesContext } from '../context/coordonatesContext';
import fetcher from './fetcher';



async function getMarkerExt(coords,callback) {
  console.log(' getMarkerExt');
      fetcher({
        route: 'findAllMarkers&Acces',
        method: 'POST',
        data: {...coords},
        callback2: e => {
          console.log(' reponse du fetch : '+ JSON.stringify(e));
          if (e.isConnected){ 
            callback(e.jData)}},});}


export default geolock = {

  getPosition: ( setDataToFetch , logMarging = '' ) => { 
    ;},

  getMarkers: (coords,callback) => {getMarkerExt(coords,callback)}, 

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
            getMarkerExt()
            setTimeout(() => {
             setConstantes({
            ...constantes, 
            showModal:false, 
            spinner:false, 
            isConnected:e.isConnected}) 
            }, 100);}},});},
  objectComparator : (object1, object2) => {
    if (typeof(object1)==='object') {
      
    }
  }
}
