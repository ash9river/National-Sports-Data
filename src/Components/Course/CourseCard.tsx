import React, { forwardRef } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { formatWeekday } from '../../Utils/fomatters';
import { Course, CourseListData } from '../../Types/Course';
import { courses } from '../../Mocks/courses';
import { toast } from 'react-toastify';

interface CourseCardProps {
  course: Course;
  onLocationClick: (
    latitude: number,
    longitude: number,
    course: Course,
  ) => void;
}

const CourseCard = forwardRef<HTMLDivElement, CourseCardProps>(
  ({ course, onLocationClick }, ref) => (
    <Card
      ref={ref} // 여기서 ref를 처리합니다.
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 2,
        border: '1px solid #e0e0e0',
      }}
    >
      <CardContent>
        {/* 강좌 이름 */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', mb: 1, color: 'black' }}
        >
          {course.courseName}
        </Typography>

        {/* 시간 정보 */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 1, color: 'black' }}
        >
          <strong>시간:</strong> {course.startTime} - {course.endTime}
        </Typography>

        {/* 요일 정보 */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 1, color: 'black' }}
        >
          <strong>요일:</strong> {formatWeekday(course.weekday)}
        </Typography>

        {/* 강좌 설명 */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 1, color: 'black' }}
        >
          {course.description}
        </Typography>

        {/* 강좌 수강료 */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 1, color: 'black' }}
        >
          <strong>수강료:</strong>{' '}
          {course.fee ? `${course.fee.toLocaleString()}원` : '무료'}
        </Typography>

        {/* 위치 보기 버튼 */}
        <Button
          variant="text"
          color="primary"
          onClick={() => {
            if (course.latitude && course.longitude) {
              onLocationClick(course.latitude, course.longitude, course);
            } else {
              toast.warn('위치 정보를 찾을 수 없습니다.');
            }
          }}
          sx={{ mt: 2, textTransform: 'none' }}
        >
          위치 보기
        </Button>
      </CardContent>
    </Card>
  ),
);

export default CourseCard;
