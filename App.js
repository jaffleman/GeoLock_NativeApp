import React, {useEffect, useRef, useState} from 'react';
import { Button, StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView,  { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission'

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default app=() => {
  console.log('STARTER')
  const [coordonates, setCoordonates]= useState({"permission":false})
  function getPosition(callback) {
    Geolocation.getCurrentPosition(({coords})=>{
      callback(coords)
    },
    (error)=>{
      console.log("errors: ", error.code, error.message)
    })
  }

  useEffect(()=>{
    requestLocationPermission((permission)=>{
      if(permission){
        getPosition((coords)=>{
          setCoordonates({
            ...coords,
            permission: true
          })
        })
      }
    })
  },[])

  if(coordonates.permission){
    const {latitude,longitude}=coordonates
        return <View style={styles.container}>
          <MapView
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
          </MapView>
        </View>
  }else {
    return(
      <Button title='authorisation' 
        onPress={()=>{requestLocationPermission((permission)=>{setCoordonates({"permission":permission})})}}
        >demander authorisation
      </Button>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height:height-35,
    width,
    alignItems: 'center',
  },
  map: {...StyleSheet.absoluteFillObject},
  centeredView: {
    backgroundColor:'rgba(0,0,0,0.75)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
