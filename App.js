import React, {useContext, useEffect, useState} from 'react';
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
import ConstantesProvider, { ConstantesContext } from './src/context/constantesContext';
import CoordsProvider from './src/context/coordonatesContext';
import CustomMapView from './src/components/CustomMapView';
import Geolocation from 'react-native-geolocation-service';



// ################## les Constantes:
const initDimensions = Dimensions.get('window');
const {width} = initDimensions
let initialCoords = {longitude : 0, latitude : 0}
requestLocationPermission().then(agrement=>{
  console.log('agrement: '+agrement)
  if (agrement){
      Geolocation.getCurrentPosition(({coords}) => {
          console.log('getCurrentPosition(): coords: '+JSON.stringify(coords))
          initialCoords = {...coords}})}})








export default app = () => {
  console.log('******************  STARTER  **********************')
  
  
  // ################ Stats:
  // const [constantes, setConstantes] = useState({
  //   // showMarkerAdresseEdit:false, // define whether the marker adresse must be editable
  //   positionAcces:false, //
  //   coordonates:{ // coordonate of the user on the map
  //     longitude:2.347079571336508,
  //     latitude:48.855188003520624,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,},
  //   markerList:[], // list of the markers sended from the api
  //   showModal:false, // define whether the marker creator must be show
  //   spinner:true, // whether to show the spinner
  //   isConnected:true,
  //   selectedMarker:{id:0, adresse:'', accesList:[]}}) // the marker info which as been selected by the user
  // const [poped, setPoped] = useState({id:0})
  const [dataToFetch, setDataToFetch] = useState({}); // données a transmettre à l'api
  // const [focusedMarker, setFocusedMarker] = useState({adresse:'',id:-1, accesList:[], showInfo:true})
  const [localMarkerList, setLocalMarkerList] = useState([])



  // useEffect(()=>{ //composantDidMount
  //   console.log('=============> composantDidMount')
  //   requestLocationPermission().then(agrement=>{
  //     console.log('=============> agrement: '+agrement)
  //     geolock.getMarkers(setDataToFetch,'=============>');
  //     console.log('=============> FIN composantDidMount')})},[])

  // useEffect(() => {
  //   console.log('=============>=============> useEffect [dataToFetch] ')
  //   if (Object.keys(dataToFetch).length) {
  //     setConstantes({...constantes, spinner:true, isConnected:false,});
  //     fetcher(dataToFetch, '=============>=============>');} 
  //   console.log('=============>=============> FIN useEffect [dataToFetch] ')}, [dataToFetch] );
    

  console.log('// ###################### les Fonctions:')

// const {constantes} = useContext(ConstantesContext)
//   const getMarker = (info, logMargin='') => {
//     geolock.getMarker({...constantes, showMarkerAdresseEdit:false, coordonates:{...info}},setConstantes,setDataToFetch,logMargin)};
//   const showModalSwitcher = () => {
//     // setFocusedMarker({adresse:'',id:-1, accesList:[]})
//     setConstantes({...constantes, showModal:true, showMarkerAdresseEdit:false})};
//   const hideModalSwitcher = () => {
//     Keyboard.dismiss();
//     // geolock.getMarker({...constantes, showModal:false},setConstantes,setDataToFetch,);
//     setConstantes({...constantes, showModal:false})};
//   const sendToBase = (e) => {
//     setConstantes({...constantes, spinner:true});
//     geolock.sendToBase(
//       adresse = e.adresse,
//       code = e.code,
//       accesType = e.accesType,
//       constantes, setConstantes, setDataToFetch,);}
//   const touchebleWithoutFeedbackOnPressHandle = ()=>{
//     const showInfoMarker = constantes.selectedMarker.id == 0 ? false : true;
//     Keyboard.dismiss;
//     if(showInfoMarker) {
//       setLocalMarkerList([])
//       setConstantes({...constantes, selectedMarker: {id:0, adresse:'', accesList:[]}, showMarkerAdresseEdit : false})};}

      
//   //##################### RENDER:
//   if (constantes.positionAcces) {
//     console.log('PART II');
//     // console.log('coordonates de MapView: '+JSON.stringify(constantes.coordonates))
//     console.log('selected marker id : '+constantes.selectedMarker.id)
//     const showInfoMarker = constantes.selectedMarker.id == 0 ? false : true;
//     console.log('must show marker info  & acces: '+showInfoMarker)
    return (
      <CoordsProvider value={{initDimensions,initialCoords}}>
        <ConstantesProvider>
          <KeyboardAvoidingView keyboardVerticalOffset={30} behavior={'height'} style={{flex: 1}}>
            <InfoMarkerModal/>
            <CustomMapView/></KeyboardAvoidingView></ConstantesProvider></CoordsProvider>);
    // else {
    //   console.log('PART I');
    //   return <View style={{flex: 1, flexDirection: 'column'}}>
    //     <FAB
    //       loading={constantes.spinner}
    //       small
    //       icon="access-point-network-off"
    //       style={styles.networkIcon}/></View>}
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
