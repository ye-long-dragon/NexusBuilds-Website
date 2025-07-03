import express from 'express';
import unauthFailSafe from '../../middleware/unauthFailSafe.js'; // Adjust the import path as necessary

const userProfile = express.Router();

// unauthFailSafe

// Use the unauthFailSafe middleware to protect the route
userProfile.get('/' ,unauthFailSafe, (req, res) => {
    // Safely extract user data with defaults
    const user = req.session.user || {};

    console.log('Current session user:', user);
    
    // Render the template with user data
    res.render('Userprofile/index', {
        user
    })
});

export default userProfile;