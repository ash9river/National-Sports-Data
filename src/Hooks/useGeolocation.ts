import { useEffect, useState } from 'react';

type PositionType = {
  latitude: number;
  longitude: number;
};

function useGeolocation() {
  const [position, setPosition] = useState<PositionType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');
  useEffect(() => {
    if (!navigator.geolocation) {
      setIsError('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setIsLoading(false);
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setIsError(error.message);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

    return () => {
      setIsLoading(false);
    };
  }, []);

  return { position, isLoading, isError };
}

export default useGeolocation;
