import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export default async function requestLocationPermission(callback) {
  if (Platform.OS === 'ios') {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
    });

    Geolocation.requestAuthorization();
    // IOS permission request does not offer a callback :/
    return null;
  } else if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('granted: ' + granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callback(true);
      } else {
        callback(false);
      }
    } catch (err) {
      callback(false);
    }
  }
}
