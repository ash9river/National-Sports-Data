import MainLayout from "../Layouts/MainLayout";
import MapContainer from "../Components/KakaoMap/MapContainer";
import { Box } from "@mui/material";

const FacilityPage = () => {
  return (
    <MainLayout>
      <Box>
        <MapContainer />
      </Box>
    </MainLayout>
  );
};

export default FacilityPage;
