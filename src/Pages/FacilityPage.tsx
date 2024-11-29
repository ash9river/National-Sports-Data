import MapContainer from '../Components/KakaoMap/MapContainer';
import FacilityDetailPanel from '../Containers/FacilityDetailPanel';
import SideBar from '../Containers/SideBar';
import useFacilityDetailStore from '../Contexts/useFacilityDetailStore';

const FacilityPage = () => {
  const facilityDetailPosition = useFacilityDetailStore(
    (state) => state.facilityDetailPosition,
  );
  return (
    <>
      <MapContainer />
      <SideBar />
      {facilityDetailPosition &&
        facilityDetailPosition.longitude !== 0 &&
        facilityDetailPosition.latitude !== 0 && <FacilityDetailPanel />}
    </>
  );
};

export default FacilityPage;
