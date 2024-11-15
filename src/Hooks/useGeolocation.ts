import { useEffect, useState } from "react";

type PositionType = {
  latitude: number;
  longitude: number;
};

function useGeolocation() {
  const [position, setPosition] = useState<PositionType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  console.log(position);

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsError("Geolocation is not supported by this browser.");
      setIsLoading(false);
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      console.log(JSON.stringify(position));
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

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
