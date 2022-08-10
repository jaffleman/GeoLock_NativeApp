import React, {useEffect, useRef, useState} from 'react';
import {  StyleSheet, View, Text, Dimensions} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView,  { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission'
import { Button, FAB, Modal, TextInput, Portal } from 'react-native-paper';
import { fetcher } from './src/functions/fetcher';
import AddMarkerModal from './src/components/AddMarkerModal';

// ################## les Constantes:
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default app=() => {
  console.log('STARTER')

  // ################ Stats:
  const [markerList, setMarkerList] = useState([])
  const [showModal,setShowModal] = useState(false)
  const [coordonates, setCoordonates]= useState({"permission":false})
  const [markerCoordonates, setMarkerCoordonates] = useState({longitude:null,latitude:null})
  const [accesTab, setAccesTab] = useState([])
  const [spinner, setSpinner] = useState(false)

  // ############### variables simples:
  let code, accesType

  //################ ComponentDidMount: 
  useEffect(()=>{
    console.log('USE-EFFECT')
    requestLocationPermission((permission)=>{
      if(permission){
        getPosition((coords)=>{
          setCoordonates({
            ...coords,
            permission: true
          })
          findMarker(coords)
        })
      }
    })
  },[])

  // ###################### les Fonctions:

  function getPosition(callback) {
    Geolocation.getCurrentPosition(
      ({coords})=>callback(coords),
      error=>console.log("errors: ", error.code, error.message)
    )
  }

  function getAcces(id) {fetcher('getAllAcces', 'POST', {"id":id}, (e)=>setAccesTab(e) )}

  function modalswitcher(){
    getPosition(coords=> setCoordonates({...coords, permission: true}))
    setShowModal(!showModal)
  }

  function findMarker({longitude,latitude}) {
    const body = {"latitude":latitude, "longitude":longitude, "acces":[{"type": accesType,"code": code}]}
    fetcher('findAllMarker', 'POST', body, (e)=>setMarkerList(e))
  }

  function sendToBase() {
    const body = {
      "latitude":markerCoordonates.latitude||coordonates.latitude,
      "longitude":markerCoordonates.longitude||coordonates.longitude,
      "acces":[{"type": accesType,"code": code}]
    }
    fetcher('create', 'POST', body, setShowModal(false) )
  }

  //##################### RENDER:
  if(coordonates.permission){
    const {latitude,longitude}=coordonates
    return <View style={styles.container}>
      <MapView
        followsUserLocation={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {
          markerList.map((marker) => <Marker
            draggable={false}
            title={'Marker'}
            // description={`CODE: `}
            onPress={()=>getAcces(marker.id)}
            key={marker.id}
            coordinate={{longitude:marker.longitude, latitude:marker.latitude}}
            pinColor={'red'} 
          />)
        }
      </MapView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={modalswitcher}
      />
      <Modal visible={showModal} onDismiss={modalswitcher} style={{justifyContent:'flex-start'}}
        contentContainerStyle={{
            marginLeft:'auto',
            marginRight:'auto',
            backgroundColor:'white', 
            borderRadius:10,
        }} 
      >   
        <AddMarkerModal 
          showModal={showModal}
          latitude={latitude}
          longitude={longitude}
          latitudeDelta={LATITUDE_DELTA}
          longitudeDelta={LONGITUDE_DELTA}
          coordonates={coordonates}
          setMarkerCoordonates={()=>setMarkerCoordonates()}
          accesType={accesType}
          code={code}
          modalswitcher={modalswitcher}
          sendToBase={()=>sendToBase()}       
        /> 
      </Modal>
    </View>    
  }else {
    return(
      <Button title='authorisation' 
        onPress={()=>{requestLocationPermission((permission)=>{setCoordonates({"permission":permission})})}}
        >demander authorisation
      </Button>
    )
  }
}

// ##################### Styles:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height:height-35,
    width,
    alignItems: 'center',
  },

  map: {...StyleSheet.absoluteFillObject},
  centeredView: {
    backgroundColor:'rgba(0,0,0,0.75)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  map2: {
    marginLeft:'auto',
    marginRight:'auto',
    width:370,
    height:250,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
});






