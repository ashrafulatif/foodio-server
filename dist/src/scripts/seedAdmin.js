"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../prisma/prisma.service");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const seedAdmin = async () => {
    const prisma = new prisma_service_1.PrismaService();
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminName = process.env.ADMIN_NAME || "Admin";
        if (!adminEmail || !adminPassword) {
            console.error("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(adminPassword, 10);
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });
        if (existingAdmin) {
            await prisma.user.update({
                where: { email: adminEmail },
                data: {
                    password: hashedPassword,
                    role: enums_1.UserRole.ADMIN,
                },
            });
            console.log("✓ Admin already exists — role and password updated.");
            return;
        }
        await prisma.user.create({
            data: {
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: enums_1.UserRole.ADMIN,
            },
        });
        console.log("✓ Admin user seeded successfully.");
    }
    catch (error) {
        console.error("✗ Failed to seed admin:", error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
};
seedAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
//# sourceMappingURL=seedAdmin.js.map