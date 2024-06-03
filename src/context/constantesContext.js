import React, { createContext, useContext, useEffect, useState } from "react"
import CoordsProvider, { CoordonatesContext } from "./coordonatesContext"
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
    createAcces: ()=>{},
    updateAcces: ()=>{},
    updateMarker : ()=>{},
    deleteMarker : ()=>{},
    deleteAcces : ()=>{},
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
        spinner:true, // whether to show the spinner
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
                  if (true){ 
                      setConstantes({...constantes, spinner:false, markerList:[...e], showModal:false})}},});} 
        catch (error) { console.log(' error ocurre in trying to fetcher by getMarkerExt...')}}
        else{ refreshConstantes() }},[refCoords])
        

    const showFechedMarkers = (data)=>{
        console.log('ConstantesProvider:useEffect:showFechedMarkers')
        setConstantes({
            ...constantes,
            markerList:[...data],
            positionAcces:true,
            spinner:false,
            showModal:false,
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
      if ('id' in item){
        console.log("updating Marker: "+JSON.stringify(item))
        setConstantes({
          ...constantes,
          spinner:true,
          selectedMarker:{id:0, adresse:'', accesList:[]}});
        if ('id' in item) {
          fetcher({
            route: 'updateMarker',
            method: 'put',
            data:{ 
              isLast: true,
              marker:{...item, 
                latitude: coords.latitude,
                longitude : coords.longitude}},
            callback: e => {
              console.log(' ConstantesProvider:useEffect: reponse du fetch : '+ JSON.stringify(e));
              if (true){ 
                  setConstantes({...constantes, spinner:false, markerList:[...e.refresh], showModal:false, selectedMarker:{id:0, adresse:'', accesList:[]}})}}})}}}


    const createAcces = (item)=>{ 
      if (item.length>0) {
        console.log("creating acces: "+JSON.stringify(item))
        fetcher({
          route: 'createAcces', 
          method: 'POST',
          data: {
            isLast: true,
            accesList: item},
          callback: e => {
            console.log(' ConstantesProvider:useEffect: reponse du fetch : '+ JSON.stringify(e));
            if (true){ 
                setConstantes({...constantes, spinner:false, markerList:[...e.refresh], showModal:false, selectedMarker:{id:0, adresse:'', accesList:[]}})}}})}
      } 
        
    const updateAcces = (item)=>{
      if (item.length>0) {
        console.log("updating acces: "+JSON.stringify(item))
          fetcher({
            route: 'updateAcces',
            method: 'PUT',
            data: {
              isLast: true,
              accesList: item},
            callback:e => {
              console.log(' ConstantesProvider:useEffect: reponse du fetch : '+ JSON.stringify(e));
              if (true){ 
                  setConstantes({...constantes, spinner:false, markerList:[...e.refresh], showModal:false, selectedMarker:{id:0, adresse:'', accesList:[]}})}}})}}
              
    const deleteAcces = (item)=>{  
      if (item.length>0) {
      console.log("deleting acces: "+JSON.stringify(item))      
          fetcher({
            route: 'deleteAcces',
            method: 'DELETE',
            data: {
              isLast: true,
              accesList: item},
            callback: e => {
              console.log(' ConstantesProvider:useEffect: reponse du fetch : '+ JSON.stringify(e));
              if (true){ 
                  setConstantes({...constantes, spinner:false, markerList:[...e.refresh], showModal:false, selectedMarker:{id:0, adresse:'', accesList:[]}})}}})}}
            
            

    const createMarker = ({adresse, code, accesType})=>{
        const {showModal,coordonates} = constantes;
        console.log('createMarker code: '+code)
        if (!code) return alert('vous devez entrer un code!');
        fetcher({
          route: 'createMarker',
          method: 'POST',
          data: {
            adresse: adresse,
            latitude: coords.latitude,
            longitude: coords.longitude,
            author: 'Jaffleman',
            acces: [{type: accesType, code}],},
          callback: e => {
            if (e.isSuccesfull) {
              setConstantes({...constantes,showModal:false, spinner:false, markerList:[...e.refresh]})}},})}

    const deleteMarker = ()=>{
      const id = constantes.selectedMarker.id
      setConstantes({
        ...constantes,
        spinner:true,
        selectedMarker:{id:0, adresse:'', accesList:[]}});
      fetcher({
        route: 'deleteMarker',
        method: 'DELETE',
        data: {
          "isLast": true,
          "marker": {
              "id": id,
              "longitude": coords.longitude,
              "latitude": coords.latitude } },
        callback: e => {
          if (e.isSuccesfull) {
            setConstantes({...constantes,showModal:false, spinner:false, markerList:[...e.refresh], selectedMarker:{id:0, adresse:'', accesList:[]}})}
            console.log('refresh Markers List => forceSaveRefCoords')
            //forceSaveRefCoords();
        },})}

  return ( <ConstantesContext.Provider value={{ 
        constantes,
        createMarker, 
        updateMarker,
        createAcces,
        updateAcces,
        deleteMarker,
        deleteAcces,
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