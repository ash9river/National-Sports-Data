import { create } from 'zustand';
import { FacilityListRequest } from '../Types/Facility';

interface useFacilityStore extends Omit<FacilityListRequest, 'size'> {
  setCity_code: (city_code: string) => void;
  setDistrict_code: (district_code: string) => void;
  setIs_accessible_for_disabled: (
    is_accessible_for_disabled: 'Y' | 'N',
  ) => void;
  setPage: (page: number) => void;
}

/* const useFacilityStore = create<useFacilityStore>((set) => ({
  city_code:"11",
district_code
}));

export default useFacilityStore; */
