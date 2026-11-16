const isAuthenticated =  (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect("/user/login");

}


export {
    isAuthenticated
}