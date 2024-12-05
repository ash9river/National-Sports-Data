import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Course } from '../../Types/Course';
import { formatWeekday } from '../../Utils/fomatters';

function FacilityDetailCourseCard({ courseItem }: { courseItem: Course }) {
  return (
    <Card
      sx={{
        maxWidth: 340,
        m: 2,
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Stack sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: 700 }}
          >
            {courseItem.courseName}
          </Typography>
          {/* 시간 정보 */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>시간:</strong> {courseItem.startTime} - {courseItem.endTime}
          </Typography>

          {/* 요일 정보 */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>요일:</strong> {formatWeekday(courseItem.weekday)}
          </Typography>

          {/* 강좌 설명 */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            {courseItem.description}
          </Typography>

          {/* 강좌 수강료 */}
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>수강료:</strong>{' '}
            {courseItem.fee ? `${courseItem.fee.toLocaleString()}원` : '무료'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FacilityDetailCourseCard;
