interface EnvConfig {
    NODE_ENV: string;
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    FRONTEND_URL: string;
    CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
    };
}
export declare const envVars: EnvConfig;
export {};
