import { IResponseData } from './interface/response.interface';
export declare const sendResponse: <T>(responseData: IResponseData<T>) => {
    statusCode: number;
    success: boolean;
    message: string;
    data: T | undefined;
    meta: import("./interface/response.interface").Meta | undefined;
};
