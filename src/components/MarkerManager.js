import React from 'react';
import {View, Text} from 'react-native';
import {Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default MarkerManager = ({constantes, setConstantes}) => {
  if (!constantes.showModal) {
    return constantes.markerList.map((marker, index) => {
      return (
        <Marker
          zIndex={-index}
          draggable={false}
          key={marker.id}
          coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude,}}
          onPress={()=>setConstantes({...constantes, focusedMarkerInfo:{adresse: marker.adresse, id:marker.id, accesList:[...marker.accesList]}})}
          pinColor={marker.id==constantes.focusedMarkerInfo.id?'yellow':'darkturquoise'}>
          
        </Marker>);});} 
  else if (constantes.showModal) {
    return (
      <Marker
        draggable={true}
        coordinate={{
          longitude: constantes.coordonates.longitude,
          latitude: constantes.coordonates.latitude,
        }}
        pinColor={'red'}/>);}
};
