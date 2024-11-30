import { create } from 'zustand';

interface SideBarIsOpenStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useSideBarIsOpenStore = create<SideBarIsOpenStore>((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useSideBarIsOpenStore;
