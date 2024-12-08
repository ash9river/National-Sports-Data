import axios from 'axios';
import { KAKAO_REST_API_KEY, VITE_GOOGLE_MAP_API_KEY } from '../Configs/ENV';

// function getPositionFromAddress(searchAddress: string) {
//   const geocoder = new kakao.maps.services.Geocoder();
//   const callback = function (
//     result: Array<{
//       address_name: string;
//       address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
//       x: string; //longitude
//       y: string; //latitude
//       address: kakao.maps.services.Address;
//       road_address: kakao.maps.services.RoadAaddress;
//     }>,
//     status: kakao.maps.services.Status,
//     pagination: kakao.maps.Pagination,
//   ) {
//     if (status === kakao.maps.services.Status.OK) {
//     }
//   };
//   return geocoder.addressSearch(searchAddress, callback);
// }

// export default getPositionFromAddress;

export async function getPositionFromAddressV2(
  address: string,
  signal?: AbortSignal,
) {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}&analyze_type=similar`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      signal,
    });
    if (response.data.meta.total_count === 1) {
      const position = {
        lat: response.data.documents[0].y,
        lng: response.data.documents[0].x,
      };
      return position;
    } else {
      const googleResponse = await getPositionFromAddressWithGoogle(address);
      const position = {
        lat: googleResponse?.lat.toString(),
        lng: googleResponse?.lng.toString(),
      };
      return position;
    }
  } catch (err: unknown) {
    // if (!(err instanceof CanceledError)) console.log(err);
  }
}

async function getPositionFromAddressWithGoogle(
  address: string,
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address,
  )}&key=${VITE_GOOGLE_MAP_API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      const location = response.data.results[0]?.geometry?.location;
      if (location) {
        return {
          lat: location.lat,
          lng: location.lng,
        };
      }
    } else {
    }
  } catch (error) {}

  return null; // Return null if location is not found
}
