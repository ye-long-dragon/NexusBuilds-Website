import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import User from "../../models/user.js";


const router = express.Router();

//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});




//create user
router.post("/user",async (req, res) => {
    const {username, email, password} = req.body;

    try{
        // Check if the user already exists
        const existingUser  = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser ) {
            return res.status(400).json({ message: "User  already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        // Create the user
        const result = await User.create({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            userAuth: "user", // Default user role
        });
         // Respond with success
        res.status(201).json({ message: "User  created successfully", user: result });
    }
    catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) { // MongoDB duplicate key error code
            return res.status(400).json({ message: "User  already exists" });
        }
        // Handle other errors
        res.status(500).json({ message: error.message, error: error.message });
        console.error("Error creating user:", error.message);
    }
});

// Get user by email
router.get('/users/email/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login route
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Store user details in session
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            birthDate: user.birthDate,
            userAuth: user.userAuth,
            pfp: user.pfp,
            paymentOption: user.paymentOption
        };        

        res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get user details
router.get("/users/:username", async (req, res) => {

    const {id} = req.params;

    try {
        const user = await User.where({_id: id}).findOne();

        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            birthDate: user.birthDate,
            userAuth: user.userAuth,
            pfp: user.pfp,
            paymentOption: user.paymentOption
        }
    }catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }

});

//update user
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { username, email, password, birthDate, pfp, paymentOption } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update user details
        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            user.password = bcrypt.hashSync(password, 10); // Hash the new password
        }
        user.birthDate = birthDate || user.birthDate;
        user.pfp = pfp || user.pfp;
        user.paymentOption = paymentOption || user.paymentOption;

        // Save the updated user
        const updatedUser = await user.save();
        
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//logout
router.post("/logout",(req,res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logged out successfully');
    });
})


export default router;