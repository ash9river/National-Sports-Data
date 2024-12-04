import { http, HttpResponse } from 'msw';
import { facilityListResponse } from './facility';
import { facilityDetailCoures } from './facilityDetailCourses';

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
        totalPages: 78,
        pageSize: 100,
        totalCount: 7715,
      },
    });
  }),
  http.get('/api/districts', () => {
    return HttpResponse.json({
      status: 200,
      message: '지역 목록 조회 성공',
      data: [
        {
          districtId: 1,
          districtName: '강남구',
          districtCode: '101',
        },
        {
          districtId: 2,
          districtName: '서초구',
          districtCode: '102',
        },
      ],
    });
  }),
  http.get('/api/facilities/facilityId/courses', () => {
    console.log(facilityDetailCoures.data);

    return HttpResponse.json({
      status: 200,
      data: facilityDetailCoures.data,
    });
  }),
];
