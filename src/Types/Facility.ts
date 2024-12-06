// 시설 정보 구조
export interface Facility {
  facility_id: number; // 시설 ID
  facility_name: string; // 시설 이름
  facility_type: string; // 시설 유형 (예: "실내" 또는 "실외")
  facility_status: string; // 시설 운영 상태 (예: "정상운영")
  road_address: string; // 도로명 주소
  latitude: number; // 위도
  longitude: number; // 경도
  is_accessible_for_disabled: 'Y' | 'N'; // 장애인 이용 가능 여부
}

export interface FacilityDetailCoursesProps {
  courseId: number;
  busiRegNo: string | null;
  sportName: string | null;
  courseName: string;
  startTime: string;
  endTime: string;
  weekday: string;
  description: string | null;
  fee: string | null;
  isAccessibleForDisabled: 'Y' | 'N';
  cityName: string | null;
  districtName: string | null;
  roadAddr: string | null;
  faciDaddr: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface facilityListResponseData {
  facilityId: number;
  facilityName: string;
  facilityType: string;
  facilityStatus: string;
  roadAddress: string;
  detailAddress: string | null;
  zipCode: string;
  longitude: number | null;
  latitude: number | null;
  inOutType: string | null;
  nationFlag: string;
  generalFacilityId: number | null;
  generalBrno: string | null;
  generalFacilSn: string | null;
  generalResTelno: string | null;
  generalMainEventName: string | null;
  disabledFacilityId: number | null;
  disabledResTelno: string | null;
  disabledMainEventName: string | null;
  isAccessibleForDisabled: 'Y' | 'N';
  courses: FacilityDetailCoursesProps[];
}

// 시설 목록 데이터 구조
export interface FacilityListData {
  totalCount: number; // 총 시설 수
  page: number; // 현재 페이지 번호
  size: number; // 페이지당 항목 수
  totalPages: number; // 총 페이지 수
  data: Facility[]; // 시설 목록
}

// 시설 목록 요청 구조

export interface FacilityListRequest {
  cityId: string;
  districtId: string;
  isAccessibleForDisabled: 'Y' | 'N';
  page: number;
  size: number;
}

export interface FacilityPaginationRequest {
  cityId?: string;
  districtId?: string;
  isAccessibleForDisabled?: string;
  size: number;
}

export interface FacilityPaginationResponse {
  totalPages: number;
  pageSize: number;
  totalCount: number;
}
