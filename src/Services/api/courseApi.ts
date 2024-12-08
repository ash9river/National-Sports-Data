import { getData } from '../http/getData';
import { Course, CourseListData } from '../../Types/Course';
import { ApiResponse } from '../../Types/ResponseType';

interface GetCoursesParams {
  cityId?: string;
  districtId?: string;
  isAccessibleForDisabled: string;
  sportName?: string;
  page: number;
  size: number;
}

// 강좌 목록 조회
export const getCourses = async (
  params: GetCoursesParams,
  signal?: AbortSignal,
): Promise<ApiResponse<CourseListData>> => {
  const query = new URLSearchParams({
    ...(params.cityId && {
      cityId: params.cityId,
    }),
    ...(params.districtId && {
      districtId: params.districtId,
    }),
    ...(params.isAccessibleForDisabled && {
      isAccessibleForDisabled: params.isAccessibleForDisabled,
    }),
    ...(params.sportName && {
      sportName: params.sportName,
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
