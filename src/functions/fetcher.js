import {LOCAL_APP_ROUTE2} from '@env';
import {REACT_APP_ROUTE} from '@env';
import React from 'react';
import { ConstantesContext } from '../context/constantesContext';

export default async function fetcher({route, method, data, callback = (e)=>{}}, logMargin = '') {
  // const {constantes, setConstantes} = React.useContext(ConstantesContext)
  // setConstantes({...constantes, spinner:true, showModal:false})
  const controleur = new AbortController();
  const signal = controleur.signal;
  const lePaquet = {
    method,
    signal,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}};

  
  let isConnected = true;
  var x = setTimeout(()=>controleur.abort(), 5000)
  console.log('request body: '+lePaquet.body)
  // ipv6
  console.log(logMargin+' Envoie du Fetch ipv6: '+route);
  fetch(`${REACT_APP_ROUTE}${route}`, lePaquet)
    .then(result=>result.json())
    .then(resultData=>{
      controleur.abort();
      console.log('ipv6 result: '+JSON.stringify(resultData))
      callback(resultData)
    })
    .catch(err => {console.log(logMargin+' echec envoi IpV6 => err:'+ err)});
    
 
    // ipv4
    console.log(logMargin+' Envoie du Fetch ipv4: '+route);
  fetch(`${LOCAL_APP_ROUTE2}${route}`, lePaquet)
    .then(result=>result.json())
    .then(resultData=>{
      controleur.abort();
      console.log("ipv4 result: "+JSON.stringify(resultData))
      callback(resultData)
    })
    .catch( err => {console.log(logMargin+' echec envoi IpV4 =>'+err)});


  // if (isConnected) {
    // console.log(logMargin+' Fetch reponse ok...')
    // jData = await fetchData.json();}
    // console.log('fetch:jdata: '+JSON.stringify(jData))
    // console.log(logMargin+' contenu de jData: '+JSON.stringify(jData))
    // if(typeof jData === 'object' && !('acces_id' in jData)) jData = jData.map(marker=>{return {...marker}})
  
}
