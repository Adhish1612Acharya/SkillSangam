let isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
}

export default {isLoggedIn};