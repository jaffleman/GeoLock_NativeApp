import React, {useEffect, useRef, useState} from 'react';
import {  StyleSheet, View, Text, Dimensions} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView,  { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import requestLocationPermission from './src/requestLocationPermission'
import { Button, FAB, Modal, TextInput, Portal } from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default app=() => {
  console.log('STARTER')
  const [showModal,setShowModal] = useState(false)
  const [coordonates, setCoordonates]= useState({"permission":false})
  let code, accesType
  function getPosition(callback) {
    Geolocation.getCurrentPosition(({coords})=>{
      callback(coords)
    },
    (error)=>{
      console.log("errors: ", error.code, error.message)
    })
  }

  function modalswitcher(){
    setShowModal(!showModal)
  }
  useEffect(()=>{
    requestLocationPermission((permission)=>{
      if(permission){
        getPosition((coords)=>{
          setCoordonates({
            ...coords,
            permission: true
          })
        })
      }
    })
  },[])

  if(coordonates.permission){
    const {latitude,longitude}=coordonates
        return <View style={styles.container}>
          <MapView
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
          </MapView>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={modalswitcher}
          />
            <Portal>
          <Modal visible={showModal} onDismiss={modalswitcher} style={{
             height,
             width,
             position: 'absolute',
             top: 0,
             left: 0,
             justifyContent: 'center',
          } }
          contentContainerStyle={{
            top: 0,
            left: 0,
            backgroundColor:'white', 
            borderRadius:10,
            position: 'absolute',
            // justifyContent: 'center',
          }} >
              <Text style={{textAlign:'center', margin:10}}>le text de ma modale </Text>
              <TextInput
                style={{width:350, marginLeft:'auto', marginRight:'auto'}}
                autoCapitalize
                placeholder='Hall, portail, ascenseur, escalier...'
                label="Type d'acces"
                left={<TextInput.Icon name="boom-gate"/>}
                onChangeText={(e)=>accesType=e}
                
              />
              <TextInput
                autoCapitalize='characters'
                style={{width:350, marginLeft:'auto', marginRight:'auto'}}
                label="CODE"
                left={<TextInput.Icon name="lock" />}
                onChangeText={(e)=>code=e}
              />
              <Button mode='containedtext' onPress={modalswitcher}>close</Button>
              <Button mode='containedtext' onPress={()=>console.log(accesType,code)}>valide</Button>
          </Modal>
            </Portal>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
});
