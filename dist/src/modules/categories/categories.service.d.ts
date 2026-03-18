import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllCategories(query: any): Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeCategory(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
