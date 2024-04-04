import React from "react";
import { Marker } from "react-native-maps";

export default EditMarker = ({getMarker, constantes}) => {
    return (<Marker
        key={0}
        onDragEnd={e=>getMarker({
          ...constantes.coordonates, 
          longitude:e.nativeEvent.coordinate.longitude, 
          latitude:e.nativeEvent.coordinate.latitude, },'=============>=============>=============>')}
        draggable={true}
        coordinate={{
          longitude: constantes.coordonates.longitude,
          latitude: constantes.coordonates.latitude,
        }}
        pinColor={'red'}/>)
}