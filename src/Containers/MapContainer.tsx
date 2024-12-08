import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../Hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import useGeolocation from '../Hooks/useGeolocation';
import PanToCurrentPosition from '../Components/KakaoMap/PanToCurrentPosition';
import OpenTheList from '../Components/KakaoMap/OpenTheList';
import useFacilityDetailStore from '../Contexts/useFacilityDetailStore';
import useCityAndDistricctStore from '../Contexts/useCityAndDistrictStore';
import useFacilityQuery from '../Hooks/useFacilityQuery';
import FacilityOverlayMarkerInfoWindow from '../Components/KakaoMap/FacilityOverlayMarkerInfoWindow';
import FacilityPageOverlayMarkerInfoWindow from '../Components/KakaoMap/FacilityPageOverlayMarkerInfoWindow';
import FacilityKaKaoMapMarker from '../Components/KakaoMap/FacilityKaKaoMapMarker';

function MapContainer() {
  useKakaoLoader();
  const { position } = useGeolocation();
  const [map, setMap] = useState<kakao.maps.Map>();

  const { facilityId, setFacilityId, facilityDetailPosition } =
    useFacilityDetailStore();

  const { cityId, districtId, isAccessibleForDisabled, page } =
    useCityAndDistricctStore();

  const { data: facilityData } = useFacilityQuery({
    cityId,
    districtId,
    isAccessibleForDisabled,
    page,
    size: 10,
  });

  // react-kakao-sdk에서 컴포넌트 마운트 이후의 맵 컨트롤은
  // ref보다 useState를 활용하는 것을 추천함
  useEffect(() => {
    if (!map) return;
    if (!position) return;
    const newCenter = new kakao.maps.LatLng(
      position?.latitude,
      position?.longitude,
    );

    map.setCenter(newCenter);
  }, [map, position]);

  useEffect(() => {
    if (!map) return;
    if (!facilityDetailPosition) return;
    if (
      facilityDetailPosition.longitude !== 0 &&
      facilityDetailPosition.latitude !== 0
    ) {
      const newCenter = new kakao.maps.LatLng(
        facilityDetailPosition?.latitude,
        facilityDetailPosition?.longitude,
      );

      map.setLevel(5);
      map.panTo(newCenter);
    }
  }, [facilityDetailPosition, map]);

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: 'calc(100vh - 65px)',
      }}
      level={6} // 지도의 확대 레벨
      onCreate={setMap}
    >
      {facilityData?.data &&
        facilityData.data.length > 0 &&
        facilityData.data.map((facilityItem) => {
          return <FacilityKaKaoMapMarker facilityItem={facilityItem} />;
        })}
      <OpenTheList />
      <PanToCurrentPosition />
      <ZoomControl position="BOTTOMRIGHT" />
    </Map>
  );
}

export default MapContainer;
