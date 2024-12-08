import axios from 'axios';
import { KAKAO_REST_API_KEY } from '../Configs/ENV';

// function getAddressFromPosition(lat: number, lng: number) {
//   const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
//   const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
//   const callback = function (
//     result: Array<{
//       address: kakao.maps.services.Address;
//       road_address: kakao.maps.services.RoadAaddress | null;
//     }>,
//     status: kakao.maps.services.Status,
//   ) {
//     if (status === kakao.maps.services.Status.OK) {
//       console.log(result[0].address);
//     }
//   };
//   return geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
// }

// export default getAddressFromPosition;

export async function getAddressFromPositionV2(lat: number, lng: number) {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });
    if (response.data.meta.total_count === 1) {
      return response.data.documents[0].address;
    } else {
      return null;
    }
  } catch (err: unknown) {}
}
