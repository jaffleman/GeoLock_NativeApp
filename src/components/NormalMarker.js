import { Marker } from "react-native-maps";
import React, { useContext } from "react";
import { ConstantesContext } from "../context/constantesContext";
export default  NormalMarker = ({marker, color}) => {
    const {selectMarker} = useContext(ConstantesContext)
    if (color==='#1100ee') {
        console.log("normal Marker: "+marker.id)
    } else {
        console.log("selected Marker: "+marker.id)
    }
    return <Marker
        draggable={false}
        key={marker.id}
        pinColor={color}
        coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude,}}
        onPress={()=>{selectMarker({...marker})}}></Marker>
}