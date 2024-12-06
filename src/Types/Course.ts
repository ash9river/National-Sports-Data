// 강좌 정보 구조
export interface Course {
  courseId: number;
  busiRegNo: string; // 사업자등록번호
  sportName: string;
  courseName: string;
  startTime: string; // "HH:mm:ss" 형식
  endTime: string; // "HH:mm:ss" 형식
  weekday: string; // "1111100" 형식
  description: string | null;
  fee: string; // 문자열로 숫자 값
  isAccessibleForDisabled: 'Y' | 'N';
  cityName: string;
  districtName: string;
  roadAddr: string;
  faciDaddr: string;
  latitude: number;
  longitude: number;
}

// 강좌 목록 데이터 구조
export interface CourseListData {
  totalCount: number; // 총 강좌 수
  page: number; // 현재 페이지 번호
  size: number; // 페이지당 강좌 수
  totalPages: number; // 총 페이지 수
  courses: Course[]; // 강좌 목록
}
