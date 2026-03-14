import { IResponseData } from './interface/response.interface';

export const sendResponse = <T>(responseData: IResponseData<T>) => {
  const { statusCode, success, message, data, meta } = responseData;

  return {
    statusCode,
    success,
    message,
    data,
    meta,
  };
};
