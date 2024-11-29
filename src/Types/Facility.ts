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

// 시설 목록 데이터 구조
export interface FacilityListData {
  total_count: number; // 총 시설 수
  page: number; // 현재 페이지 번호
  size: number; // 페이지당 항목 수
  total_pages: number; // 총 페이지 수
  facilities: Facility[]; // 시설 목록
}

// 시설 목록 요청 구조

export interface FacilityListRequest {
  city_code: string;
  district_code: string;
  is_accessible_for_disabled: 'Y' | 'N';
  page: number;
  size: number;
}
