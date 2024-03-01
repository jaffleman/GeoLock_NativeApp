import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Keyboard,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  requireNativeComponent,
} from 'react-native';

import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission';
import {Button, FAB, Modal} from 'react-native-paper';
import fetcher from './src/functions/fetcher';
import AddMarkerModal from './src/components/AddMarkerModal';
import geolock from './src/functions/geolock';
import MarkerManager from './src/components/MarkerManager';
// ################## les Constantes:
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default app = () => {
  //console.log('STARTER')

  // ################ Stats:

  const [constantes, setConstantes] = useState({
    positionAcces:false,
    coordonates:{
      speed: 0.08591323345899582,
      heading: 0,
      altitude: 90.20000457763672,
      accuracy: 13.402999877929688,
      longitude: 3.3952627,
      altitudeAccuracy: 1,
      latitude: 48.758611},
    markerList:[],
    showModal:false,
    spinner:false,
    isConnected:true,
  })

  const [positionAcces, setPositionAcces] = useState(false); // indique si l'utilisateur a donné acces a sa position

  // MapView stats
  // const [coordonates, setCoordonates] = useState(); // coordonnées gps de l'utilisateur

  // Marker stats
  // const [markerList, setMarkerList] = useState([]); // Listes des markers retournés par l'api
  // const [markerCoordonates, setMarkerCoordonates] = useState({
  //   longitude: null,
  //   latitude: null,
  // });

  const [dataToFetch, setDataToFetch] = useState({}); // données a transmettre à l'api

  // Modal stats
  // const [showModal, setShowModal] = useState(false);

  // const [accesTab, setAccesTab] = useState([]);
  // const [spinner, setSpinner] = useState(false);
  // const [isConnected, setIsConnected] = useState(false);

  // ############### variables simples:

  //################ ComponentDidMount:
  // au chargement de l'application, vérifie l'acces à la géoloc puis récupère la position gps.
  // useEffect(() => {
  //   console.log('===============> useEffect I <================')
  //   requestLocationPermission(agrement => {
  //     if (agrement) {
  //       geolock.getPosition(coords => {
  //         setCoordonates(coords);
  //         setPositionAcces(agrement);
  //         getMarker();
  //       });
  //     }
  //   });
  // }, []);

  //Envoi des demandes a l'api
  useEffect(() => {
    console.log('===============> useEffect II : dataToFetch <================')
    const dataLength = Object.keys(dataToFetch).length;
    console.log(dataLength)
    if (dataLength) {
      console.log('useEffect II data to fetch:', JSON.stringify(dataToFetch), '++++++++++++++++++++++++')
      setConstantes({...constantes, spinner:true, isConnected:false,})
      fetcher(dataToFetch);
    }
  }, [dataToFetch]);

  // ###################### les Fonctions:

  const getMarker = (info) =>{
    geolock.getMarker(
      info,
      constantes,
      setConstantes,
      setDataToFetch,
    );}

  const showModalSwitcher = () => {
    geolock.showModalSwitcher(
      constantes,
      setConstantes,
    );
  };

  const hideModalSwitcher = () => {
    geolock.hideModalSwitcher(      constantes,
      setConstantes,);
      setTimeout(() => {
        getMarker();
      }, 4000);
  };

  const sendToBase = (e) => {
    console.log('le code est :  ' +  JSON.stringify(e))
    console.log('coordonates: '+ coordonates)
    geolock.sendToBase(
      adresse= e.adresse,
      code=e.code,
      accesType=e.accesType,
      constantes,
      setConstantes,
      setDataToFetch,
    );
  }

  //##################### RENDER:
  if (constantes.positionAcces) {
    console.log('===========> PART I <===============');
    console.log('markerList: '+ JSON.stringify(constantes.markerList))
    const {latitude, longitude} = constantes.coordonates;
    return (
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{
                flex: constantes.showModal ? 2 : 1000,
              }}>
              <MapView
                showsCompass={false}
                //onMapReady={getMarker}
                onRegionChangeComplete={info => getMarker(info)}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
                style={{flex:1}}
                loadingEnabled
                // onUserLocationChange={info => {
                //   getMarker(info)}}
                // onRegionChange={info => {
                //   getMarker(info);
                // }}
                followsUserLocation={true}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                <MarkerManager
                  constantes={constantes}
                />
              </MapView>
              <FAB
                icon={constantes.showModal ? 'minus' : 'plus'}
                style={styles.fab}
                onPress={constantes.showModal ? hideModalSwitcher : showModalSwitcher}
                //visible={!showModal}
              />

              <FAB
                loading={constantes.spinner}
                small
                icon="access-point-network-off"
                style={styles.networkIcon}
                onPress={() => {}}
                visible={!constantes.isConnected}
              />
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <AddMarkerModal
                sendToBase={(e)=>sendToBase(e)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  } else {
    console.log('===========> PART II <===============');
    requestLocationPermission(agrement => {
      console.log('on n a pas encore l agrement')
      if (agrement) {
        setConstantes({...constantes, positionAcces:true})
         geolock.getPosition(constantes,setConstantes,setDataToFetch);
        
      }
    });
    return (
      <Button
        title="authorisation"
        onPress={() => {
          requestLocationPermission(agrement => {
            setPositionAcces(agrement);
          });
        }}>
        demander authorisation
      </Button>
    );
  }
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
