let isAdmin=(req,res,next)=>{
    if (req.isAuthenticated() && req.user.modelName === 'Admin'){
        next();
    }
}


let familyMiddleware=(req,res,next)=>{
    if (req.isAuthenticated() && req.user.modelName === 'Family'){
        next();
    }
}
export default {isAdmin,familyMiddleware};
