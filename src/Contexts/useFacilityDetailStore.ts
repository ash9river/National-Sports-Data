import { create } from 'zustand';

interface Position {
  latitude: number;
  longitude: number;
}

interface useFacilityDetailStore {
  facilityId: number;
  facilityDetailPosition: Position;
  setFacilityId: (facilityId: number) => void;
  setFacilityDetailPosition: (facilityDetailPosition: Position) => void;
}

const useFacilityDetailStore = create<useFacilityDetailStore>((set) => ({
  facilityId: 0,
  facilityDetailPosition: {
    latitude: 0,
    longitude: 0,
  },
  setFacilityId: (facilityId) => set({ facilityId }),
  setFacilityDetailPosition: (facilityDetailPosition) =>
    set({ facilityDetailPosition }),
}));

export default useFacilityDetailStore;
