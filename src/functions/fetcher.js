import {LOCAL_APP_ROUTE2} from '@env';
import {REACT_APP_ROUTE} from '@env';

export default async function fetcher(
  {route, method, data, callback = (e) => {console.log('Default callback provided');}},
  logMargin = '',
) {
  console.log('**** FETCH ****');
  const controleurIpv4 = new AbortController();
  const controleurIpv6 = new AbortController();
  const signal4 = controleurIpv4.signal;
  const signal6 = controleurIpv6.signal;
  

  let erroCounter = 0;
  const abort = setTimeout(() => {
    controleurIpv4.abort('over time');
    controleurIpv6.abort('over time');
    console.log('>>>>>>>>ABORT BY SETTIMEOUT<<<<<<<<');
    callback(false);
  }, 10000);

  const bothRequestError = () => {
    erroCounter++;
    if (erroCounter > 1) {
      console.log('>>>>>>>>ABORT BY bothRequestError()<<<<<<<<');
      clearTimeout(abort);
      callback(false);
    }
  };

  const lePaquet = {
    method,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  };

  // ipv6
  console.log(logMargin + ' Envoie du Fetch ipv6: ' + route);
  console.log(logMargin + ' ipv6 REACT_APP_ROUTE: ' + REACT_APP_ROUTE);
  fetch(`${REACT_APP_ROUTE}${route}`, {...lePaquet, signal: signal6})
    .then(result => {
      console.log("result=", result); return result.json();
    })
    .then(resultData => {
      console.log("resultData=", resultData);
      controleurIpv4.abort('ipv6 request completed');
      clearTimeout(abort);
      console.log('**** FIN DU FETCH IPV6****');
      callback(resultData);
    })
    .catch(err => {
      console.log(logMargin + ' echec envoi IpV6 => ' + err);
      if ('TypeError: Network request failed'.localeCompare(err) == 0)
        bothRequestError();
    });

  // ipv4
  console.log(logMargin + ' Envoie du Fetch ipv4: ' + route);
  console.log(logMargin + ' ipv4 LOCAL_APP_ROUTE2: ' + LOCAL_APP_ROUTE2);
  fetch(`${LOCAL_APP_ROUTE2}${route}`, {...lePaquet, signal: signal4})
    .then(result => result.json())
    .then(resultData => {
      controleurIpv6.abort('ipv4 request completed');
      clearTimeout(abort);
      console.log('**** FIN DU FETCH IPV4****');
      callback(resultData);
    })
    .catch(err => {
      console.log(logMargin + ' echec envoi IpV4 => ' + err);
      if ('TypeError: Network request failed'.localeCompare(err) == 0)
        bothRequestError();
    });
}
