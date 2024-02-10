import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission';
import {Button, FAB, Modal} from 'react-native-paper';
import fetcher from './src/functions/fetcher';
import AddMarkerModal from './src/components/AddMarkerModal';

// ################## les Constantes:
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default app = () => {
  //console.log('STARTER')

  // ################ Stats:
  const [positionAcces, setPositionAcces] = useState(false);
  const [markerList, setMarkerList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [coordonates, setCoordonates] = useState();
  const [markerCoordonates, setMarkerCoordonates] = useState({
    longitude: null,
    latitude: null,
  });
  const [accesTab, setAccesTab] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [dataToFetch, setDataToFetch] = useState({});

  // ############### variables simples:
  let code, accesType;

  //################ ComponentDidMount:
  // au chargement de l'application, vérifie l'acces à la géoloc puis récupère la position gps.
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

  //Envoi des demandes a l'api
  useEffect(() => {
    if (Object.keys(dataToFetch).length) {
      setSpinner(true);
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
      route: 'findAllMarkers&Acces',
      method: 'POST',
      data: coords,
      callback: e => {
        setMarkerList(e);
        setSpinner(false);
      },
    });
  }

  // function getAcces(id) {
  //   setDataToFetch({
  //     route: 'getAllAcces',
  //     method: 'POST',
  //     data: {id: id},
  //     callback: e => {
  //       setAccesTab(e);
  //       // console.log(e);
  //       return e;
  //     },
  //   });
  // }

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

  // function getDescMessage(accesList) {
  //   accesList.map(acces => (
  //     <Text> message + acces.type + {' => '} + acces.code </Text>
  //   ));
  // }

  //##################### RENDER:
  if (positionAcces) {
    const {latitude, longitude} = coordonates;
    return (
      <View style={styles.container}>
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
          {markerList.map(marker => {
            return (
              <Marker
                draggable={false}
                key={marker.id}
                coordinate={{
                  longitude: marker.longitude,
                  latitude: marker.latitude,
                }}
                pinColor={'darkturquoise'}>
                <Callout
                  style={{
                    backgroundColor: '#ffffff',
                    maxWidth: 500,
                    mawheight: 200,
                  }}>
                  <View style={{borderRadius: 10}}>
                    <View
                      style={{
                        margin: 0,
                        padding: 0,
                        backgroundColor: 'bisque',
                      }}>
                      <Text
                        style={{
                          margin: 0,
                          fontWeight: 'bold',
                        }}>
                        {marker.adresse}
                      </Text>
                    </View>
                    {marker.accesList.map((acces, i) => (
                      <Text key={acces.mk * 10 + i}>
                        {acces.type + ' => ' + acces.code}
                      </Text>
                    ))}
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <FAB icon="plus" style={styles.fab} onPress={() => modalSwitcher()} />
        <Modal
          visible={showModal}
          onDismiss={modalSwitcher}
          style={{justifyContent: 'flex-start'}}
          contentContainerStyle={{
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <AddMarkerModal
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
        </Modal>
      </View>
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
    ...StyleSheet.absoluteFillObject,
    height: height - 35,
    width,
    alignItems: 'center',
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
});
