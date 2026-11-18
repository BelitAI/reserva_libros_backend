const isAdmin = (req, res, next)=>{
    if (req.session.user && req.session.user.role === true) {
        return next();
    }
    return res.redirect("/user/403");
}

export {
    isAdmin
}