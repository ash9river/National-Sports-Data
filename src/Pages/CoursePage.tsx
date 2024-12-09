import { useCourseQuery } from '../Hooks/useCourseQuery';
import { useCallback, useEffect, useState } from 'react';
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
import FacilityOverlayMarkerInfoWindow from '../Components/KakaoMap/FacilityOverlayMarkerInfoWindow';
import { Course } from '../Types/Course';

const CoursePage = () => {
  useKakaoLoader();

  const { position: initialPosition } = useGeolocation();
  const [position, setPosition] = useState(initialPosition);
  const [map, setMap] = useState<kakao.maps.Map>();

  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);

  const [searchParams, setSearchParams] = useState({
    cityId: '1',
    districtId: '1',
    isAccessibleForDisabled: 'Y',
    sportName: '', // 기본값: 전체
  });

  const [selectedCourseInfo, setSelectedCourseInfo] = useState<Course | null>(
    null,
  );

  const [isMarkerOpen, setIsMarkerOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isLoading,
    refetch,
  } = useCourseQuery(searchParams);

  const courses = data?.pages.flatMap((page) => page.data?.courses ?? []) || [];

  useEffect(() => {
    handleSearch(); // 초기 검색 실행
  }, []);

  const handleSearch = (query: Partial<typeof searchParams> = {}) => {
    const updatedParams = {
      ...searchParams,
      ...query,
    };
    setSearchParams(updatedParams);
    refetch();
  };

  useEffect(() => {
    const unsubscribe = useCityAndDistrictStore.subscribe((state) => {
      handleSearch({
        cityId: state.cityId,
        districtId: state.districtId,
        isAccessibleForDisabled: state.isAccessibleForDisabled,
        sportName: '', // cityId 변경 시 운동종목 초기화
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
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
        <SearchBox
          onSearch={(param) => handleSearch({ sportName: param.sportsName })}
          defaultSportName={searchParams.sportName}
        />

        <CardList
          courses={courses}
          isLoading={isLoading}
          error={error}
          isFetchingNextPage={isFetchingNextPage}
          lastCourseRef={useCallback(
            (node) => {
              if (isFetchingNextPage || !hasNextPage) return;
              if (node) {
                const observer = new IntersectionObserver((entries) => {
                  if (entries[0].isIntersecting) fetchNextPage();
                });
                observer.observe(node);
              }
            },
            [fetchNextPage, hasNextPage, isFetchingNextPage],
          )}
          onLocationClick={(
            latitude: number,
            longitude: number,
            course: Course,
          ) => {
            setPosition({ latitude, longitude });
            setSelectedCourseInfo(course);
            setIsMarkerOpen(true);
            map?.setCenter(new kakao.maps.LatLng(latitude, longitude));
          }}
        />
      </Container>

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
          <>
            <MapMarker
              position={{ lat: position.latitude, lng: position.longitude }}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                size: { width: 24, height: 35 },
              }}
              onClick={() => setIsMarkerOpen((prev) => !prev)}
            />
            {isMarkerOpen && selectedCourseInfo && (
              <FacilityOverlayMarkerInfoWindow
                courseItem={selectedCourseInfo}
                lat={position.latitude}
                lng={position.longitude}
                setIsOpen={setIsMarkerOpen}
              />
            )}
          </>
        )}
        <OpenTheList />
        <PanToCurrentPosition />
        <ZoomControl position="BOTTOMRIGHT" />
      </Map>
    </>
  );
};

export default CoursePage;
