export interface ResponseHeader {
    resultCode: string; // 결과 코드
    resultMsg: string;  // 결과 메시지
}

export interface ResponseBody<T> {
    pageNo: number;           // 페이지 번호
    totalCount: number;       // 전체 결과 수
    items: {
        item: T[];            // 결과 아이템
    };
    numOfRows: number;        // 페이지당 결과 수
}

export interface ApiResponse<T> {
    response: {
        header: ResponseHeader; // 헤더 정보
        body: ResponseBody<T>;  // 본문 내용 (제네릭 타입 포함)
    };
}