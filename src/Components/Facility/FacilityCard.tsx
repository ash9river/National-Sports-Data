import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Facility } from '../../Types/Facility';
import useFacilityDetailStore from '../../Contexts/useFacilityDetailStore';

function FacilityCard({ facilityItem }: { facilityItem: Facility }) {
  const setFacilityId = useFacilityDetailStore((state) => state.setFacilityId);
  const setFacilityDetailPosition = useFacilityDetailStore(
    (state) => state.setFacilityDetailPosition,
  );

  function handleOnClick() {
    setFacilityId(facilityItem.facility_id);
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
            {facilityItem.facility_name}
          </Typography>
          <Typography gutterBottom variant="h6">
            {facilityItem.is_accessible_for_disabled}
          </Typography>
        </Stack>
        <Typography>{facilityItem.road_address}</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>{facilityItem.facility_type}</Typography>
          <Typography>{facilityItem.facility_status}</Typography>
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
