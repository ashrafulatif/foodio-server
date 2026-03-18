type PaginationSortTypes = {
    limit?: number | string;
    page?: number | string;
    sortBy?: string;
    sortOrder?: string;
};
type PaginationSortTypesReturn = {
    limit: number;
    page: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};
declare const paginationAndSortHelper: (options: PaginationSortTypes) => PaginationSortTypesReturn;
export default paginationAndSortHelper;
