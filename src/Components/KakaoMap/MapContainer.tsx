import { Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../Hooks/useKakaoLoader";
import { useEffect, useState } from "react";
import useGeolocation from "../../Hooks/useGeolocation";

function MapContainer() {
  useKakaoLoader();
  const { position } = useGeolocation();
  const [map, setMap] = useState<kakao.maps.Map>();
  // react-kakao-sdk에서 컴포넌트 마운트 이후의 맵 컨트롤은
  // ref보다 useState를 활용하는 것을 추천함
  useEffect(() => {
    if (!map) return;
    if (!position) return;
    const newCenter = new kakao.maps.LatLng(
      position?.latitude,
      position?.longitude
    );
    console.log(newCenter);

    map.setCenter(newCenter);
  }, [map, position]);

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
        width: "100%",
        height: "500px",
      }}
      level={6} // 지도의 확대 레벨
      onCreate={setMap}
    />
  );
}

export default MapContainer;
