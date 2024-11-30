import { http, HttpResponse } from 'msw';
import { facilityListResponse } from './facility';

export const handlers = [
  http.get('/hello', () => {
    console.log('msw:get :: /hello');
    return HttpResponse.json({
      data: 'Captured a "GET /hello" request',
    });
  }),
  http.get('/api/facilities', () => {
    console.log(facilityListResponse);

    return HttpResponse.json({
      status: 200,
      data: facilityListResponse.data,
    });
  }),
  http.get('/api/facilities/pagination-info', () => {
    return HttpResponse.json({
      status: 200,
      message: '페이지네이션 정보 조회 성공',
      data: {
        totalPage: 78,
        pageSize: 100,
        totalCount: 7715,
      },
    });
  }),
];
