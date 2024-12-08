import { useQuery } from '@tanstack/react-query';
import { getData } from '../Services/http/getData';
import { Sport } from '../Types/Sport';
import { ApiResponse } from '../Types/ResponseType';

function useSportQuery() {
  return useQuery({
    queryKey: ['sports'],
    queryFn: ({ signal }) => getData<ApiResponse<Sport>>(`sports`, signal),
  });
}

export default useSportQuery;
