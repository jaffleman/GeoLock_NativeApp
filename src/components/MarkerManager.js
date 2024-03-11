import React from 'react';
import {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default MarkerManager = ({constantes, focusedMarker, setFocusedMarker, getMarker}) => {

  if (!constantes.showModal) {
    return constantes.markerList.map(
      (marker, index) => <Marker
      
          zIndex={-index}
          draggable={false}
          key={marker.id}
          coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude,}}
          onPress={()=>{
            setFocusedMarker({adresse:'',id:-1, accesList:[]})
            setFocusedMarker({adresse: marker.adresse, id:marker.id, accesList:[...marker.accesList]})}}
          pinColor={marker.id==focusedMarker.id?'#9900ee':'#1100ee'}></Marker>);} 
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
