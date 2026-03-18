import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllUsers(): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        address: string | null;
        role: import("../../../generated/prisma/enums").UserRole;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getMyProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        address: string | null;
        role: import("../../../generated/prisma/enums").UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(payload: UpdateUserDto, userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        address: string | null;
        role: import("../../../generated/prisma/enums").UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
