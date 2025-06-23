import express from 'express';
import session from 'express-session';

const app = express.Router();

app.get('api/session/check', (req, res) => {

    if (req.session && req.session.user) {
        // User is logged in
        res.status(200).json({ isLoggedIn: true, user: req.session.user });
    } else {
        // User is not logged in
        res.status(200).json({ isLoggedIn: false });
    }

});



export default app;