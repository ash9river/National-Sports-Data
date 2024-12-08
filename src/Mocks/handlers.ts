import { http, HttpResponse } from 'msw';
import { facilityListResponse } from './facility';
import { facilityDetailCoures } from './facilityDetailCourses';
import { courses } from './courses';

export const handlers = [
  http.get('/hello', () => {
    return HttpResponse.json({
      data: 'Captured a "GET /hello" request',
    });
  }),
  http.get('/api/facilities', () => {
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
          districtName: '종로구',
          districtCode: '110',
        },
        {
          districtId: 2,
          districtName: '중구',
          districtCode: '140',
        },
        {
          districtId: 3,
          districtName: '용산구',
          districtCode: '170',
        },
        {
          districtId: 4,
          districtName: '중랑구',
          districtCode: '260',
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

  http.get('/api/courses', () => {
    return HttpResponse.json({
      status: 200,
      data: courses.data,
    });
  }),
];
