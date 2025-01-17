
import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageSchema.js";

export const newImage = (req, res) => {
  // Ensure that a file is uploaded
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    (error, result) => {
      if (error) {
        return res.status(500).send('Error uploading to Cloudinary');
      }
      console.log('Cloudinary upload result:', result);

      // Save image URL and public_id in the MongoDB
      const newImage = new Image({
        url: result.secure_url,
        public_id: result.public_id,
      });

      newImage.save()
        .then(image => res.status(200).send(image))
        .catch(err => res.status(500).send('Error saving image to database'));
    }
  ).end(req.file.buffer);
};
