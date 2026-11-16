const isAdmin = (req, res, next)=>{
    if (req.session.user && req.session.user.role === true) {
        return next();
    }
    res.redirect("/user/login");
}