import React from 'react';
import {View, Text} from 'react-native';
import {Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default MarkerManager = ({constantes}) => {
  if (constantes.markerList.length > 0 && !constantes.showModal) {
    return constantes.markerList.map((marker, index) => {
      return (
        <Marker
          zIndex={-index}
          draggable={false}
          key={marker.id}
          coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude,}}
          pinColor={'darkturquoise'}>
          <Callout
            style={{
              backgroundColor: '#000',
              maxWidth: 500,
              mawheight: 200,}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{backgroundColor: 'bisque',}}>
                <Text
                  style={{fontWeight: 'bold',}}>
                  {marker.adresse}
                </Text>
              </View>
              {marker.accesList.map((acces, i) => (
                <Text key={acces.mk * 10 + i}>
                  {acces.type + ' => ' + acces.code}
                </Text>))}
            </View>
          </Callout>
        </Marker>);});} 
  else if (constantes.showModal) {
    return (
      <Marker
        draggable={true}
        coordinate={{
          longitude: constantes.coordonates.longitude,
          latitude: constantes.coordonates.latitude,
        }}
        pinColor={'red'}/>);}
};
