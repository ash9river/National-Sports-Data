import { Button, Card, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { FacilityDetailCoursesProps } from '../../Types/Facility';
import CloseIcon from '@mui/icons-material/Close';

interface FacilityOverlayMarkerInfoWindowProps {
  courseItem: FacilityDetailCoursesProps;
  lat: number;
  lng: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function FacilityOverlayMarkerInfoWindow({
  courseItem,
  lat,
  lng,
  setIsOpen,
}: FacilityOverlayMarkerInfoWindowProps) {
  // 어떤걸 원하는지 몰라서 일단 간단하게 만들었어요
  // 진짜 간단하게 넣었으니까 입맛에 맞게 수정하시면 됩니다.

  return (
    <CustomOverlayMap
      position={{
        lat,
        lng,
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
          {courseItem.faciDaddr}
        </Typography>
        <Typography>{courseItem.roadAddr}</Typography>
        <Button
          onClick={() => setIsOpen(false)}
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

export default FacilityOverlayMarkerInfoWindow;
