import {LOCAL_APP_ROUTE2} from '@env';
import {REACT_APP_ROUTE} from '@env';

export default async function fetcher({route, method, data, callback}, logMargin = '') {
  const lePaquet = {
    method,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}};

  let fetchData = {};
  let isConnected = true;
  // ipv6
  console.log(logMargin+' Envoie du Fetch ipv6: '+route);
  console.log('request body: '+lePaquet.body)
  fetchData = await fetch(`${REACT_APP_ROUTE}${route}`, lePaquet)
    .catch(err => {isConnected = false; console.log(logMargin+' echec envoi IpV6 => err:'+ err)});
  if (!isConnected) {
    isConnected = true;
    // ipv4
    console.log(logMargin+' Envoie du Fetch ipv4: '+route);
    fetchData = await fetch(`${LOCAL_APP_ROUTE2}${route}`, lePaquet)
    .catch( err => {(isConnected = false); console.log(logMargin+' echec envoi IpV4 =>'+err)});
  }
  let jData = {};
  if (isConnected) {
    console.log(logMargin+' Fetch reponse ok...')
    jData = await fetchData.json();}
    // console.log(logMargin+' contenu de jData: '+JSON.stringify(jData))
    if(typeof jData === 'object' && !('acces_id' in jData)) jData = jData.map(marker=>{return {...marker}})
  callback({isConnected, jData});
}
