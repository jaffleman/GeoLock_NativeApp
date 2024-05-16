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


  objectComparator : (source, alter) => {
    const newMarker = {}
    const newAcces = []
    const updatedAcces = []
    const deletedAcces = []
    
    if (typeof(source)==='object' && typeof(alter)==='object') {
      if (source.adresse.trim() != alter.adresse.trim()){
        newMarker.id = source.id
        newMarker.adresse = alter.adresse}

      alter.accesList.map((acces2) => {
        if (acces2.id === 0){
          newAcces.push({...acces2})}});

      source.accesList.map(acces=>{
        let notFound = true
        alter.accesList.map(acces2=>{
          if(acces2.id === acces.id) {
            notFound = false;
            if(acces.type.trim() != acces2.type.trim() || acces.code.trim() != acces2.code.trim()){
              updatedAcces.push(acces2)}}})
        if (notFound) {
        deletedAcces.push({id:acces.id})}})}
  return {newMarker, newAcces, updatedAcces, deletedAcces}}
}
