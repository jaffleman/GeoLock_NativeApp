import React from "react";
import {  StyleSheet, View, Text, Dimensions} from 'react-native';
import { Button, Modal, TextInput, } from 'react-native-paper';
import MapView,  { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps



export default function AddMarkerModal({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    coordonates,
    setMarkerCoordonates,
    accesType,
    code,
    modalswitcher,
    sendToBase,            

}) {
    return <>
    <Text selectable={false} style={{ color:'#6200ee', fontWeight:'500', fontSize:15, textAlign:'center', margin:10, borderBottomColor:'#a9a9a9', borderBottomWidth:1, margin:0, padding:7}}>AJOUTER UN CODE D'ACCES</Text>
    <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map2}
        initialRegion={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
        }}
    >
    <Marker
        draggable
        title={`${accesType}: ${code}`}
        //description={`coordonates { ${markerCoordonates.latitude}, ${markerCoordonates.longitude} }`}
        key={1}
        coordinate={coordonates}
        pinColor={'red'} 
        onDragEnd={e=>setMarkerCoordonates(e.nativeEvent.coordinate)}
    ></Marker>
    </MapView>
    <TextInput
        style={{width:370, marginLeft:'auto', marginRight:'auto'}}
        autoCapitalize
        placeholder='Hall, portail, ascenseur, escalier...'
        label="Type d'acces"
        left={<TextInput.Icon name="boom-gate"/>}
        onChangeText={(e)=>accesType=e}
    />
    <TextInput
        autoCapitalize='characters'
        style={{width:370, marginLeft:'auto', marginRight:'auto'}}
        label="CODE"
        left={<TextInput.Icon name="lock" />}
        onChangeText={(e)=>code=e}
    />
    <View style={{flexDirection:'row'}}>
        <Button mode='containedtext' style={{flex:1, }} onPress={modalswitcher}>Annuler</Button>
        <Button mode='containedtext' style={{flex:1, }} onPress={sendToBase}>Enregistrer</Button>
    </View></>
}

// ##################### Styles:
const styles = StyleSheet.create({
     map2: {
      marginLeft:'auto',
      marginRight:'auto',
      width:370,
      height:250,
    },
  });