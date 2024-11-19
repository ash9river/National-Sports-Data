import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getCourses } from '../Services/api/courseApi';
import { useCourseStore } from '../Contexts/useCourseStore';
import { CourseListData } from '../Types/Course';
import { ApiResponse } from '../Types/ResponseType';

export const useCourseQuery = (numOfRows: number = 100) => {
  const setCourses = useCourseStore((state) => state.setCourses);

  const queryResult = useInfiniteQuery<ApiResponse<CourseListData>, Error>({
    queryKey: ['courses'],
    queryFn: ({ pageParam = 1 }) =>
      getCourses({ page: pageParam as number, size: numOfRows }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length; // 현재 페이지 수
      const totalPageCount = lastPage.data ? lastPage.data.total_pages : 0; // 총 페이지 수
      return currentPage < totalPageCount ? currentPage + 1 : undefined; // 다음 페이지가 있으면 반환
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 유지?
  });

  // 데이터가 성공적으로 로드되었을 때 zustand 상태를 업데이트
  useEffect(() => {
    if (queryResult.data) {
      const allCourses = queryResult.data.pages.flatMap(
        (page) => page.data?.courses || [],
      );
      setCourses(allCourses);
    }
  }, [queryResult.data, setCourses]);

  return queryResult; // isLoading, error, data  상태와 메서드를 반환.
};
