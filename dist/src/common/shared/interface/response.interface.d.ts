export interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface IResponseData<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    meta?: Meta;
}
