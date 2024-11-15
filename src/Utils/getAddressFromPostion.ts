function getAddressFromPosition(lat: number, lng: number) {
  const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
  const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
  const callback = function (
    result: Array<{
      address: kakao.maps.services.Address;
      road_address: kakao.maps.services.RoadAaddress | null;
    }>,
    status: kakao.maps.services.Status
  ) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result[0].address);
    }
  };
  return geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}

export default getAddressFromPosition;
