import express from 'express';
const router = express.Router();

// logout
router.post("/logout", ( req , res )  => {
    req.session.destroy((err) => {
        
        if (err) {
            return res.status(500).json({ message: "Logout Failed"});
        }

        res.json({ message: "Logout Successful "});
    })

});