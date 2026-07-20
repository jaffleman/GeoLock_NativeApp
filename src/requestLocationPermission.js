import Geolocation from 'react-native-geolocation-service';
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';

const log = (...args) => {
  if (__DEV__) {
    console.log('[LOCATION]', ...args);
  }
};

export default async function requestLocationPermission() {
  try {
    log('Requesting location permission');

    if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'whenInUse',
      });

      const status =
        await Geolocation.requestAuthorization(
          'whenInUse'
        );

      log('iOS authorization status:', status);

      return (
        status === 'granted' ||
        status === 'authorized'
      );
    }

    if (Platform.OS === 'android') {
      const granted =
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS
            .ACCESS_FINE_LOCATION,
          {
            title: 'Permission de localisation',
            message:
              'Geolock a besoin de votre position pour fonctionner correctement.',
            buttonPositive: 'Autoriser',
            buttonNegative: 'Refuser',
          }
        );

      const allowed =
        granted ===
        PermissionsAndroid.RESULTS.GRANTED;

      log(
        'Android permission:',
        allowed ? 'GRANTED' : 'DENIED'
      );

      return allowed;
    }

    return false;
  } catch (error) {
    console.error(
      '[LOCATION] Permission error:',
      error
    );

    return false;
  }
}