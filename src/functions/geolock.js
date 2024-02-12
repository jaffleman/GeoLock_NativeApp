import {LOCAL_APP_ROUTE2} from '@env';
import {REACT_APP_ROUTE} from '@env';
import Geolocation from 'react-native-geolocation-service';

export default geolock = {
  getPosition: callback => {
    Geolocation.getCurrentPosition(
      ({coords}) => callback(coords),
      error => console.log('errors: ', error.code, error.message),
    );
  },

  getMarker: (
    coords,
    showModal,
    setDataToFetch,
    setMarkerList,
    setSpinner,
    setIsConnected,
  ) => {
    if (!showModal) {
      setDataToFetch({
        route: 'findAllMarkers&Acces',
        method: 'POST',
        data: coords,
        callback: e => {
          if (e.isConnected) setMarkerList(e.jData);
          setSpinner(false);
          setIsConnected(e.isConnected);
        },
      });
    }
  },

  modalSwitcher: (setMarkerList, setCoordonates, setShowModal, showModal) => {
    geolock.getPosition(coords => {
      setMarkerList([]);
      setCoordonates(coords);
      setShowModal(!showModal);
    });
  },

  sendToBase: (
    code,
    markerCoordonates,
    coordonates,
    accesType,
    setDataToFetch,
    setShowModal,
  ) => {
    if (!code) return alert('vous devez entrer un code!');
    const body = {
      latitude: markerCoordonates.latitude || coordonates.latitude,
      longitude: markerCoordonates.longitude || coordonates.longitude,
      acces: [{type: accesType, code}],
    };
    setDataToFetch({
      route: 'create',
      method: 'POST',
      data: body,
      callback: setShowModal(false),
    });
  },

  requestLocationPermission: (agrement, setCoordonates, setPositionAcces) => {
    if (agrement) {
      geolock.getPosition(coords => {
        setCoordonates(coords);
        setPositionAcces(agrement);
      });
    }
  },
};
