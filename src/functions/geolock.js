import Geolocation from 'react-native-geolocation-service';

export default geolock = {
  getPosition: callback => {
    Geolocation.getCurrentPosition(
      ({coords}) => callback(coords),
      error => console.log('errors: ', error.code, error.message));},

  getMarker: (
    coords,
    showModal,
    setDataToFetch,
    setMarkerList,
    setSpinner,
    setIsConnected,) => {
    if (showModal == false) {
      setDataToFetch({
        route: 'findAllMarkers&Acces',
        method: 'POST',
        data: coords,
        callback: e => {
          console.log('e : ' + JSON.stringify(e));
          if (e.isConnected) setMarkerList(e.jData);
          setSpinner(false);
          setIsConnected(e.isConnected);},});}},

  showModalSwitcher: (setMarkerList, setCoordonates, setShowModal) => {
    setMarkerList([]);
    geolock.getPosition(coords => setCoordonates(coords));
    setShowModal(true);},

  hideModalSwitcher: (setMarkerList, setShowModal) => {
    setMarkerList([]);
    setShowModal(false);},

  sendToBase: (
    adresse,
    code,
    accesType,
    markerCoordonates,
    coordonates,
    setDataToFetch,
    setShowModal,) => {
    if (!code) return alert('vous devez entrer un code!');
    setDataToFetch({
      route: 'create',
      method: 'POST',
      data: {
        adresse: adresse,
        latitude: markerCoordonates.latitude || coordonates.latitude,
        longitude: markerCoordonates.longitude || coordonates.longitude,
        acces: [{type: accesType, code}],},
      callback: setShowModal(false),});
    },

  requestLocationPermission: (agrement, setCoordonates, setPositionAcces) => {
    if (agrement) {
      geolock.getPosition(coords => {
        setCoordonates(coords);
        setPositionAcces(agrement);});}},};
