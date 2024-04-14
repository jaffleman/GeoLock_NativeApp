import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission';
import {FAB,} from 'react-native-paper';
import fetcher from './src/functions/fetcher';
import AddMarkerModal from './src/components/AddMarkerModal';
import InfoMarkerModal from './src/components/InfoMarkerModal';
import geolock from './src/functions/geolock';
import Markers from './src/components/Markers';
import ConstantesProvider, { ConstantesContext } from './src/context/constantesContext';
import CoordsProvider from './src/context/coordonatesContext';
import CustomMapView from './src/components/CustomMapView';
import Geolocation from 'react-native-geolocation-service';




export default app = () => {
  console.log('******************  STARTER  **********************')
  const [initialCoords, setInitialCoords] = useState()
  const initDimensions = Dimensions.get('window');
  useEffect(()=>{
    console.log('App:useEffect')
    requestLocationPermission()
      .then(agrement=>{
        console.log('App:useEffect:Agrement: '+agrement)
        if (agrement){
          Geolocation.getCurrentPosition(({coords}) => {
              console.log('App:useEffect:getCurrentPosition(): coords: '+JSON.stringify(coords))
              setInitialCoords({...coords})})}})},[])
  console.log('App:initialCoords: '+JSON.stringify(initialCoords) )
    return (initialCoords &&
      <CoordsProvider value={{initDimensions,initialCoords}}>
        <ConstantesProvider>
          <KeyboardAvoidingView keyboardVerticalOffset={30} behavior={'height'} style={{flex: 1}}>
            <InfoMarkerModal/>
            <CustomMapView/></KeyboardAvoidingView></ConstantesProvider></CoordsProvider>)}


