import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import User from "../../models/user.js";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load env variables

cloudinary.config({ // ✅ Set your Cloudinary credentials
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

const cloudinaryRouter = express.Router();
const upload = multer(); // Handles file upload in memory (req.file.buffer)

// Route to upload an image and update the user's profile picture
cloudinaryRouter.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const userId = req.session.user?._id || req.body.userId;

        if (!userId) {
        return res.status(400).json({ error: "User ID is missing." });
        }

        if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded." });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "profile-pictures" },
        async (error, result) => {
            if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ error: "Image upload failed." });
            }

            const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImgUrl: result.secure_url },
            { new: true }
            );

            return res.status(200).json({
            message: "Profile image uploaded and saved.",
            imageUrl: result.secure_url,
            user: updatedUser,
            });
        }
        );

        uploadStream.end(req.file.buffer);
    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ error: "Server error during upload." });
    }
});

export default cloudinaryRouter;
