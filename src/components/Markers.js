import React, { useEffect, useState } from "react";
import EditMarker from "./EditMarker";
import NormalMarker from "./NormalMarker";

export default Markers = ({constantes, setConstantes, getMarker}) => {

   
        console.log('=============>=============>=============> useEffect [constantes]')
            if (constantes.showModal) {
                console.log('=============>=============>=============> mode creation d1 marker')
                return [<EditMarker key={'editMarker'} getMarker={getMarker} constantes={constantes}/>]}

            else{
                console.log('=============>=============>=============> mode affichage des markers')
                console.log('=============>=============>=============> nombre de marker: '+constantes.markerList.length)
               
                return constantes.markerList.map((marker)=>{
                    return marker.id === constantes.selectedMarker.id?
                    <NormalMarker 
                        key={'#9900ee'}
                        constantes={constantes}
                        setConstantes={setConstantes}
                        marker={marker}
                        color={'#9900ee'} />:
                    <NormalMarker 
                        key={marker.id}
                        constantes={constantes}
                        setConstantes={setConstantes}
                        marker={marker}
                        color={'#1100ee'} />})}
}