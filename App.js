import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission';
import {FAB,} from 'react-native-paper';
import fetcher from './src/functions/fetcher';
import AddMarkerModal from './src/components/AddMarkerModal';
import InfoMarkerModal from './src/components/InfoMarkerModal';
import geolock from './src/functions/geolock';
import Markers from './src/components/Markers';




// ################## les Constantes:
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0020;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;









export default app = () => {
  console.log('******************  STARTER  **********************')
  
  
  // ################ Stats:
  const [constantes, setConstantes] = useState({
    // showMarkerAdresseEdit:false, // define whether the marker adresse must be editable
    positionAcces:false, //
    coordonates:{ // coordonate of the user on the map
      longitude:2.347079571336508,
      latitude:48.855188003520624,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,},
    markerList:[], // list of the markers sended from the api
    showModal:false, // define whether the marker creator must be show
    spinner:true, // whether to show the spinner
    isConnected:true,
    selectedMarker:{id:0, adresse:'', accesList:[]}}) // the marker info which as been selected by the user
  // const [poped, setPoped] = useState({id:0})
  const [dataToFetch, setDataToFetch] = useState({}); // données a transmettre à l'api
  // const [focusedMarker, setFocusedMarker] = useState({adresse:'',id:-1, accesList:[], showInfo:true})
  const [localMarkerList, setLocalMarkerList] = useState([])



  useEffect(()=>{ //composantDidMount
    console.log('=============> composantDidMount')
    requestLocationPermission().then(agrement=>{
      console.log('=============> agrement: '+agrement)
      geolock.getPosition({ ...constantes }, setConstantes, setDataToFetch,'=============>');
      console.log('=============> FIN composantDidMount')})},[])

  useEffect(() => {
    console.log('=============>=============> useEffect [dataToFetch] ')
    if (Object.keys(dataToFetch).length) {
      setConstantes({...constantes, spinner:true, isConnected:false,});
      fetcher(dataToFetch, '=============>=============>');} 
    console.log('=============>=============> FIN useEffect [dataToFetch] ')}, [dataToFetch] );
    

  // ###################### les Fonctions:


  const getMarker = (info, logMargin='') => {
    geolock.getMarker({...constantes, showMarkerAdresseEdit:false, coordonates:{...info}},setConstantes,setDataToFetch,logMargin)};
  const showModalSwitcher = () => {
    // setFocusedMarker({adresse:'',id:-1, accesList:[]})
    setConstantes({...constantes, showModal:true, showMarkerAdresseEdit:false})};
  const hideModalSwitcher = () => {
    Keyboard.dismiss();
    // geolock.getMarker({...constantes, showModal:false},setConstantes,setDataToFetch,);
    setConstantes({...constantes, showModal:false})};
  const sendToBase = (e) => {
    setConstantes({...constantes, spinner:true});
    geolock.sendToBase(
      adresse = e.adresse,
      code = e.code,
      accesType = e.accesType,
      constantes, setConstantes, setDataToFetch,);}
  const touchebleWithoutFeedbackOnPressHandle = ()=>{
    const showInfoMarker = constantes.selectedMarker.id == 0 ? false : true;
    Keyboard.dismiss;
    if(showInfoMarker) {
      setLocalMarkerList([])
      setConstantes({...constantes, selectedMarker: {id:0, adresse:'', accesList:[]}, showMarkerAdresseEdit : false})};}

      
  //##################### RENDER:
  if (constantes.positionAcces) {
    console.log('PART II');
    console.log('coordonates de MapView: '+JSON.stringify(constantes.coordonates))
    console.log('selected marker id : '+constantes.selectedMarker.id)
    const showInfoMarker = constantes.selectedMarker.id == 0 ? false : true;
    console.log('must show marker info  & acces: '+showInfoMarker)
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={30} behavior={'height'} style={{flex: 1}}>
        {<View  style={{position:'absolute', display:showInfoMarker?'flex':'none', top:0, left:0, right:0, zIndex:100}}>
          <InfoMarkerModal 
            setDataToFetch = {setDataToFetch} 
            setConstantes = {setConstantes} 
            constantes = {constantes}
            getMarker = {getMarker}/></View>}
        <TouchableWithoutFeedback onPress={()=>touchebleWithoutFeedbackOnPressHandle()}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1000,}}>
              <MapView
                customMapStyle={mapStyle}
                showsCompass={false}
                  // onUserLocationChange={info =>getMarker(info.nativeEvent.coordinate)}
                onRegionChangeComplete={info =>{if(!showInfoMarker)getMarker(info)}}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
                style={{flex:1}}
                loadingEnabled
                initialRegion={constantes.coordonates}>
                  <Markers 
                    constantes={constantes} 
                    setConstantes={setConstantes}
                    getMarker={getMarker}/></MapView>
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
                sendToBase={(e)=>sendToBase(e)}
                hideModalSwitcher = {hideModalSwitcher}/></View></View></TouchableWithoutFeedback></KeyboardAvoidingView>);}
    else {
      console.log('PART I');
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
    right: 0,
    bottom: 0,
    backgroundColor: '#1100ee'
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
