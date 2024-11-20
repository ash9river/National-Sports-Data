// 공통 API 응답 구조
export interface ApiResponse<T> {
  status: number; // HTTP 상태 코드
  message?: string; // 성공 메시지 (예: "요청 성공")
  data?: T; // 성공 시 반환되는 데이터
  error?: string; // 오류 메시지 (예: "조건에 맞는 데이터가 없습니다")
}

// 오류 응답 구조
export type ErrorResponse = ApiResponse<null>;
