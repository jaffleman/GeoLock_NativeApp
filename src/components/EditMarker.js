import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import { CoordonatesContext } from "../context/coordonatesContext";

export default EditMarker = ({coords}) => {
  console.log('EditMarker creation')
  const {saveMarkerCoords}= React.useContext(CoordonatesContext)
    return (<Marker
        key={0}
        onDragEnd={e=>saveMarkerCoords(e.nativeEvent.coordinate)}
        draggable={true}
        coordinate={coords}
        pinColor={'red'}/>)}