import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
// import User from "../../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// // Log Cloudinary config to verify environment variables
// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer with file type and size validation
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(file.originalname.split(".").pop().toLowerCase());
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error("Only JPEG, JPG, and PNG files are allowed."));
//   },
// });

// const cloudinaryRouter = express.Router();

// // Route to upload an image and update the user's profile picture
// cloudinaryRouter.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     // Get user ID from session or body
//     const userId = req.session.user?._id || req.body.userId;
//     if (!userId) {
//       return res.status(400).json({ error: "User  ID is missing." });
//     }

//     // Verify user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User  not found." });
//     }

//     // Check for uploaded file
//     if (!req.file) {
//       return res.status(400).json({ error: "No image file uploaded." });
//     }

//     // Upload to Cloudinary
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: "profile-pictures" },
//       async (error, result) => {
//         if (error) {
//           console.error("Cloudinary Error:", error);
//           return res.status(500).json({ error: "Image upload failed.", details: error.message });
//         }

//         // Update user with new image URL
//         const updatedUser  = await User.findByIdAndUpdate(
//           userId,
//           { profileImgUrl: result.secure_url },
//           { new: true }
//         );

//         return res.status(200).json({
//           message: "Profile image uploaded and saved.",
//           imageUrl: result.secure_url,
//           user: updatedUser ,
//         });
//       }
//     );

//     // Stream the file buffer to Cloudinary
//     uploadStream.end(req.file.buffer);
//   } catch (err) {
//     console.error("Server error:", err);
//     return res.status(500).json({ error: "Server error during upload.", details: err.message });
//   }
// });

export default cloudinaryRouter;
