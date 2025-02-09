import multer from "multer";

// uploaded files will be stored on the local disk and saved with the file name
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg", 
      "image/png", 
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/avi"
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, MP4, WebM, and AVI are allowed."));
    }
  },
});

export default upload;