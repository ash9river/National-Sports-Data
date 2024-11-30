import { useInfiniteQuery } from '@tanstack/react-query';
import { getCourses } from '../Services/api/courseApi';
import { CourseListData } from '../Types/Course';
import { ApiResponse } from '../Types/ResponseType';

export const useCourseQuery = (params: {
  keyword?: string;
  city?: string;
  isDisabledOnly: boolean;
}) => {
  const queryResult = useInfiniteQuery<ApiResponse<CourseListData>, Error>({
    queryKey: ['courses', params],
    queryFn: ({ pageParam = 1 }) =>
      getCourses({
        ...params,
        is_disabled_only: params.isDisabledOnly ? 'Y' : 'N',
        page: pageParam as number,
        size: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length; // 현재 페이지 수
      const totalPageCount = lastPage.data ? lastPage.data.total_pages : 0; // 총 페이지 수
      return currentPage < totalPageCount ? currentPage + 1 : undefined; // 다음 페이지가 있으면 반환
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 유지?
  });

  return queryResult; // isLoading, error, data  상태와 메서드를 반환.
};
