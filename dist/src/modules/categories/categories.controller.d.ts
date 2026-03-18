import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    findAllCategories(query: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[] | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    findOne(id: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    removeCategory(id: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
}
