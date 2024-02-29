import React from 'react';
import {View, Text} from 'react-native';
import {Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default MarkerManager = ({markerList, coordonates}) => {
  if (markerList.length > 0) {
    return markerList.map((marker, index) => {
      return (
        <Marker
        zIndex={-index}
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
                  backgroundColor: 'bisque',
                }}>
                <Text
                  style={{
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
    });
  } else {
    return (
      <Marker
        draggable={true}
        coordinate={{
          longitude: coordonates.longitude,
          latitude: coordonates.latitude,
        }}
        pinColor={'red'}
      />
    );
  }
};
