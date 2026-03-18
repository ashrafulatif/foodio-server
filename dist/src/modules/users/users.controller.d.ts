import { UsersService } from './users.service';
import { UserRole } from 'generated/prisma/enums';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsers(): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            address: string | null;
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
        }[] | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    getProfile(req: any): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            address: string | null;
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    updateProfile(payload: UpdateUserDto, req: any): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            address: string | null;
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
}
