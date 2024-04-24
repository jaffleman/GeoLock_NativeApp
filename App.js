import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, Dimensions } from 'react-native';
import requestLocationPermission from './src/requestLocationPermission';
import ConstantesProvider from './src/context/constantesContext';
import CoordsProvider from './src/context/coordonatesContext';
import CustomView from './src/components/CustomView';
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
            <CustomView/></KeyboardAvoidingView></ConstantesProvider></CoordsProvider>)}


