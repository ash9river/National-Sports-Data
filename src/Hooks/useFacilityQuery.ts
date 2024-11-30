import { useQuery } from '@tanstack/react-query';
import { getData } from '../Services/http/getData';
import {
  Facility,
  FacilityListData,
  FacilityListRequest,
  facilityListResponseData,
} from '../Types/Facility';
import { ApiResponse } from '../Types/ResponseType';

function useFacilityQuery(
  req: FacilityListRequest,
  select?: (
    data: ApiResponse<facilityListResponseData[]>,
  ) => ApiResponse<facilityListResponseData[]> | undefined,
) {
  return useQuery({
    queryKey: ['facility', req],
    queryFn: ({ signal }) =>
      getData<ApiResponse<facilityListResponseData[]>>('facilities', signal),
    select,
  });
}

export default useFacilityQuery;
