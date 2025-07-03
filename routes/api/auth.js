import express from "express";
import bcrypt from "bcrypt";
import User from "../../models/User.js"; // Ensure this path is correct based on your project structure

const userRouter = express.Router();

// get all users
userRouter.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get user
userRouter.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password." });
        }

        // Store only non-sensitive fields in session
        req.session.user = {
        id: user._id,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        address: user.address,
        phone: user.phone,
        country: user.country
        };

        res.status(200).json({
        message: "Login successful",
        username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// post user
userRouter.post("/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password) {
        return res.status(400).json({ message: "Password is required." });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            username: username,
            email: email,
            password: hashedPassword
        };

        const result = await User.create(user);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update user
userRouter.put("/users/:email", async (req, res) => {
    try {
        //update the user with the given email
        const result = await User.updateOne(
        { email: req.session.user.email},
        {
            $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            address: req.body.address,
            phone: req.body.phone,
            country: req.body.country,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            },
        }
        );

        return res.status(200).json({ message: "User updated successfully." });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// logout user
userRouter.post("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        return res.status(500).json({ message: "Logout Failed" });
        }

        return res.json({ message: "Logout Successful" });
    });

});


export default userRouter;