import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission';
import {FAB} from 'react-native-paper';
import fetcher from './src/functions/fetcher';
import AddMarkerModal from './src/components/AddMarkerModal';
import InfoMarkerModal from './src/components/InfoMarkerModal';
import geolock from './src/functions/geolock';
import MarkerManager from './src/components/MarkerManager';
// ################## les Constantes:
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default app = () => {
  console.log('******************  STARTER  **********************')

  // ################ Stats:

  const [constantes, setConstantes] = useState({
    positionAcces:false,
    coordonates:{
      longitude:2.347079571336508,
      latitude:48.855188003520624,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,},
    markerList:[],
    showModal:false,
    spinner:true,
    isConnected:true,})

  const [dataToFetch, setDataToFetch] = useState({}); // données a transmettre à l'api
  const [focusedMarker, setFocusedMarker] = useState({adresse:'',id:-1, accesList:[]})
  useEffect(()=>{ //composantDidMount
    console.log('=======================> useEffect [] <=======================')
    requestLocationPermission().then(agrement=>{
      console.log('agrement: '+agrement)
      geolock.getPosition({ ...constantes }, setConstantes, setDataToFetch);
      console.log('=======================> FIN useEffect [] <=======================')})},[])

  useEffect(() => {
    console.log('=======================> useEffect [dataToFetch] <=======================')
    if (Object.keys(dataToFetch).length) {
      setConstantes({...constantes, spinner:true, isConnected:false,});
      fetcher(dataToFetch);} 
    console.log('=======================> FIN useEffect [dataToFetch] <=======================')}, [dataToFetch]);

  // ###################### les Fonctions:

  const getMarker = info => {
    geolock.getMarker({...constantes, coordonates:{...info}},setConstantes,setDataToFetch,)};

  const showModalSwitcher = () => {
    setFocusedMarker({adresse:'',id:-1, accesList:[]})
    setConstantes({...constantes, showModal:true,})};

  const hideModalSwitcher = () => {
    Keyboard.dismiss();
    geolock.getMarker({...constantes, showModal:false},setConstantes,setDataToFetch,);};

  const sendToBase = (e) => {
    geolock.sendToBase(
      adresse = e.adresse,
      code = e.code,
      accesType = e.accesType,
      constantes, setConstantes, setDataToFetch,);}

  //##################### RENDER:
  if (constantes.positionAcces) {
    console.log('===========> PART II <===============');
    console.log('coordonates de MapView: '+JSON.stringify(constantes.coordonates))
    console.log('selected marker id : '+focusedMarker.id)
    const {latitude, longitude} = constantes.coordonates;
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={30} behavior={'height'} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={()=>{
          Keyboard.dismiss;
          if(focusedMarker.id!=-1) setFocusedMarker({adresse:'',id:-1, accesList:[]})}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: focusedMarker.accesList.length>0?0:1,}}>
              <InfoMarkerModal markerInfo = {{...focusedMarker}}/></View>
            <View style={{flex: 1000,}}>
              <MapView
                customMapStyle={mapStyle}
                showsCompass={false}
                onRegionChangeComplete={info =>{
                  setConstantes({...constantes, markerList:[]})
                  getMarker(info)}}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
                style={{flex:1}}
                loadingEnabled
                initialRegion={constantes.coordonates}>
                <MarkerManager constantes={constantes} focusedMarker={focusedMarker} setFocusedMarker={setFocusedMarker} setConstantes={setConstantes} getMarker={getMarker}/></MapView>
              <FAB
                icon={constantes.showModal ? 'minus' : 'plus'}
                style={styles.fab}
                onPress={constantes.showModal ? hideModalSwitcher : showModalSwitcher}/>

              <FAB
                loading={constantes.spinner}
                small
                icon="access-point-network-off"
                style={styles.networkIcon}
                onPress={() => {}}
                visible={!constantes.isConnected}/></View>
            <View style={{flex: constantes.showModal?0:1,}}>
              <AddMarkerModal
                showModal = {constantes.showModal}
                hideModalSwitcher = {hideModalSwitcher}
                sendToBase={(e)=>sendToBase(e)}/></View></View></TouchableWithoutFeedback></KeyboardAvoidingView>);}
    else {
      console.log('===========> PART I <===============');
      return <View style={{flex: 1, flexDirection: 'column'}}>
        <FAB
          loading={constantes.spinner}
          small
          icon="access-point-network-off"
          style={styles.networkIcon}/></View>}
};

// ##################### Styles:
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width,
    flex: 0,
  },

  map: {...StyleSheet.absoluteFillObject},
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  map2: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 370,
    height: 250,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  networkIcon: {
    position: 'absolute',
    margin: 16,
    right: 300,
    bottom: 680,
  },
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
