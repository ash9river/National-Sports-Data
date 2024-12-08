import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import CourseCard from './CourseCard';
import { Course } from '../../Types/Course';

interface CardListProps {
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
  isFetchingNextPage: boolean;
  lastCourseRef: (node: HTMLDivElement | null) => void;
  onLocationClick: (
    latitude: number,
    longitude: number,
    course: Course,
  ) => void;
}

const CardList: React.FC<CardListProps> = ({
  courses,
  isLoading,
  error,
  isFetchingNextPage,
  lastCourseRef,
  onLocationClick,
}) => (
  <Box sx={{ height: 'calc(100% - 275px)', overflowY: 'auto' }}>
    {isLoading && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    )}
    {error && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography>강좌 정보를 불러올 수 없습니다.</Typography>
      </Box>
    )}
    {!isLoading && !error && courses.length === 0 && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography>강좌 정보가 없습니다.</Typography>
      </Box>
    )}
    {!isLoading &&
      !error &&
      courses.map((course, index) => {
        const isLastItem = index === courses.length - 1;
        return (
          <CourseCard
            key={index}
            course={course}
            onLocationClick={onLocationClick}
            ref={isLastItem ? lastCourseRef : null} // 안전하게 ref 전달
          />
        );
      })}
    {isFetchingNextPage && (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress size={24} />
      </Box>
    )}
  </Box>
);

export default CardList;
