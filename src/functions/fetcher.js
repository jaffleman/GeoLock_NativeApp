import {LOCAL_APP_ROUTE2} from '@env';
import {REACT_APP_ROUTE} from '@env';

export default async function fetcher({route, method, data, callback}) {
  const locUrl = `${LOCAL_APP_ROUTE2}${route}`;
  const extUrl = `${REACT_APP_ROUTE}${route}`;
  const body = JSON.stringify(data);
  console.log('body: ' + body, 'method: ' + method, 'url :' + locUrl);
  const lePaquet = {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  fetch(locUrl, lePaquet)
    .then(result => result.json())
    .then(json => {
      callback(json);
    })
    .catch(err => {
      fetch(extUrl, lePaquet)
        .then(result => result.json())
        .then(json => {
          callback(json);
        })
        .catch(err2 => {
          console.log('err2');
          return {err2};
        });
    });
}
