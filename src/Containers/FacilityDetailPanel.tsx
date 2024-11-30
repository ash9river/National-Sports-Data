import { Container } from '@mui/material';
import useSideBarIsOpenStore from '../Contexts/useSideBarIsOpenStore';
import useFacilityQuery from '../Hooks/useFacilityQuery';
import { FacilityListRequest } from '../Types/Facility';
import useFacilityDetailStore from '../Contexts/useFacilityDetailStore';
import FacilityCard from '../Components/Facility/FacilityCard';

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
  const { data: facilityDetailItem } = useFacilityQuery(tmpData, (data) => {
    console.log(data);
    return {
      ...data,
      data: data.data?.filter((facility) => facility.facilityId === faciltiyId),
    };
  });

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
      {facilityDetailItem?.data && facilityDetailItem.data.length > 0 && (
        <FacilityCard facilityItem={facilityDetailItem.data[0]} />
      )}
    </Container>
  );
}

export default FacilityDetailPanel;
