import React, { useEffect, useState } from 'react';
import {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default UnselectedMarker = ({constantes, setConstantes, poped, setPoped}) => {
    console.log('markerList dans UnSelectedMarker: '+ JSON.stringify(constantes.markerList))
    // const [localMarkerList, setLocalMarkerList] = useState(constantes.markerList)
    let myView = constantes.markerList.map((marker, index)=>{
        return <Marker
                zIndex={-index}
                draggable={false}
                key={marker.id}
                coordinate={{
                    longitude: marker.longitude,
                    latitude: marker.latitude,}}
                onPress={()=>{
                    const backupList = [...constantes.markerList]
                    setPoped(backupList.splice(index,1)[0])
                    console.log('poped: '+JSON.stringify(poped))
                    setConstantes({
                        ...constantes,
                        focusedMarkerId: marker.id,
                        markerInfo: {...poped},
                        markerList:[...backupList]
                    })}}
                pinColor='#1100ee'></Marker>})
    if (poped.id>0) {
        console.log('poped.id: '+poped.id)
        myView.push(
            <Marker
                // zIndex={-index}
            draggable={false}
            key={poped.id}
            coordinate={{
                longitude: poped.longitude,
                latitude: poped.latitude,}}
            onPress={()=>{}}
            pinColor='#9900ee'></Marker>)}
    return myView;
};
