
export interface Course {
    item_nm: string;                // 종목명
    start_tm: string;               // 시작 시각
    row_num: number;                // 순번
    lectr_nm: string;               // 강사명
    item_cd: string;                // 종목 코드
    facil_sn: string;               // 시설 일련번호
    equip_tm: string;               // 종료 시각
    lectr_weekday_val: string;      // 강좌 요일 값 (월화수목금토일 순서로 표현된 값)
    course_seta_desc_cn: string;    // 강좌 상세 설명 내용
    course_no: string;              // 강좌 번호
    settl_amt: string;              // 결제 금액
    course_nm: string;              // 강좌명
    brno: string;                   // 사업자 등록번호
}