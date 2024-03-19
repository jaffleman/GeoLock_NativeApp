import {LOCAL_APP_ROUTE2} from '@env';
import {REACT_APP_ROUTE} from '@env';
import { Marker } from 'react-native-maps';

export default async function fetcher({route, method, data, callback}) {
  const lePaquet = {
    method,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}};

  let fetchData = {};
  let isConnected = true;
  console.log('Envoie du Fetch...');
  // ipv6
  fetchData = await fetch(`${REACT_APP_ROUTE}${route}`, lePaquet)
    .catch(err => {isConnected = false; console.log('echec envoi IpV6')});
  if (!isConnected) {
    isConnected = true;
    // ipv4
    fetchData = await fetch(`${LOCAL_APP_ROUTE2}${route}`, lePaquet)
    .catch( err => {(isConnected = false); console.log('echec envoi IpV4')});
  }
  let jData = {};
  if (isConnected) {
    console.log('Fetch reponse ok...')
    jData = await fetchData.json();}
    jData = jData.map(marker=>{return {...marker}})
  callback({isConnected, jData});
}
