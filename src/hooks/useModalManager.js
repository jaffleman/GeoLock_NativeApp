import React, { useEffect } from 'react';
import { Marker } from 'react-native-maps';

const useModalManager = (constantes, setLocalMarkerList, getMarker, managePresedMarker) => {
  useEffect(() => {
    const markerL = [];
    if (constantes.showModal) {
      markerL.push(
        <Marker
          key="new-marker"
          onDragEnd={(e) => getMarker({
            ...constantes.coordonates,
            longitude: e.nativeEvent.coordinate.longitude,
            latitude: e.nativeEvent.coordinate.latitude,
          })}
          draggable
          coordinate={{
            longitude: constantes.coordonates.longitude,
            latitude: constantes.coordonates.latitude,
          }}
          pinColor="red"
        />,
      );
    } else {
      markerL.push(...constantes.markerList.map((marker, index) => {
        const color = marker.id !== constantes.selectedMarker.id ? '#1100ee' : '#9900ee';
        return (
          <Marker
            zIndex={-index}
            draggable={false}
            key={marker.id}
            coordinate={{
              longitude: marker.longitude,
              latitude: marker.latitude,
            }}
            onPress={() => managePresedMarker(marker)}
            pinColor={color}
          />
        );
      }));
    }
    setLocalMarkerList([...markerL]);
  }, [constantes]);
};

export default useModalManager;
