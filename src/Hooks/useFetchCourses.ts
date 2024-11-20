
import { useQuery,useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchCourses } from "../Services/api";
import { useCourseStore } from "../Contexts/useCourseStore";
import { Course } from "../Types/Course";
import { ApiResponse } from "../Types/ResponseType";

export const useFetchCourses = ( numOfRows: number = 10) => {
    const setCourses = useCourseStore((state) => state.setCourses);

    // const queryResult = useQuery<ApiResponse<Course>, Error>({
    //     queryKey: ["courses", pageNo],
    //     queryFn: () => fetchCourses(pageNo, numOfRows)
    // });
    

    const queryResult = useInfiniteQuery<ApiResponse<Course>, Error>({
        queryKey: ["courses"],
        queryFn: ({ pageParam = 1 }) => fetchCourses(pageParam as number, numOfRows),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            const totalPageCount = Math.ceil(lastPage.response.body.totalCount / numOfRows);
            return nextPage <= totalPageCount ? nextPage : undefined;
        },
        staleTime: 5 * 60 * 1000,  // 5분 동안 데이터를 유지?
    });

    // 데이터가 성공적으로 로드되었을 때 zustand 상태를 업데이트
    useEffect(() => {
        if (queryResult.data) {
            const allCourses = queryResult.data.pages.flatMap(page => page.response.body.items.item);
            setCourses(allCourses);
        }
    }, [queryResult.data, setCourses]);

    // useEffect(() => {
    //     if (queryResult.isSuccess && queryResult.data) {
    //         setCourses(queryResult.data.response.body.items.item);
    //     }
    // }, [queryResult.isSuccess, queryResult.data, setCourses]);

    return queryResult; // isLoading, error, data  상태와 메서드를 반환.
};
