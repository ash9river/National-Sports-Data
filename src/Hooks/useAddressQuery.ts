import { useQuery } from '@tanstack/react-query';
import { getPositionFromAddressV2 } from '../Utils/getPositionFromAddress';

function useAddressQuery(address: string) {
  return useQuery({
    queryKey: ['address', address],
    queryFn: ({ signal }) => getPositionFromAddressV2(address, signal),
  });
}

export default useAddressQuery;
