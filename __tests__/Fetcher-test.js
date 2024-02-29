/**
 * @format
 */

import 'react-native';
import fetcher from '../src/functions/fetcher';
jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const MockMapView = (props) => {
      return <View>{props.children}</View>;
    };
    const MockMarker = (props) => {
      return <View>{props.children}</View>;
    };
    return {
      __esModule: true,
      default: MockMapView,
      Marker: MockMarker,
    };
  });
// Note: test renderer must be required after react-native.
const coords = {
    "speed":0.1508757621049881,
    "heading":207.0023956298828,
    "altitude":93.20000457763672,
    "accuracy":12.82699966430664,
    "longitude":2.3952496,
    "altitudeAccuracy":1,
    "latitude":48.758619
}

test('fetch home coords', () => {
    return fetcher({
        route: 'findAllMarkers&Acces',
        method: 'POST',
        data: coords,
        callback: e => {
            expect(e)
            .toBe([{
                        "id": 46,
                        "longitude": 2.39559,
                        "latitude": 48.75839,
                        "author": "Jaffleman",
                        "adresse": "3 cours Sainte-Marthe 94320 THIAIS",
                        "accesNbr": "0",
                        "createdDate": "Mon Sep 05 2022",
                        "accesList": [
                            {
                                "id": 69,
                                "type": "Hall principal 🏢.",
                                "code": "B0512",
                                "mk": 46},
                            {
                                "id": 67,
                                "type": "Portillon 🚧.",
                                "code": "16B06",
                                "mk": 46}]},
                    {
                        "id": 47,
                        "longitude": 2.39555,
                        "latitude": 48.75861,
                        "author": "Jaffleman",
                        "adresse": "3 cours Sainte-Marthe 94320 Thiais",
                        "accesNbr": "0",
                        "createdDate": "Mon Sep 05 2022",
                        "accesList": [
                            {
                                "id": 68,
                                "type": "Sortie de cours",
                                "code": "04A31",
                                "mk": 47}]}])}})})