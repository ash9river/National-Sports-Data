import { useQuery } from '@tanstack/react-query';
import { getData } from '../Services/http/getData';
import { District } from '../Types/CityAndDistrict';
import { ApiResponse } from '../Types/ResponseType';

function useDistrictQuery(cityId: string) {
  // citId=${cityId} << ???
  return useQuery({
    queryKey: ['district', cityId],
    queryFn: ({ signal }) =>
      getData<ApiResponse<District[]>>(`districts/${cityId}`, signal),
  });
}

export default useDistrictQuery;
