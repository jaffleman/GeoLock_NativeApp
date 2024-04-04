import { Marker } from "react-native-maps";
import React from "react";
export default  NormalMarker = ({marker, color, constantes, setConstantes}) => {
    return <Marker
        draggable={false}
        key={marker.id}
        pinColor={color}
        coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude,}}
        onPress={()=>{
            setConstantes({
                ...constantes,
                selectedMarker: {...marker}})}}
        ></Marker>
}