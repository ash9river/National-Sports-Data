import { AxiosRequestConfig } from "axios";

import { apiRequester, setRequestDefaultHeader } from "./apiRequestor";
import { isAxiosError } from "axios";

const bracket = {};

// 보내는 데이터 타입 K
// 받는 데이터 타입 T

export const postData = async <K, T>(
  url: string,
  data?: K,
  signal?: AbortSignal,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultHeader(config || bracket, signal);

    const response = await apiRequester.post<T>(url, data, modifiedConfig);

    return response.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.message);
    } else throw err;
  }
};
