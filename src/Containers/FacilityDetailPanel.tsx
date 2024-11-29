import { Container } from '@mui/material';
import useSideBarIsOpenStore from '../Contexts/useSideBarIsOpenStore';
import useFacilityQuery from '../Hooks/useFacilityQuery';
import { FacilityListRequest } from '../Types/Facility';
import useFacilityDetailStore from '../Contexts/useFacilityDetailStore';
import FacilityCard from '../Components/Facility/FacilityCard';
import { useEffect } from 'react';

function FacilityDetailPanel() {
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);
  const faciltiyId = useFacilityDetailStore((state) => state.facilityId);

  const tmpData: FacilityListRequest = {
    city_code: '11',
    district_code: '123',
    is_accessible_for_disabled: 'Y',
    page: 1,
    size: 10,
  };
  const { data: faciltiyDetailItem } = useFacilityQuery(tmpData, (data) => {
    return data.data?.facilities.filter(
      (facility) => facility.facility_id === faciltiyId,
    );
  });

  useEffect(() => {
    console.log('테스트');
    console.log(faciltiyId);

    console.log(faciltiyDetailItem);
  }, [faciltiyDetailItem]);

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
    ></Container>
  );
}

export default FacilityDetailPanel;
