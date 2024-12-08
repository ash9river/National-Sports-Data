import { Card, Typography } from '@mui/material';

function NoCourseCard() {
  return (
    <Typography
      sx={{
        position: 'relative',
        top: '50px',
        margin: 'auto',
        color: 'text.secondary',
        pl: '10px',
      }}
    >
      강좌 정보가 존재하지 않습니다.
    </Typography>
  );
}
export default NoCourseCard;
