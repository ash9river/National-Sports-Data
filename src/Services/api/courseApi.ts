import { getData } from '../http/getData';
import { Course, CourseListData } from '../../Types/Course';
import { ApiResponse } from '../../Types/ResponseType';

interface GetCoursesParams {
  cityCode?: string;
  districtCode?: string;
  isAccessibleForDisabled: string;
  page: number;
  size: number;
}

// 강좌 목록 조회
export const getCourses = async (
  params: GetCoursesParams,
  signal?: AbortSignal,
): Promise<ApiResponse<CourseListData>> => {
  const query = new URLSearchParams({
    ...(params.cityCode && {
      cityCode: params.cityCode,
    }),
    ...(params.districtCode && {
      districtCode: params.districtCode,
    }),
    ...(params.isAccessibleForDisabled && {
      isAccessibleForDisabled: params.isAccessibleForDisabled,
    }),
    page: params.page.toString(),
    size: params.size.toString(),
  }).toString();
  console.log(query);
  return getData<ApiResponse<CourseListData>>(`/courses?${query}`, signal);
};

// 강좌 상세 정보 조회
export const getCourseDetail = async (
  courseId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<Course>> => {
  return getData<ApiResponse<Course>>(`/courses/${courseId}`, signal);
};
