"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_config_1 = require("./cloudinary.config");
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_config_1.cloudinaryUpload,
    params: async (req, file) => {
        const originalName = file.originalname;
        const fileNameWithoutExtension = originalName
            .split('.')
            .slice(0, -1)
            .join('.')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '');
        const uniqueName = Math.random().toString(32).substring(2) +
            '-' +
            Date.now() +
            '-' +
            fileNameWithoutExtension;
        const folder = 'images';
        return {
            folder: `Foodio/${folder}`,
            public_id: uniqueName,
            resource_type: 'auto',
        };
    },
});
exports.multerOptions = {
    storage,
};
//# sourceMappingURL=multer.config.js.map