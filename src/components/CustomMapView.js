import React, { useContext, useState } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
  } from 'react-native';
import {FAB,} from 'react-native-paper';

import Markers from "./Markers";
import { CoordonatesContext } from "../context/coordonatesContext";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { ConstantesContext } from "../context/constantesContext";
const {width} = Dimensions.get('window');

export default CustomMapView = ()=>{
  const {constantes, 
    deselectMarker, 
    showCreateMarkerModale,
    hideCreateMarkerModale} = useContext(ConstantesContext)
    const {coords, saveCoords} = useContext(CoordonatesContext)
    console.log('**************CustomMapView')
    const [customCoords, setCustomCoords]  = useState({...coords})
    console.log('CustomMapView:user coords on map: '+JSON.stringify(coords))
    const handleRegionChange = (info)=>{
      setCustomCoords({...info});
      saveCoords(info)}

    return <View style={{flex: 1000,}}>
            <MapView
                onPress={()=>deselectMarker()}
                customMapStyle={mapStyle}
                showsCompass={false}
                    //onUserLocationChange={info =>getMarker(info.nativeEvent.coordinate)}
                onRegionChangeComplete={info =>handleRegionChange(info)}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
                style={{flex:1}}
                loadingEnabled
                // initialRegion={coords}
                region={coords}
                ><Markers coords={customCoords}/></MapView>
            <FAB
                icon={constantes.showModal ? 'minus' : 'plus'}
                style={styles.fab}
                onPress={()=>{
                  constantes.showModal?
                  hideCreateMarkerModale()
                  :showCreateMarkerModale()}}/>
            <FAB
                loading={constantes.spinner}
                small
                icon="access-point-network-off"
                style={styles.networkIcon}
                onPress={() => {}}
                visible={constantes.isConnected}/></View>
    

}
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