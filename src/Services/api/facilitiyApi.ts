import { getData } from '../http/getData';
import { Facility, FacilityListData } from '../../Types/Facility';
import { ApiResponse } from '../../Types/ResponseType';
import { CourseListData } from '../../Types/Course';

interface GetFacilitiesParams {
  city?: string;
  type?: string;
  page: number;
  size: number;
}

// 시설 목록 조회
export const getFacilities = async (
  params: GetFacilitiesParams,
  signal?: AbortSignal,
): Promise<ApiResponse<FacilityListData>> => {
  const query = new URLSearchParams({
    ...(params.city && { city: params.city }),
    ...(params.type && { type: params.type }),
    page: params.page.toString(),
    size: params.size.toString(),
  }).toString();

  return getData<ApiResponse<FacilityListData>>(`/facilities?${query}`, signal);
};

// 시설 상세 정보 조회
export const getFacilityDetail = async (
  facilityId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<Facility>> => {
  return getData<ApiResponse<Facility>>(`/facilities/${facilityId}`, signal);
};

// 시설별 강좌 정보 조회
export const getFacilityCourses = async (
  facilityId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<CourseListData>> => {
  return getData<ApiResponse<CourseListData>>(
    `/facilities/${facilityId}/courses`,
    signal,
  );
};
