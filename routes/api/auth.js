import express from "express";
import bcrypt from "bcrypt";
import unauthFailSafe from "../../middleware/unauthFailSafe.js";
import User from "./../../models/user.js"

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


// add item to user cart
// add unauthorized fail safe later
userRouter.post("/users/:id/cart", async (req, res) => {
    const userId = req.params.id;
    const item = req.body.item;

    try {
        const user = await User.findById(userId);

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        // Check if item with same productId already exists in cart
        const existingIndex = user.cart.findIndex(
        (cartItem) => cartItem.productId === item.productId
        );

        if (existingIndex !== -1) {
            // If item exists, increase quantity
            user.cart[existingIndex].quantity += item.quantity;
        } else {
            // Else, add item
            user.cart.push(item);
        }

        await user.save();

        res.status(200).json({ message: "Cart updated", cart: user.cart });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});


// GET /users/:id/cart - Retrieve all items in a user's cart
userRouter.get("/users/:id/cart", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cart = user.cart;

        // render cart
        res.render("checkout/index", {cart});

        // res.status(200).json({ cart: user.cart });
    } catch (e) {
        console.error("Error retrieving cart:", e.message);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /users/:id/cart/:itemId
userRouter.delete("/users/:userId/cart/:productId", async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const beforeCount = user.cart.length;

        user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString());

        const afterCount = user.cart.length;

        if (beforeCount === afterCount) {
        return res.status(404).json({ message: "Item not found in cart" });
        }

        await user.save();

        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

export default userRouter;