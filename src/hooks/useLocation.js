import { useEffect } from 'react';
import requestLocationPermission from '../requestLocationPermission';
import geolock from '../functions/geolock';

const useLocation = (constantes, setConstantes, setDataToFetch) => {
  useEffect(() => {
    requestLocationPermission().then((agrement) => {
      geolock.getPosition({ ...constantes }, setConstantes, setDataToFetch);
    });
  }, []);
};

export default useLocation;
