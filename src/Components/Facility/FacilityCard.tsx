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

function FacilityCard({
  facilityItem,
}: {
  facilityItem: facilityListResponseData;
}) {
  const setFacilityId = useFacilityDetailStore((state) => state.setFacilityId);
  const setFacilityDetailPosition = useFacilityDetailStore(
    (state) => state.setFacilityDetailPosition,
  );

  function handleOnClick() {
    setFacilityId(facilityItem.facilityId);
    if (facilityItem.latitude && facilityItem.longitude)
      setFacilityDetailPosition({
        latitude: facilityItem.latitude,
        longitude: facilityItem.longitude,
      });
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
          <Typography gutterBottom variant="h6">
            {facilityItem.isAccessibleForDisabled && 'Y'}
            {!facilityItem.isAccessibleForDisabled && 'N'}
          </Typography>
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
