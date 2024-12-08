import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Facility, facilityListResponseData } from '../../Types/Facility';
import useFacilityDetailStore from '../../Contexts/useFacilityDetailStore';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { getPositionFromAddressV2 } from '../../Utils/getPositionFromAddress';
import useAddressQuery from '../../Hooks/useAddressQuery';
import { useEffect } from 'react';

function FacilityCard({
  facilityItem,
}: {
  facilityItem: facilityListResponseData;
}) {
  const setFacilityId = useFacilityDetailStore((state) => state.setFacilityId);
  const setFacilityDetailPosition = useFacilityDetailStore(
    (state) => state.setFacilityDetailPosition,
  );

  const { data: addressData } = useAddressQuery(facilityItem.roadAddress);

  function handleOnClick() {
    setFacilityId(facilityItem.facilityId);
    if (facilityItem.latitude && facilityItem.longitude) {
      setFacilityDetailPosition({
        latitude: facilityItem.latitude,
        longitude: facilityItem.longitude,
      });
    } else {
      const position = addressData;
      if (!position) return;
      if (position.lat && position.lng)
        setFacilityDetailPosition({
          latitude: position.lat,
          longitude: position.lng,
        });
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 340,
        m: 2,
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: 700 }}
          >
            {facilityItem.facilityName}
          </Typography>
          {facilityItem.isAccessibleForDisabled === 'Y' && (
            <AccessibleIcon
              sx={{
                mb: '0.35em',
              }}
            />
          )}
        </Stack>
        <Typography>{facilityItem.roadAddress}</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>{facilityItem.facilityType}</Typography>
          <Typography>{facilityItem.facilityStatus}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOnClick}>
          위치 보기
        </Button>
      </CardActions>
    </Card>
  );
}

export default FacilityCard;
