const unauthFailSafe = (req, res, next) => {
    if (req.session.user) {
        console.log("Authorized access attempt detected.");
        return res.status(302).redirect("/shop"); // Redirect to shop page if user is authenticated
    }
    else {
        console.log("Unauthorized access attempt detected.");
        return res.redirect("/auth/login"); // Redirect to login page
    }
    next(); // Proceed to the next middleware or route handler
};

export default unauthFailSafe;
