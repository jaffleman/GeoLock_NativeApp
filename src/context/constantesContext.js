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
            console.log('ConstantesProvider:useEffect')
            if (constantes.showModal === false) {
            try {
                console.log('ConstantesProvider:useEffect: coords avant fetch: '+ JSON.stringify(coords))
                fetcher({
                route: 'findAllMarkers&Acces',
                method: 'POST',
                data: {...coords},
                callback: e => {
                    console.log(' ConstantesProvider:useEffect: reponse du fetch : '+ JSON.stringify(e));
                    if (e.isConnected){ 
                        setConstantes({...constantes, markerList:[...e.jData]})}},});} 
            catch (error) { console.log(' error ocurre in trying to setDataToFetch by getMarkerExt...')}}
            else{ refreshConstantes() }},[coords])
        

    const showFechedMarkers = (data)=>{
        console.log('ConstantesProvider:useEffect:showFechedMarkers')
        setConstantes({
            ...constantes,
            markerList:[...data],
            positionAcces:true,
            spinner:false,
            isConnected:true})}
    
    const fetchMode = ()=>{
        console.log('ConstantesProvider:useEffect:fetchMode')
        setConstantes({
            ...constantes,
            spinner:true,
            isConnected:false})}

    const refreshConstantes = ()=>{
        console.log('ConstantesProvider:useEffect:refreshConstantes')
        setConstantes({...constantes})}
    
    const deselectMarker = ()=>{
        console.log('ConstantesProvider:useEffect:deselectMarker')
        setConstantes({
            ...constantes,
            selectedMarker:{id:0, adresse:'', accesList:[]}}) }

    const selectMarker = (marker)=>{
        console.log('ConstantesProvider:useEffect:selectMarker')
        setConstantes({
            ...constantes,
            selectedMarker:{...marker}})}

    const showCreateMarkerModale = ()=>{
        console.log('ConstantesProvider:useEffect:showCreateMarkerModale')
        setConstantes({
            ...constantes, 
            showModal:true, showMarkerAdresseEdit:false})}

    const hideCreateMarkerModale = ()=>{
        console.log('ConstantesProvider:useEffect:hideCreateMarkerModale')
        setConstantes({
            ...constantes, 
            showModal:false, showMarkerAdresseEdit:true})}


  return ( <ConstantesContext.Provider value={{ 
        constantes, 
        setConstantes,
        showFechedMarkers,
        fetchMode,
        refreshConstantes,
        selectMarker,
        deselectMarker,
        showCreateMarkerModale,
        hideCreateMarkerModale}}>{children}</ConstantesContext.Provider>  )
}

export default ConstantesProvider