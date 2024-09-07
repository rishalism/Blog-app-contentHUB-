import multer, { diskStorage } from "multer";
import path from "path";
import fs from "fs";

// Get the project root directory
const projectRoot = path.resolve(__dirname, '..');

// Define the upload directory
const uploadDir = path.join(projectRoot, 'assets', 'images');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },
});

const images = multer({ storage });

const imageUpload = images.single('image');
export default imageUpload;