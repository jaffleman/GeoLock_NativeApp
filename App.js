import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import requestLocationPermission from './src/requestLocationPermission';

import ConstantesProvider from './src/context/constantesContext';
import CoordsProvider from './src/context/coordonatesContext';

import CustomView from './src/components/CustomView';

const log = (...args) => {
  if (__DEV__) {
    console.log('[APP]', ...args);
  }
};

const App = () => {
  const [initialCoords, setInitialCoords] = useState(null);

  const [initDimensions] = useState(
    Dimensions.get('window')
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        log('Application startup');

        const permissionGranted =
          await requestLocationPermission();

        log(
          'Location permission:',
          permissionGranted
        );

        if (!permissionGranted) {
          return;
        }

        Geolocation.getCurrentPosition(
          position => {
            log(
              'Position received:',
              position.coords
            );

            setInitialCoords(position.coords);
          },
          error => {
            console.error(
              'Geolocation error:',
              error
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      } catch (error) {
        console.error(
          'Application initialization error:',
          error
        );
      }
    };

    initialize();
  }, []);

  if (!initialCoords) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CoordsProvider
      value={{
        initDimensions,
        initialCoords,
      }}>
      <ConstantesProvider>
        <KeyboardAvoidingView
          keyboardVerticalOffset={30}
          behavior="height"
          style={{ flex: 1 }}>
          <CustomView />
        </KeyboardAvoidingView>
      </ConstantesProvider>
    </CoordsProvider>
  );
};

export default App;