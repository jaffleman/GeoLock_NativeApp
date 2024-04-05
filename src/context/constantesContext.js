import React, { createContext, useContext, useEffect, useState } from "react"
import geolock from "../functions/geolock"
import { CoordonatesContext } from "./coordonatesContext"
import fetcher from "../functions/fetcher"
export const ConstantesContext = createContext()

const ConstantesProvider = ({ children }) => {
    console.log('ConstantesProvider')
    const [constantes, setConstantes] = useState({
        // showMarkerAdresseEdit:false, // define whether the marker adresse must be editable
        positionAcces:false, //
        markerList:[], // list of the markers sended from the api
        showModal:false, // define whether the marker creator must be show
        spinner:true, // whether to show the spinner
        isConnected:true,
        selectedMarker:{id:0, adresse:'', accesList:[]}}) // the marker info which as been selected by the user
        const {coords} = useContext(CoordonatesContext)
        useEffect(()=>{
            if (constantes.showModal === false) {
        try {
            console.log('coords avant fetch: '+ JSON.stringify(coords))
            fetcher({
            route: 'findAllMarkers&Acces',
            method: 'POST',
            data: {...coords},
            callback: e => {
                console.log(' reponse du fetch : '+ JSON.stringify(e));
                if (e.isConnected){ 
                    setConstantes({...constantes, markerList:[...e.jData]})}},});
    
            } 
        catch (error) { console.log(' error ocurre in trying to setDataToFetch by getMarkerExt...')}}
        else{ refreshConstantes() }
        },[coords])
        

    const showFechedMarkers = (data)=>{
        setConstantes({
            ...constantes,
            markerList:[...data],
            positionAcces:true,
            spinner:false,
            isConnected:true})}
    
    const fetchMode = ()=>{
        setConstantes({
            ...constantes,
            spinner:true,
            isConnected:false})}

    const refreshConstantes = ()=>{
        setConstantes({...constantes})
    }
    console.log('constantesContext: '+JSON.stringify(constantes))
  return ( <ConstantesContext.Provider value={{ 
        constantes, 
        showFechedMarkers,
        fetchMode,
        refreshConstantes}}>{children}</ConstantesContext.Provider>  )
}

export default ConstantesProvider