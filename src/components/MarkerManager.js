import React, { useEffect, useState } from 'react';
import {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default MarkerManager = ({constantes, setConstantes, getMarker}) => {
  if (!constantes.showModal) {
    return constantes.markerList.map(
      (marker, index) => {
        const markerColor = marker.isFocused?'#9900ee':'#1100ee';
        return <Marker
          // opacity={focusedMarker.id!=-1?(marker.id==focusedMarker.id?1.0:0.1):1.0}
          zIndex={-index}
          draggable={false}
          key={marker.id}
          coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude,}}
          onPress={()=>{
            // setFocusedMarker({adresse:'',id:-1, accesList:[]})
            setConstantes({
              ...constantes, 
              markerList:constantes.markerList.map(marker2=>{
                return {
                  ...marker2,
                  isFocused: marker2.id==marker.id?true:false}}), 
              focusedMarkerId: marker.id})}}
          pinColor={markerColor}></Marker>});} 
  else if (constantes.showModal) {
    return (
      <Marker
        onDragEnd={e=>getMarker({...constantes.coordonates, longitude:e.nativeEvent.coordinate.longitude, latitude:e.nativeEvent.coordinate.latitude, })}
        draggable={true}
        coordinate={{
          longitude: constantes.coordonates.longitude,
          latitude: constantes.coordonates.latitude,
        }}
        pinColor={'red'}/>);}
};
