import { Container, Pagination } from '@mui/material';
import useSideBarIsOpenStore from '../Contexts/useSideBarIsOpenStore';
import useFacilityQuery from '../Hooks/useFacilityQuery';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Facility,
  FacilityListData,
  FacilityListRequest,
  facilityListResponseData,
} from '../Types/Facility';
import FacilityCard from '../Components/Facility/FacilityCard';
import { ApiResponse } from '../Types/ResponseType';
import useFacilityPaginationQuery from '../Hooks/useFacilityPaginationQuery';
import CityAndDistrictSelect from './CityAndDistrictSelect';

const facilityTmpData: ApiResponse<FacilityListData> = {
  status: 200,
  message: '체육시설 목록 조회 성공',
  data: {
    total_count: 45,
    page: 1,
    size: 10,
    total_pages: 5,
    data: [
      {
        facility_id: 1,
        facility_name: '서울 체육관',
        facility_type: '실내',
        facility_status: '정상운영',
        road_address: '서울특별시 종로구 종로 1',
        latitude: 37.5704,
        longitude: 126.986,
        is_accessible_for_disabled: 'Y',
      },
      {
        facility_id: 2,
        facility_name: '강남 스포츠센터',
        facility_type: '실외',
        facility_status: '정상운영',
        road_address: '서울특별시 강남구 테헤란로 12',
        latitude: 37.5012,
        longitude: 127.0246,
        is_accessible_for_disabled: 'N',
      },
    ],
  },
};

function SideBar() {
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);
  const [page, setPage] = useState<number>(0);

  const tmpData: FacilityListRequest = {
    city_code: '11',
    district_code: '123',
    is_accessible_for_disabled: 'Y',
    page,
    size: 10,
  };
  const { data: facilityData } = useFacilityQuery(tmpData);
  const { data: pageNationData } = useFacilityPaginationQuery({ size: 10 });

  function handleChange(event: ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  return (
    <Container
      sx={{
        position: 'absolute',
        width: '390px',
        height: 'calc(100vh - 65px)',
        bgcolor: 'white',
        top: '64px',
        zIndex: '999',
        p: '0',
        left: isOpen ? '240px' : '-150px',
        transition: 'all 0.3s ease-in',
      }}
    >
      <CityAndDistrictSelect />
      {
        facilityData?.data !== undefined && (
          <>
            {facilityData.data.map((facilityItem: facilityListResponseData) => {
              return (
                <>
                  <FacilityCard facilityItem={facilityItem} />
                </>
              );
            })}
          </>
        )
        // 전체 카운트를 알아내는 api는 따로 만들어달라 요청
        // 그후스켈레톤 ui 적용
      }
      {pageNationData?.data !== undefined && (
        <Pagination
          count={pageNationData.data.totalCount}
          page={page}
          onChange={handleChange}
          hidePrevButton
          hideNextButton
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Container>
  );
}

export default SideBar;
