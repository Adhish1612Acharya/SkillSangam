import { config } from "dotenv";
config(); // Loads .env by default, no need for NODE_ENV check unless you're customizing

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
    
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer Cloudinary Storage
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "arogyaPath_DEV",
    resource_type: "auto", // handles images, videos, PDFs
    allowed_formats: ["png", "jpg", "jpeg", "mp4", "pdf"],
  },
});
