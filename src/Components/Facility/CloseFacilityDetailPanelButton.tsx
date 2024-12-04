import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useFacilityDetailStore from '../../Contexts/useFacilityDetailStore';

function CloseFacilityDetailPanelButton() {
  const setFacilityDetailPosition = useFacilityDetailStore(
    (state) => state.setFacilityDetailPosition,
  );
  function handleOnClick() {
    setFacilityDetailPosition({
      longitude: 0,
      latitude: 0,
    });
  }
  return (
    <Button
      onClick={handleOnClick}
      size="small"
      sx={{
        position: 'absolute',
        top: '12px',
        right: '6px',
        minWidth: '24px',
        p: 0,
        zIndex: 999,
      }}
    >
      <CloseIcon />
    </Button>
  );
}

export default CloseFacilityDetailPanelButton;
