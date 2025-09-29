import Geolocation from 'react-native-geolocation-service';
import { ConstantesContext } from '../context/constantesContext';
import fetcher from './fetcher';

async function getMarkerExt(coords, callback) {
  console.log('getMarkerExt');
  try {
    await fetcher({
      route: 'findAllMarkers&Acces',
      method: 'POST',
      data: { ...coords },
      callback2: (e) => {
        console.log('reponse du fetch : ' + JSON.stringify(e));
        if (e.isConnected) {
          callback(e.jData);
        }
      },
    });
  } catch (error) {
    console.error('Erreur getMarkerExt:', error);
  }
}

async function getPosition() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}

async function sendToBase(adresse, code, accesType, constantes, setConstantes, setDataToFetch) {
  console.log('geolock.sendToBase()');
  const { coordonates } = constantes;
  if (!code) {
    alert('vous devez entrer un code!');
    return;
  }
  try {
    await setDataToFetch({
      route: 'create',
      method: 'POST',
      data: {
        adresse: adresse,
        latitude: coordonates.latitude,
        longitude: coordonates.longitude,
        acces: [{ type: accesType, code }],
      },
      callback: (e) => {
        if (e.isConnected) {
          getMarkerExt(coordonates, (markers) => {
            setConstantes({
              ...constantes,
              showModal: false,
              spinner: false,
              isConnected: e.isConnected,
              markers: markers,
            });
          });
        }
      },
    });
  } catch (error) {
    console.error('Erreur sendToBase:', error);
    setConstantes({ ...constantes, spinner: false });
  }
}

function objectComparator(source, alter) {
  const newMarker = {};
  const newAcces = [];
  const updatedAcces = [];
  const deletedAcces = [];

  if (typeof source === 'object' && typeof alter === 'object') {
    if (source.adresse.trim() !== alter.adresse.trim()) {
      newMarker.id = source.id;
      newMarker.adresse = alter.adresse;
    }

    alter.accesList.map((acces2) => {
      if ('identifier' in acces2) {
        switch (acces2.identifier) {
          case 0:
            deletedAcces.push({ ...acces2 });
            break;
          case 1:
            newAcces.push({ ...acces2 });
            break;
          case 2:
            updatedAcces.push({ ...acces2 });
            break;
          default:
            break;
        }
      }
    });
    return { newMarker, newAcces, updatedAcces, deletedAcces };
  }
}

export { getPosition, getMarkerExt, sendToBase, objectComparator };
