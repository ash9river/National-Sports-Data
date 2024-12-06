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
import useFacilityPaginationQuery from '../Hooks/useFacilityPaginationQuery';
import useCityAndDistricctStore from '../Contexts/useCityAndDistrictStore';
import FacilityForCityAndDistrictSelect from './FacilityForCityAndDistrictSelect';

function SideBar() {
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);

  const cityId = useCityAndDistricctStore((state) => state.cityId);
  const districtId = useCityAndDistricctStore((state) => state.districtId);
  const isAccessibleForDisabled = useCityAndDistricctStore(
    (state) => state.isAccessibleForDisabled,
  );
  const page = useCityAndDistricctStore((state) => state.page);
  const setPage = useCityAndDistricctStore((state) => state.setPage);

  const { data: facilityData } = useFacilityQuery({
    cityId,
    districtId,
    isAccessibleForDisabled,
    page,
    size: 10,
  });

  const { data: pageNationData } = useFacilityPaginationQuery({
    cityId,
    districtId,
    isAccessibleForDisabled,
    size: 10,
  });

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
      <FacilityForCityAndDistrictSelect />
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
