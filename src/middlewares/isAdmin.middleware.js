const isAdmin = (req, res, next)=>{
    if (req.session.user && req.session.user.role === true) {
        return next();
    }
    return res.status(403).send("No tienes permisos para acceder");
}

export {
    isAdmin
}