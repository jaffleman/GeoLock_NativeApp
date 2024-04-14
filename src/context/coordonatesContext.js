import React, { createContext, useEffect, useState } from "react"
import Geolocation from 'react-native-geolocation-service';
import requestLocationPermission from "../requestLocationPermission";


export const CoordonatesContext = createContext()
const CoordsProvider = (props) => {
    console.log("coordsProvider")
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

        // useEffect(async ()=>{
        //     await requestLocationPermission().then(agrement=>{
        //         console.log('coordonatesContext: useEffect: requestLocationPermission(): agrement: '+agrement)
        //         if (agrement){
        //             Geolocation.getCurrentPosition(({coords}) => {
        //                 console.log('coordonatesContext: useEffect: getCurrentPosition(): coords: '+coords)
        //                 const {longitude, latitude} = coords
        //                 setCoords({...coords, longitude, latitude})})
        //                 console.log('coordonatesContext: setCoords(): coords')}})},[])
    
    const saveCoords = (newCoords)=>{
        console.log('CoordsProvider: saving coords: '+JSON.stringify(newCoords))
        // const {longitude, latitude} = newCoords;
        setCoords({...newCoords})}
  return <CoordonatesContext.Provider value={{ coords, saveCoords }}>{props.children}</CoordonatesContext.Provider>  
}

export default CoordsProvider