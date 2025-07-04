import express from "express";
import Payment from "../../models/Payment.js"; // Ensure this path is correct
// import User from "../../models/user.js"; // Ensure this path is correct
import bcrypt from "bcryptjs"; // For hashing

const router = express.Router();

// Create a payment option
// router.post("/paymentOptions", async (req, res) => {
//     const { userId, paymentId, paymentMethod, address, phone } = req.body;

//     try {
//         // Check if the user exists
//         const existingUser  = await User.findById(userId);
//         if (!existingUser ) return res.status(404).json({ message: "User  not found" });

//         // Create the payment option with hashed fields
//         const newPaymentOption = new Payment({
//             userId,
//             paymentId: bcrypt.hashSync(paymentId, 10), // Hashing paymentId for security
//             paymentMethod: bcrypt.hashSync(paymentMethod, 10), // Hashing paymentMethod for security
//             address: bcrypt.hashSync(address, 10), // Hashing address for security
//             phone: bcrypt.hashSync(phone, 10) // Hashing phone for security
//         });

//         const savedPaymentOption = await newPaymentOption.save();
//         res.status(201).json(savedPaymentOption);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Update a payment option
// router.put("/paymentOptions/:id", async (req, res) => {
//     const { userId, paymentId, paymentMethod, address, phone } = req.body;

//     try {
//         // Hash the fields again before updating
//         const updatedPaymentOption = await Payment.findByIdAndUpdate(
//             req.params.id,
//             {
//                 userId,
//                 paymentId: bcrypt.hashSync(paymentId, 10),
//                 paymentMethod: bcrypt.hashSync(paymentMethod, 10),
//                 address: bcrypt.hashSync(address, 10),
//                 phone: bcrypt.hashSync(phone, 10)
//             },
//             { new: true }
//         );

//         if (!updatedPaymentOption) return res.status(404).json({ message: "Payment option not found" });
//         res.status(200).json(updatedPaymentOption);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// //get payment option using POST method
// router.post("/paymentOptions/user/:userId", async (req, res) => {
//     try {
//         const paymentOptions = await Payment.find({ userId: req.params.userId });
//         if (paymentOptions.length === 0) return res.status(404).json({ message: "No payment options found for this user" });
//         res.status(200).json(paymentOptions);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Delete a payment option
// router.delete("/paymentOptions/:id", async (req, res) => {
//     try {
//         const deletedPaymentOption = await Payment.findByIdAndDelete(req.params.id);
//         if (!deletedPaymentOption) return res.status(404).json({ message: "Payment option not found" });
//         res.status(200).json({ message: "Payment option deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

export default router;
