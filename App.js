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




// ################## les Constantes:
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0020;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;









export default app = () => {
  console.log('******************  STARTER  **********************')
  
  
  // ################ Stats:
  const [constantes, setConstantes] = useState({
    focusedMarkerId:0,
    showMarkerAdresseEdit:false,
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
  const [poped, setPoped] = useState({id:0})
  const [dataToFetch, setDataToFetch] = useState({}); // données a transmettre à l'api
  // const [focusedMarker, setFocusedMarker] = useState({adresse:'',id:-1, accesList:[], showInfo:true})
  const [localMarkerList, setLocalMarkerList] = useState([])



  useEffect(()=>{ //composantDidMount
    console.log('=======================> composantDidMount <=======================')
    requestLocationPermission().then(agrement=>{
      console.log('agrement: '+agrement)
      geolock.getPosition({ ...constantes }, setConstantes, setDataToFetch);
      console.log('=======================> FIN composantDidMount <=======================')})},[])
  useEffect(() => {
    console.log('=======================> useEffect [dataToFetch] <=======================')
    if (Object.keys(dataToFetch).length) {
      setConstantes({...constantes, spinner:true, isConnected:false,});
      fetcher(dataToFetch);} 
    console.log('=======================> FIN useEffect [dataToFetch] <=======================')}, [dataToFetch] );
  useEffect(()=>{
    console.log('=======================> useEffect [constantes] <=======================')
    if (constantes.showModal) {
      return setLocalMarkerList([
        <Marker
          key={Math.floor(Math.random() * 1000)}
          onDragEnd={e=>getMarker({...constantes.coordonates, longitude:e.nativeEvent.coordinate.longitude, latitude:e.nativeEvent.coordinate.latitude, })}
          draggable={true}
          coordinate={{
            longitude: constantes.coordonates.longitude,
            latitude: constantes.coordonates.latitude,
          }}
          pinColor={'red'}/>])}
    else{
      const  myView = constantes.markerList.map((marker, index)=>{
        if (marker.id != constantes.focusedMarkerId) {
          return <Marker
            zIndex={-index}
            draggable={false}
            key={marker.id}
            coordinate={{
                longitude: marker.longitude,
                latitude: marker.latitude,}}
            onPress={()=>{
                const backupList = [...constantes.markerList]
                console.log('backup List before splice: '+ JSON.stringify(backupList))
                setPoped(backupList.splice(index,1)[0])
                console.log('poped: '+JSON.stringify(poped))
                console.log('backup List after splice: '+ JSON.stringify(backupList))
                setLocalMarkerList([])
                setConstantes({
                    ...constantes,
                    focusedMarkerId: marker.id,
                    markerInfo: {...poped},
                })}}
            pinColor='#1100ee'></Marker>}
        else if (marker.id == constantes.focusedMarkerId){
          console.log('focusedMarker: '+constantes.focusedMarkerId)
          return <Marker
            zIndex={10000}
            draggable={false}
            key={poped.id}
            coordinate={{
                longitude: poped.longitude,
                latitude: poped.latitude,}}
            onPress={()=>{}}
            pinColor='#9900ee'></Marker>}})
      return setLocalMarkerList(myView)}
  }, [constantes])





  // ###################### les Fonctions:
  const getMarker = info => {
    geolock.getMarker({...constantes, showMarkerAdresseEdit:false, coordonates:{...info}},setConstantes,setDataToFetch,)};
  const showModalSwitcher = () => {
    // setFocusedMarker({adresse:'',id:-1, accesList:[]})
    setConstantes({...constantes, showModal:true, focusedMarkerId : 0, showMarkerAdresseEdit:false})};
  const hideModalSwitcher = () => {
    Keyboard.dismiss();
    geolock.getMarker({...constantes, showModal:false},setConstantes,setDataToFetch,);};
  const sendToBase = (e) => {
    setConstantes({...constantes, spinner:true});
    geolock.sendToBase(
      adresse = e.adresse,
      code = e.code,
      accesType = e.accesType,
      constantes, setConstantes, setDataToFetch,);}
  const touchebleWithoutFeedbackOnPressHandle = ()=>{
    const showInfoMarker = constantes.focusedMarkerId == 0 ? false : true;
    Keyboard.dismiss;
    if(showInfoMarker) {
      setLocalMarkerList([])
      setConstantes({...constantes, focusedMarkerId : 0, showMarkerAdresseEdit : false})};}

      
  //##################### RENDER:
  if (constantes.positionAcces) {
    console.log('===========> PART II <===============');
    console.log('coordonates de MapView: '+JSON.stringify(constantes.coordonates))
    console.log('selected marker id : '+constantes.focusedMarkerId)
    const showInfoMarker = constantes.focusedMarkerId == 0 ? false : true;
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={30} behavior={'height'} style={{flex: 1}}>
        <View  style={{position:'absolute', display:showInfoMarker?'flex':'none', top:0, left:0, right:0, zIndex:100}}>
          <InfoMarkerModal setDataToFetch = {setDataToFetch} setConstantes = {setConstantes} constantes = {constantes}/></View>
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
                {localMarkerList}</MapView>
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
