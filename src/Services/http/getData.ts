import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiRequester, setRequestDefaultHeader } from "./apiRequestor";

const bracket = {};

export const getData = async <T>(
  url: string,
  signal?: AbortSignal,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultHeader(config || bracket, signal);
    const response = await apiRequester.get<T>(url, modifiedConfig);

    return response.data;
  } catch (err: unknown) {
    // 나중에 에러 핸들링 수정
    if (isAxiosError(err)) {
      throw new Error(err.message);
    } else throw err;
  }
};
