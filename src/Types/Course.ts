// 강좌 정보 구조
export interface Course {
  course_id: number; // 강좌 ID
  course_name: string; // 강좌 이름
  start_time: string; // 시작 시간 (예: "10:00")
  end_time: string; // 종료 시간 (예: "12:00")
  weekday: string; // 강좌 진행 요일 (이진 문자열, 예: "1010100")
  is_disabled_only: 'Y' | 'N'; // 장애인 전용 여부
}

// 강좌 목록 데이터 구조
export interface CourseListData {
  total_count: number; // 총 강좌 수
  page: number; // 현재 페이지 번호
  size: number; // 페이지당 강좌 수
  total_pages: number; // 총 페이지 수
  courses: Course[]; // 강좌 목록
}
