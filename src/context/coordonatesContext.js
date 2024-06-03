import React, { createContext, useEffect, useState } from "react"
import Geolocation from 'react-native-geolocation-service';
import requestLocationPermission from "../requestLocationPermission";


export const CoordonatesContext = createContext({
    coords:{ // coordonate of the user on the map
        longitude: 0,
        latitude: 0,
        longitudeDelta: 0,
        latitudeDelta: 0 }, 
    refCoords:{ // coordonate of the user on the map
        longitude: 0,
        latitude: 0,
        longitudeDelta: 0,
        latitudeDelta: 0 }, 
    saveCoords: ()=>{},
    saveMarkerCoords: (coords)=>{},
    forceSaveRefCoords: (coords)=>{}})
const CoordsProvider = (props) => {
    console.log("*********coordsProvider")
    const { initDimensions, initialCoords} = props.value;
    const {height, width} = initDimensions;
    const {longitude, latitude} = initialCoords;
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0020;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;  

    const [coords, setCoords] = useState({ // coordonate of the user on the map
        longitude: longitude,
        latitude: latitude,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA })
        
    const [refCoords, setRefCoords] = useState({
        longitude: longitude,
        latitude: latitude,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA })

    const forceSaveRefCoords = (newCoords= {...coords})=>{
        console.log('coordsContext: forceSaveRefCoords')
        setRefCoords({...newCoords})}

    const saveMarkerCoords = (NewCoords)=>{
        console.log('sauvegarde des coordonées du EditMarker')
        setCoords({...coords, ...NewCoords})
    }

    const saveCoords = (newCoords)=>{
        const longitudeDif = Math.abs(refCoords.longitude - newCoords.longitude);
        const latitudeDif = Math.abs(refCoords.latitude - newCoords.latitude);
        if (longitudeDif>0.001 || latitudeDif>0.001) {
            console.log('fetch call for new coords')
            setRefCoords({...newCoords})}
        console.log('CoordsProvider: saving coords: '+JSON.stringify(newCoords))
        // const {longitude, latitude} = newCoords;
        setCoords({...newCoords})}
    return <CoordonatesContext.Provider value={{ coords, refCoords, saveCoords, forceSaveRefCoords, saveMarkerCoords}}>{props.children}</CoordonatesContext.Provider>  
}

export default CoordsProvider