/**
 * @jest-environment jsdom
 */

import Geolocation from 'react-native-geolocation-service';
import geolock from '../src/functions/geolock';

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

describe('geolock functions', () => {
  let constantes;
  let setConstantes;
  let setDataToFetch;

  beforeEach(() => {
    constantes = {
      showModal: false,
      coordonates: { latitude: 48.85, longitude: 2.35 },
      markerList: [],
      positionAcces: false,
      spinner: true,
      isConnected: false,
    };

    setConstantes = jest.fn();
    setDataToFetch = jest.fn(({
      route, method, data, callback,
    }) => {
      if (route === 'findAllMarkers&Acces') {
        callback({
          isConnected: true,
          jData: [{ id: 1, name: 'Marker 1' }, { id: 2, name: 'Marker 2' }],
        });
      } else if (route === 'create') {
        callback({ isConnected: true });
      }
    });
  });

  test('getMarkerExt should fetch markers and update constantes', async () => {
    const result = await geolock.getMarker(constantes, setConstantes, setDataToFetch, 'TEST: ');
    expect(result).toBe(true);
    expect(setDataToFetch).toHaveBeenCalled();
    expect(setConstantes).toHaveBeenCalledWith(expect.objectContaining({
      markerList: expect.any(Array),
      positionAcces: true,
      spinner: false,
      isConnected: true,
    }));
  });

  test('getMarkerExt should do nothing if showModal is true', async () => {
    constantes.showModal = true;
    const result = await geolock.getMarker(constantes, setConstantes, setDataToFetch);
    expect(result).toBeUndefined();
    expect(setConstantes).toHaveBeenCalledWith(expect.objectContaining(constantes));
  });

  test('getPosition should call Geolocation and getMarkerExt', () => {
    jest.useFakeTimers();

    Geolocation.getCurrentPosition.mockImplementationOnce((success, error) => {
      success({ coords: { latitude: 48.86, longitude: 2.36 } });
    });

    geolock.getPosition(constantes, setConstantes, setDataToFetch, 'POS: ');

    jest.runAllTimers(); // force l'exécution du setTimeout

    expect(Geolocation.getCurrentPosition).toHaveBeenCalled();
  });

  test('sendToBase should alert if code is missing', () => {
    global.alert = jest.fn();
    geolock.sendToBase('adresse', '', 'type', constantes, setConstantes, setDataToFetch);
    expect(global.alert).toHaveBeenCalledWith('Vous devez entrer un code!');
  });

  test('sendToBase should call setDataToFetch and update constantes', () => {
    jest.useFakeTimers();
    geolock.sendToBase('adresse', '1234', 'type', constantes, setConstantes, setDataToFetch);
    expect(setDataToFetch).toHaveBeenCalledWith(expect.objectContaining({
      route: 'create',
      method: 'POST',
      data: expect.objectContaining({
        adresse: 'adresse',
        latitude: constantes.coordonates.latitude,
        longitude: constantes.coordonates.longitude,
        acces: [{ type: 'type', code: '1234' }],
      }),
    }));
    jest.runAllTimers();
    expect(setConstantes).toHaveBeenCalledWith(expect.objectContaining({
      showModal: false,
      spinner: false,
      isConnected: true,
    }));
  });
});
