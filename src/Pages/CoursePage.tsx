import { useCourseQuery } from '../Hooks/useCourseQuery';
import { useRef, useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import useKakaoLoader from '../Hooks/useKakaoLoader';
import useGeolocation from '../Hooks/useGeolocation';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import OpenTheList from '../Components/KakaoMap/OpenTheList';
import PanToCurrentPosition from '../Components/KakaoMap/PanToCurrentPosition';
import useSideBarIsOpenStore from '../Contexts/useSideBarIsOpenStore';
import SearchBox from '../Components/SearchBox';
import CardList from '../Components/Course/CourseList';
import useCityAndDistrictStore from '../Contexts/useCityAndDistrictStore';

const CoursePage = () => {
  useKakaoLoader();

  // 초기 사용자 위치 설정
  const { position: initialPosition } = useGeolocation();
  const [position, setPosition] = useState(initialPosition);
  const [map, setMap] = useState<kakao.maps.Map>();

  // 사이드바 상태
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);

  // 검색 조건 상태
  const [searchParams, setSearchParams] = useState({
    cityCode: '11', // 서울 기본값
    districtCode: '110', // 종로구 기본값
    isDisabledOnly: false,
  });

  // 강좌 데이터 쿼리
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isLoading,
    refetch,
  } = useCourseQuery(searchParams);

  // 강좌 데이터 플랫맵
  const courses = data?.pages.flatMap((page) => page.data?.courses ?? []) || [];

  // 지도 이동
  useEffect(() => {
    if (!map || !position) return;
    const newCenter = new kakao.maps.LatLng(
      position.latitude,
      position.longitude,
    );
    map.setCenter(newCenter);
  }, [map, position]);

  // IntersectionObserver로 스크롤 로드 처리
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCourseRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  // 검색 처리
  const handleSearch = (params: {}) => {
    const { cityCode, districtCode, isAccessibleForDisabled } =
      useCityAndDistrictStore.getState(); // Zustand 상태값 가져오기

    const searchParams = {
      cityCode: cityCode,
      districtCode: districtCode,
      isDisabledOnly: isAccessibleForDisabled,
    };

    console.log('Search Params:', searchParams);

    setSearchParams((prev) => ({ ...prev, ...searchParams }));

    // refetch를 통해 새로운 검색 조건으로 데이터 다시 가져오기
    refetch();
  };

  return (
    <>
      {/* 사이드바 검색 영역 */}
      <Container
        sx={{
          position: 'absolute',
          width: '390px',
          height: 'calc(100vh - 65px)',
          bgcolor: 'white',
          top: '64px',
          zIndex: 999,
          padding: 0,
          left: isOpen ? '240px' : '-150px',
          transition: 'all 0.3s ease-in',
        }}
      >
        <SearchBox onSearch={handleSearch} />

        <CardList
          courses={courses}
          isLoading={isLoading}
          error={error}
          isFetchingNextPage={isFetchingNextPage}
          lastCourseRef={lastCourseRef}
          onLocationClick={(latitude, longitude) => {
            setPosition({ latitude, longitude });
            map?.setCenter(new kakao.maps.LatLng(latitude, longitude));
          }}
        />
      </Container>

      {/* 카카오 지도 */}
      <Map
        id="map"
        center={{
          lat: position?.latitude || 33.450701,
          lng: position?.longitude || 126.570667,
        }}
        style={{
          width: '100%',
          height: 'calc(100vh - 65px)',
        }}
        level={6}
        onCreate={setMap}
      >
        {position && (
          <MapMarker
            position={{ lat: position.latitude, lng: position.longitude }}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: { width: 24, height: 35 },
            }}
          />
        )}
        <OpenTheList />
        <PanToCurrentPosition />
        <ZoomControl position="BOTTOMRIGHT" />
      </Map>
    </>
  );
};

export default CoursePage;
