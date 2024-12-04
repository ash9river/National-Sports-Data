function getPositionFromAddress(searchAddress: string) {
  const geocoder = new kakao.maps.services.Geocoder();
  const callback = function (
    result: Array<{
      address_name: string;
      address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
      x: string; //longitude
      y: string; //latitude
      address: kakao.maps.services.Address;
      road_address: kakao.maps.services.RoadAaddress;
    }>,
    status: kakao.maps.services.Status,
    pagination: kakao.maps.Pagination,
  ) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result[0].x);
    }
  };
  return geocoder.addressSearch(searchAddress, callback);
}

export default getPositionFromAddress;
