import { MapMarker } from 'react-kakao-maps-sdk';
import { facilityListResponseData } from '../../Types/Facility';
import useAddressQuery from '../../Hooks/useAddressQuery';
import useFacilityDetailStore from '../../Contexts/useFacilityDetailStore';
import FacilityPageOverlayMarkerInfoWindow from './FacilityPageOverlayMarkerInfoWindow';

function FacilityKaKaoMapMarker({
  facilityItem,
}: {
  facilityItem: facilityListResponseData;
}) {
  const { data: addressData } = useAddressQuery(facilityItem.roadAddress);
  const { facilityId, setFacilityId, setFacilityDetailPosition } =
    useFacilityDetailStore();

  function handleOnClick() {
    setFacilityId(facilityItem.facilityId);
    setFacilityDetailPosition({
      latitude: facilityItem.latitude
        ? facilityItem.latitude
        : addressData?.lat,
      longitude: facilityItem.longitude
        ? facilityItem.longitude
        : addressData?.lng,
    });
  }
  return (
    <>
      <MapMarker
        key={`${facilityItem.facilityId}marker`}
        position={{
          lat: facilityItem.latitude ? facilityItem.latitude : addressData?.lat,
          lng: facilityItem.longitude
            ? facilityItem.longitude
            : addressData?.lng,
        }}
        image={{
          src:
            facilityId === facilityItem.facilityId
              ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
              : 'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
          size: {
            width: 29,
            height: 42,
          },
        }}
        onClick={handleOnClick}
      />
      {facilityId === facilityItem.facilityId && (
        <FacilityPageOverlayMarkerInfoWindow facilityItem={facilityItem} />
      )}
    </>
  );
}

export default FacilityKaKaoMapMarker;
