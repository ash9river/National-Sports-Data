import { ApiResponse } from "../Types/ResponseType";
import { Course } from "../Types/Course";
import { API_ENDPOINT, API_KEY } from "../Configs/ENV";

export const fetchCourses = async (pageNo: number = 1, numOfRows: number = 10): Promise<ApiResponse<Course>> => {
    const response = await fetch(`${API_ENDPOINT}?serviceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json`);
    
    if (!response.ok) {
        throw new Error("에러 발생");
    }
    
    const data = await response.json();
    return data;
};