import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            address: string | null;
            role: import("../../../generated/prisma/enums").UserRole;
            createdAt: Date;
            updatedAt: Date;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    login(body: LoginDto, res: any): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            user: {
                id: string;
                name: string;
                email: string;
                phone: string | null;
                address: string | null;
                role: import("../../../generated/prisma/enums").UserRole;
                createdAt: Date;
                updatedAt: Date;
            };
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    logout(res: any): {
        statusCode: number;
        success: boolean;
        message: string;
        data: unknown;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    };
}
