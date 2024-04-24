import React, { createContext, useContext, useEffect, useState } from "react"
import { CoordonatesContext } from "./coordonatesContext"
import fetcher from "../functions/fetcher"
export const ConstantesContext = createContext({
    constantes : {
        markerList:[], // list of the markers sended from the api
        showModal:false, // define whether the marker creator must be show
        spinner:true, // whether to show the spinner
        isConnected:true,
        selectedMarker:{id:0, adresse:'', accesList:[]}},
    setConstantes : ()=>{},
    showFechedMarkers: ()=>{},
    createMarker : ()=>{}, 
    updateMarker : ()=>{},
    deleteMarker : ()=>{},
    fetchMode: ()=>{},
    refreshConstantes: ()=>{},
    selectMarker: ()=>{},
    deselectMarker: ()=>{},
    showCreateMarkerModale: ()=>{},
    hideCreateMarkerModale: ()=>{}},
)

const ConstantesProvider = ({ children }) => {
    console.log('**************ConstantesProvider')
    const [constantes, setConstantes] = useState({
        markerList:[], // list of the markers sended from the api
        showModal:false, // define whether the marker creator must be show
        spinner:false, // whether to show the spinner
        isConnected:true,
        selectedMarker:{id:0, adresse:'', accesList:[]}}) // the marker info which as been selected by the user
    const {coords, refCoords, forceSaveRefCoords} = useContext(CoordonatesContext)
    useEffect(()=>{
        console.log('ConstantesProvider:useEffect')
        if (constantes.showModal === false) {
        try {
            console.log('ConstantesProvider:useEffect: coords avant fetch: '+ JSON.stringify(refCoords))
            fetcher({
              route: 'findAllMarkers&Acces',
              method: 'POST',
              data: {...refCoords},
              callback: e => {
                  console.log(' ConstantesProvider:useEffect: reponse du fetch : '+ JSON.stringify(e));
                  if (e.isConnected){ 
                      setConstantes({...constantes, markerList:[...e.jData]})}},});} 
        catch (error) { console.log(' error ocurre in trying to fetcher by getMarkerExt...')}}
        else{ refreshConstantes() }},[refCoords])
        

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
    const updateMarker = (item)=>{
        setConstantes({
            ...constantes,
            spinner:true,
            selectedMarker:{id:0, adresse:'', accesList:[]}});
          fetcher({
            route: 'updateMarker',
            method: 'put',
            data: {
              adresse:item.adresse, 
              id:item.id, 
              latitude: coords.latitude,
              longitude : coords.longitude
            },
            callback: () => {
              setConstantes({
                ...constantes,
                spinner:false,
                isConnected:true})
                setTimeout(() => {
                  getMarker(coords)
                }, 1000)},})}
    
    const createMarker = ({adresse, code, accesType})=>{
        const {showModal,coordonates} = constantes;
        console.log('createMarker code: '+code)
        if (!code) return alert('vous devez entrer un code!');
        fetcher({
          route: 'create',
          method: 'POST',
          data: {
            adresse: adresse,
            latitude: coords.latitude,
            longitude: coords.longitude,
            acces: [{type: accesType, code}],},
          callback: e => {
            if (e.isConnected) {
              setConstantes({...constantes, showModal:false})
              fetcher({
                route: 'findAllMarkers&Acces',
                method: 'POST',
                data: {...refCoords},
                callback: e => {
                    console.log(' ConstantesProvider: reponse du fetch : '+ JSON.stringify(e));
                    if (e.isConnected){ 
                        setConstantes({...constantes,showModal:false, spinner:false, markerList:[...e.jData]})}},})}},})}

    const deleteMarker = ()=>{
      const id = constantes.selectedMarker.id
      setConstantes({
        ...constantes,
        spinner:true,
        selectedMarker:{id:0, adresse:'', accesList:[]}});
      fetcher({
        route: 'delete',
        method: 'delete',
        data: {id:id},
        callback: () => {
          console.log('refresh Markers List => forceSaveRefCoords')
          forceSaveRefCoords();
          // geolock.getMarkers(coords, (jData)=>{
          //   setConstantes({
          //     ...constantes,
          //     markerList:[...jData],
          //     spinner:false,
          //     isConnected:true,})});
        },})}

  return ( <ConstantesContext.Provider value={{ 
        constantes,
        createMarker, 
        updateMarker,
        deleteMarker,
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