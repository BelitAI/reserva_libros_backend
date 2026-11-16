const isAuthenticated = async(req,res,next) =>{
    if(req.session.user){
        next();
    }else{
        res.redirect("/user/login");
    }
}


export {
    isAuthenticated
}