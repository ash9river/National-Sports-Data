// 강좌 정보 구조
export interface Course {
  facility_address: string; // 시설 주소
  facility_name: string; // 시설 이름
  city_name: string; // 도시 이름
  city_code: string; // 도시 코드
  road_address: string; // 도로명 주소
  detail_address: string; // 상세 주소 (빈 문자열일 수 있음)
  zip_code: string; // 우편번호
  latitude: number; // 위도
  longitude: number; // 경도
  course_id: number; // 강좌 ID
  course_name: string; // 강좌 이름
  start_time: string; // 시작 시간 (HH:mm 형식)
  end_time: string; // 종료 시간 (HH:mm 형식)
  weekday: string; // 요일 정보 (1010100 형식, 7자리 문자열)
  is_disabled_only: 'Y' | 'N'; // 장애인 전용 여부 ("Y" 또는 "N")
  instructor_name: string; // 강사 이름
  fee: number; // 수강료 (숫자, 원 단위)
  course_desc: string; // 강좌 설명
}

// 강좌 목록 데이터 구조
export interface CourseListData {
  total_count: number; // 총 강좌 수
  page: number; // 현재 페이지 번호
  size: number; // 페이지당 강좌 수
  total_pages: number; // 총 페이지 수
  courses: Course[]; // 강좌 목록
}
