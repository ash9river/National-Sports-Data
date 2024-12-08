// import { ApiResponse } from '../Types/ResponseType';
// import { CourseListData } from '../Types/Course';
// import { API_ENDPOINT, API_KEY } from '../Configs/ENV';

// export const getCourses = async (
//   pageNo: number = 1,
//   numOfRows: number = 10,
// ): Promise<ApiResponse<CourseListData>> => {
//   const response = await fetch(
//     `${API_ENDPOINT}?serviceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json`,
//   );

//   if (!response.ok) {
//     throw new Error('에러 발생');
//   }

//   const data = await response.json();
//   return data;
// };
