import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
export declare class MenuItemService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMenuItem(payload: CreateMenuItemDto): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        imageUrl: string | null;
        available: boolean;
        categoryId: string;
    }>;
    findAllMenuItems(query: any): Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        data: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            imageUrl: string | null;
            available: boolean;
            categoryId: string;
        })[];
    }>;
    findMenuItemById(id: string): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        imageUrl: string | null;
        available: boolean;
        categoryId: string;
    }>;
    updateMenuItem(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        imageUrl: string | null;
        available: boolean;
        categoryId: string;
    }>;
    removeMenuItem(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        imageUrl: string | null;
        available: boolean;
        categoryId: string;
    }>;
}
