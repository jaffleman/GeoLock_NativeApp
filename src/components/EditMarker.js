import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import { ConstantesContext } from "../context/constantesContext";
import geolock from "../functions/geolock";
import { CoordonatesContext } from "../context/coordonatesContext";

export default EditMarker = () => {
  const {coords} = useContext(CoordonatesContext)
    const {constantes} = useContext(ConstantesContext)
    return (<Marker
        key={0}
        onDragEnd={e=>geolock.getMarkers({
          ...coords, 
          longitude:e.nativeEvent.coordinate.longitude, 
          latitude:e.nativeEvent.coordinate.latitude, },'=============>=============>=============>')}
        draggable={true}
        coordinate={{
          longitude: coords.longitude,
          latitude: coords.latitude,
        }}
        pinColor={'red'}/>)
}