import { useQuery } from '@tanstack/react-query';
import { getData } from '../Services/http/getData';
import {
  Facility,
  FacilityListData,
  FacilityListRequest,
} from '../Types/Facility';
import { ApiResponse } from '../Types/ResponseType';

function useFacilityQuery(
  req: FacilityListRequest,
  select?: (data: ApiResponse<FacilityListData>) => Facility[] | undefined,
) {
  return useQuery({
    queryKey: ['facility', req],
    queryFn: ({ signal }) =>
      getData<ApiResponse<FacilityListData>>('facilities', signal),
    select,
  });
}

export default useFacilityQuery;
