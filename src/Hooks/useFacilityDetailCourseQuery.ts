import { useQuery } from '@tanstack/react-query';
import { getData } from '../Services/http/getData';
import { ApiResponse } from '../Types/ResponseType';
import { CourseListData } from '../Types/Course';

function useFacilityDetailCourseQuery() {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: ({ signal }) =>
      getData<ApiResponse<CourseListData>>(
        'facilities/facilityId/courses',
        signal,
      ),
  });
}

export default useFacilityDetailCourseQuery;
