import { Dispatch, SetStateAction } from 'react';
import { facilityListResponseData } from '../../Types/Facility';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Button, Card, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useFacilityDetailStore from '../../Contexts/useFacilityDetailStore';

interface FacilityOverlayMarkerInfoWindowProps {
  facilityItem: facilityListResponseData;
}

function FacilityPageOverlayMarkerInfoWindow({
  facilityItem,
}: FacilityOverlayMarkerInfoWindowProps) {
  const setFacilityId = useFacilityDetailStore((state) => state.setFacilityId);
  function handleOnClick() {
    setFacilityId(0);
  }

  if (facilityItem.latitude === null && facilityItem.longitude === null) {
    handleOnClick();
    return;
  }

  return (
    <CustomOverlayMap
      position={{
        lat: facilityItem.latitude as number,
        lng: facilityItem.longitude as number,
      }}
    >
      <Card
        sx={{
          position: 'absolute',
          left: '24px',
          top: '-100px',
          minWidth: '140px',
          minHeight: '40px',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          {facilityItem.facilityName}
        </Typography>
        <Typography>{facilityItem.roadAddress}</Typography>
        <Button
          onClick={handleOnClick}
          sx={{
            position: 'absolute',
            top: 0,
            right: '-10px',
          }}
        >
          <CloseIcon />
        </Button>
      </Card>
    </CustomOverlayMap>
  );
}

export default FacilityPageOverlayMarkerInfoWindow;
