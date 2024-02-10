import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  Platform,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission';
import {Button, FAB, Modal} from 'react-native-paper';
import fetcher from './src/functions/fetcher';
import AddMarkerModal from './src/components/AddMarkerModal';
import {grey100} from 'react-native-paper/lib/typescript/styles/colors';

// ################## les Constantes:
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default app = () => {
  //console.log('STARTER')

  // ################ Stats:

  const [positionAcces, setPositionAcces] = useState(false); // indique si l'utilisateur a donné acces a sa position

  // MapView stats
  const [coordonates, setCoordonates] = useState(); // coordonnées gps de l'utilisateur

  // Marker stats
  const [markerList, setMarkerList] = useState([]); // Listes des markers retournés par l'api
  const [markerCoordonates, setMarkerCoordonates] = useState({
    longitude: null,
    latitude: null,
  });

  const [dataToFetch, setDataToFetch] = useState({}); // données a transmettre à l'api

  // Modal stats
  const [showModal, setShowModal] = useState(false);

  // const [accesTab, setAccesTab] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // ############### variables simples:
  let code, accesType;

  //################ ComponentDidMount:
  useEffect(() => {
    requestLocationPermission(agrement => {
      if (agrement) {
        getPosition(coords => {
          setCoordonates(coords);
          setPositionAcces(agrement);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (Object.keys(dataToFetch).length) {
      setSpinner(true);
      setIsConnected(false);
      fetcher(dataToFetch);
    }
  }, [dataToFetch]);

  // ###################### les Fonctions:
  function getPosition(callback) {
    Geolocation.getCurrentPosition(
      ({coords}) => callback(coords),
      error => console.log('errors: ', error.code, error.message),
    );
  }

  function getMarker(coords = coordonates) {
    setDataToFetch({
      route: 'findAllMarker',
      method: 'POST',
      data: coords,
      callback: e => {
        if (e.isConnected) setMarkerList(e.jData);
        setSpinner(false);
        setIsConnected(e.isConnected);
      },
    });
  }

  function getAcces(id) {
    setDataToFetch({
      route: 'getAllAcces',
      method: 'POST',
      data: {id: id},
      callback: e => {
        setAccesTab(e);
      },
    });
  }

  function modalSwitcher() {
    getPosition(coords => {
      setCoordonates(coords);
      setShowModal(!showModal);
    });
  }

  function sendToBase() {
    if (!code) return alert('vous devez entrer un code!');
    const body = {
      latitude: markerCoordonates.latitude || coordonates.latitude,
      longitude: markerCoordonates.longitude || coordonates.longitude,
      acces: [{type: accesType, code: code}],
    };
    setDataToFetch({
      route: 'create',
      method: 'POST',
      data: body,
      callback: setShowModal(false),
    });
  }

  //##################### RENDER:
  if (positionAcces) {
    const {latitude, longitude} = coordonates;
    return (
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{
                flex: showModal ? 2 : 1000,
                left: 0,
                right: 0,
                top: 0,
                //...styles.container,
                //height: showModal ? height - 280 : height - 35,
              }}>
              <MapView
                showsCompass={true}
                showsScale={true}
                onMapReady={getMarker}
                onRegionChangeComplete={getMarker}
                followsUserLocation={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                {markerList.map(marker => (
                  <Marker
                    draggable={false}
                    title={marker.adresse}
                    onPress={() => getAcces(marker.id)}
                    key={marker.id}
                    coordinate={{
                      longitude: marker.longitude,
                      latitude: marker.latitude,
                    }}
                    pinColor={'red'}
                  />
                ))}
              </MapView>
              <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => modalSwitcher()}
                visible={!showModal}
              />
              <FAB
                icon="minus"
                style={styles.fab}
                onPress={() => modalSwitcher()}
                visible={showModal}
              />
              <FAB
                loading={spinner}
                small
                icon="access-point-network-off"
                style={styles.networkIcon}
                onPress={() => {}}
                visible={!isConnected}
              />
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <AddMarkerModal
                // styles={styles.container}
                latitude={latitude}
                longitude={longitude}
                latitudeDelta={LATITUDE_DELTA}
                longitudeDelta={LONGITUDE_DELTA}
                coordonates={coordonates}
                setMarkerCoordonates={setMarkerCoordonates}
                accesType={accesType}
                code={code}
                modalswitcher={modalSwitcher}
                sendToBase={() => sendToBase()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  } else {
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
