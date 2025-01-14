import Capsule from "../models/capsuleSchema.js";
import cloudinary from "../config/cloudinaryConfig.js";

// POST: Upload of media (images or videos)
export const uploadMedia = async (req, res) => {
    try {
        const {title, message} = req.body;
        //Check if a title exists
        if(!title) {
            return res.status(400).json({message:"A title is needed!"});
        }
        // Check if there is either a message or a media(video or image)
        if(!message && !req.file) {
            return res.status(400).json({
                message: "Either a message or a file (image/video) must be provided!"
            });
        }
        //
        let fileType;
        let fileUrl = null;
        if(req.file) {
            fileType = req.file.mimetype.startsWith("image") ? "image" : "video";

            //upload of media to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.buffer, {
                folder: "user_media",
                resource_type: fileType,
            });
            fileUrl = result.secure_url;
        }

        //New Capsule object for the database
        const newCapsule = new Capsule({
            title,
            message: message || undefined,
            url: fileUrl,
            public_id: req.file ? result.public_id : undefined,
            recource_type: fileType || undefined,
        });

        //Save in MongoDB
        await newCapsule.save();

        res.status(200).json({
            message: "media has been successfully uploaded",
            capsule: newCapsule,
        });
    } catch (err) {
        res.status(500).json({
            message:"error to upload media", error: err.message
        })
    }
}