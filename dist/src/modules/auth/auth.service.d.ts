import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(payload: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        address: string | null;
        role: import("../../../generated/prisma/enums").UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(payload: LoginDto): Promise<{
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
    }>;
}
