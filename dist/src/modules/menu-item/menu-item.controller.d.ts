import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
export declare class MenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    createMenuItem(file: Express.Multer.File, payload: CreateMenuItemDto): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
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
        }) | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    findAllMenuItems(query: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
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
        })[] | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    findMenuItemById(id: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
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
        }) | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    updateMenuItem(id: string, payload: UpdateMenuItemDto): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
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
        }) | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    removeMenuItem(id: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            imageUrl: string | null;
            available: boolean;
            categoryId: string;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
}
