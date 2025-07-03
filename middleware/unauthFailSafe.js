const unauthFailSafe = (req, res, next) => {
    if (!req.session.user) {
        // no authenticated user, fail with 401 Unauthorized
        return res.redirect("/auth/login");
    }

    next();
};

export default unauthFailSafe;  