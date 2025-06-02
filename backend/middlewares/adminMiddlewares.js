let isAdmin=(req,res,next)=>{
    if (req.isAuthenticated() && req.user.modelName === 'Admin'){
        next();
    }
}
export default {isAdmin};