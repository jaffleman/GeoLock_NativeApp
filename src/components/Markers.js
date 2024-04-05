import React, { useContext, useEffect, useState } from "react";
import EditMarker from "./EditMarker";
import NormalMarker from "./NormalMarker";
import { ConstantesContext } from "../context/constantesContext";



export default Markers = () => {
    console.log("Markers")
    const {constantes} = useContext(ConstantesContext)
    console.log('=============>=============>=============> Markers')
    if (constantes.showModal) {
        console.log('=============>=============>=============> mode creation d1 marker')
        return [<EditMarker key={'editMarker'} />]}

    else{
        console.log('=============>=============>=============> mode affichage des markers')
        console.log('=============>=============>=============> nombre de marker: '+constantes.markerList.length)
        return constantes.markerList.map((marker)=>{
            return <NormalMarker 
                marker={marker}
                key={marker.id === constantes.selectedMarker.id?'#9900ee':marker.id}
                color={marker.id === constantes.selectedMarker.id?'#9900ee':'#1100ee'} />})}
}