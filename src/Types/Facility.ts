export interface Facility {
  facility_id: number; // 시설 ID
  facility_name: string; // 시설 이름
  facility_type: string; // 시설 유형 (예: 실내, 실외)
  facility_status: string; // 시설 상태 (예: 정상운영, 점검 중)
  road_address: string; // 도로명 주소
  latitude: number; // 위도
  longitude: number; // 경도
  is_accessible_for_disabled: 'Y' | 'N'; // 장애인 접근 가능 여부 ("Y" 또는 "N")
}

export interface FacilityDetail extends Facility {
  detail_address: string; // 상세 주소 (예: 2012호)
  zip_code: string; // 우편번호
  in_out_type: string; // 실내외 구분
  nation_flag: 'Y' | 'N'; // 국가기관 여부
  city_name: string; // 도시 이름
  district_name: string; // 지역 이름
  is_accessible_for_disabled: 'Y' | 'N'; // 장애인 이용 가능 여부
}
