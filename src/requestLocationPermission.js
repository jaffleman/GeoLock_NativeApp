import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export default async function requestLocationPermission() {
  console.log('=============> request location permission...')
  if (Platform.OS === 'ios') {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
    });

    Geolocation.requestAuthorization();
    // IOS permission request does not offer a callback :/
    return null;
  } else if (Platform.OS === 'android') {
    try {
      console.log('=============> check permission android')
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
