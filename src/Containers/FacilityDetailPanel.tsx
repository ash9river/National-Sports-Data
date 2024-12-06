import { Box, Container, Pagination } from '@mui/material';
import useSideBarIsOpenStore from '../Contexts/useSideBarIsOpenStore';
import useFacilityQuery from '../Hooks/useFacilityQuery';
import { FacilityDetailCoursesProps } from '../Types/Facility';
import useFacilityDetailStore from '../Contexts/useFacilityDetailStore';
import FacilityCard from '../Components/Facility/FacilityCard';
import FacilityDetailCourseCard from '../Components/Facility/FacilityDetailCourseCard';
import CloseFacilityDetailPanelButton from '../Components/Facility/CloseFacilityDetailPanelButton';
import useCityAndDistricctStore from '../Contexts/useCityAndDistrictStore';

function FacilityDetailPanel() {
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);
  const faciltiyId = useFacilityDetailStore((state) => state.facilityId);

  const cityId = useCityAndDistricctStore((state) => state.cityId);
  const districtId = useCityAndDistricctStore((state) => state.districtId);
  const isAccessibleForDisabled = useCityAndDistricctStore(
    (state) => state.isAccessibleForDisabled,
  );
  const page = useCityAndDistricctStore((state) => state.page);

  const { data: facilityDetailItem } = useFacilityQuery(
    {
      cityId,
      districtId,
      isAccessibleForDisabled,
      page,
      size: 10,
    },
    (data) => {
      console.log(data);
      return {
        ...data,
        data: data.data?.filter(
          (facility) => facility.facilityId === faciltiyId,
        ),
      };
    },
  );

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
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari, Opera
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      }}
    >
      {facilityDetailItem?.data && facilityDetailItem.data.length > 0 && (
        <FacilityCard facilityItem={facilityDetailItem.data[0]} />
      )}
      <CloseFacilityDetailPanelButton />
      <Box>
        {facilityDetailItem?.data &&
          facilityDetailItem.data[0].courses.map(
            (item: FacilityDetailCoursesProps) => {
              return <FacilityDetailCourseCard courseItem={item} />;
            },
          )}
      </Box>

      {/*       <Pagination
        count={100}
        hidePrevButton
        hideNextButton
        sx={{ display: 'flex', justifyContent: 'center' }}
      /> */}
    </Container>
  );
}

export default FacilityDetailPanel;
