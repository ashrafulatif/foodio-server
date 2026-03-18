"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationAndSortHelper = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = options.sortOrder || 'asc';
    const sortBy = options.sortBy || 'createdAt';
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.default = paginationAndSortHelper;
//# sourceMappingURL=paginationAndSorting.js.map