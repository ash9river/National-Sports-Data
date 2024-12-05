import { Box, Container, Pagination } from '@mui/material';
import useSideBarIsOpenStore from '../Contexts/useSideBarIsOpenStore';
import useFacilityQuery from '../Hooks/useFacilityQuery';
import { FacilityListRequest } from '../Types/Facility';
import useFacilityDetailStore from '../Contexts/useFacilityDetailStore';
import FacilityCard from '../Components/Facility/FacilityCard';
import useFacilityDetailCourseQuery from '../Hooks/useFacilityDetailCourseQuery';
import CourseCard from '../Components/Course/CourseCard';
import { Course } from '../Types/Course';
import { useEffect } from 'react';
import FacilityDetailCourseCard from '../Components/Facility/FacilityDetailCourseCard';
import CloseFacilityDetailPanelButton from '../Components/Facility/CloseFacilityDetailPanelButton';

function FacilityDetailPanel() {
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);
  const faciltiyId = useFacilityDetailStore((state) => state.facilityId);

  const tmpData: FacilityListRequest = {
    cityCode: '11',
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

  const { data: facilityDetailCoursesItem } = useFacilityDetailCourseQuery();

  function handleNothing() {
    console.log('asd');
  }
  console.log('rendered');

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
        {facilityDetailCoursesItem?.data &&
          facilityDetailCoursesItem.data.courses.map((item: Course) => {
            return <FacilityDetailCourseCard courseItem={item} />;
          })}
      </Box>
      <Pagination
        count={100}
        hidePrevButton
        hideNextButton
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
}

export default FacilityDetailPanel;
