import {LOCAL_APP_ROUTE2} from '@env';
import {REACT_APP_ROUTE} from '@env';

export default async function fetcher({route, method, data, callback}) {
  const lePaquet = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  var fetchData = {};
  var isConnected = true;
  console.log('Envoie du Fetch...');
  // ipv6
  fetchData = await fetch(`${REACT_APP_ROUTE}${route}`, lePaquet).catch(
    err => (isConnected = false),
  );

  if (!isConnected) {
    isConnected = true;
    // ipv6
    fetchData = await fetch(`${LOCAL_APP_ROUTE2}${route}`, lePaquet).catch(
      err => (isConnected = false),
    );
  }
  var jData = {};
  if (isConnected) {
    console.log('Fetch reponse ok...')
    jData = await fetchData.json();}
  callback({isConnected, jData});
}
