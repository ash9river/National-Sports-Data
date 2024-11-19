import { useMap } from 'react-kakao-maps-sdk';
import useGeolocation from '../../Hooks/useGeolocation';
import { CSSProperties } from 'react';

const PanToCurrentPositionContainerStyle: CSSProperties = {
  zIndex: 1,
  position: 'absolute',
  bottom: '14rem',
  right: '3px',
  width: '32px',
  height: '32px',
  backgroundColor: '#ffffff',
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

function PanToCurrentPosition() {
  const { position } = useGeolocation();
  const map = useMap();
  function handleOnClick() {
    if (!position) return;
    const myCenter = new kakao.maps.LatLng(
      position?.latitude,
      position?.longitude,
    );
    map.panTo(myCenter);
  }

  return (
    <button
      style={PanToCurrentPositionContainerStyle}
      type="button"
      onClick={handleOnClick}
    >
      <svg
        style={{
          width: '10px',
          height: '10px',
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
      </svg>
    </button>
  );
}

export default PanToCurrentPosition;
