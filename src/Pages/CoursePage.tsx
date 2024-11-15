import { useFetchCourses } from "../Hooks/useFetchCourses";
import { useCourseStore } from "../Contexts/useCourseStore";
import { useRef, useCallback } from "react";
import { Box, CircularProgress, Divider } from "@mui/material";

const CoursePage = () => {
  const { fetchNextPage, isFetchingNextPage, hasNextPage, error, isLoading } =
    useFetchCourses();
  const courses = useCourseStore((state) => state.courses);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastCourseRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (error) return <div>강좌 정보가 없습니다</div>;
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <h1>강좌 리스트</h1>
      <ul>
        {courses.map((course, index) => {
          const isLastItem = index === courses.length - 1;
          const courseContent = (
            <Box>
              <strong>{course.course_nm}</strong>
              <br />
              강사명: {course.lectr_nm}
              <br />
              시간: {course.start_tm} - {course.equip_tm}
              <br />
              내용: {course.course_seta_desc_cn}
            </Box>
          );

          return (
            <div
              key={course.course_no}
              ref={isLastItem ? lastCourseRef : undefined} // 마지막 항목만 lastCourseRef
            >
              {courseContent}
              <Divider />
            </div>
          );
        })}
      </ul>
      {isFetchingNextPage && <div>불러오는 중...</div>}
    </>
  );
};

export default CoursePage;
