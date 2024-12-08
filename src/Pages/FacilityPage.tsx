import MapContainer from '../Containers/MapContainer';
import FacilityDetailPanel from '../Containers/FacilityDetailPanel';
import SideBar from '../Containers/SideBar';
import useFacilityDetailStore from '../Contexts/useFacilityDetailStore';

const FacilityPage = () => {
  const facilityDetailPosition = useFacilityDetailStore(
    (state) => state.facilityDetailPosition,
  );

  const facilityId = useFacilityDetailStore((state) => state.facilityId);

  return (
    <>
      <MapContainer />
      <SideBar />
      {facilityId && <FacilityDetailPanel />}
    </>
  );
};

export default FacilityPage;
