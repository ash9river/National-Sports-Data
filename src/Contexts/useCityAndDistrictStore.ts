import { create } from 'zustand';
import { City, District } from '../Types/CityAndDistrict';

interface useCityAndDistricctStore extends City, District {
  isAccessibleForDisabled: 'Y' | 'N';
  page: number;
  setCity: (cityId: string, cityCode: string, cityName: string) => void;
  setDistrict: (
    districtId: string,
    districtCode: string,
    districtName: string,
  ) => void;
  setIsAccessibleForDisabled: (isAccessibleForDisabled: 'Y' | 'N') => void;
  setPage: (page: number) => void;
}

const useCityAndDistricctStore = create<useCityAndDistricctStore>((set) => ({
  isAccessibleForDisabled: 'N',
  cityId: '1',
  cityCode: '11',
  cityName: '서울특별시',
  districtId: '1',
  districtCode: '110',
  districtName: '종로구',
  page: 1,
  setCity: (cityId, cityCode, cityName) => set({ cityId, cityCode, cityName }),
  setDistrict: (districtId, districtCode, districtName) =>
    set({ districtId, districtCode, districtName }),
  setIsAccessibleForDisabled: (isAccessibleForDisabled) =>
    set({ isAccessibleForDisabled }),
  setPage: (page) => set({ page }),
}));

export default useCityAndDistricctStore;
