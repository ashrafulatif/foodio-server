"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requireEnvVariable = [
        'NODE_ENV',
        'PORT',
        'DATABASE_URL',
        'JWT_SECRET',
        'ACCESS_TOKEN_EXPIRES_IN',
        'FRONTEND_URL',
        'CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET',
    ];
    requireEnvVariable.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Environment variable ${variable} is required but not set in .env file.`);
        }
    });
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
        FRONTEND_URL: process.env.FRONTEND_URL,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        },
    };
};
exports.envVars = loadEnvVariables();
//# sourceMappingURL=env.js.map