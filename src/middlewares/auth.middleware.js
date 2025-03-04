
export const auth = (req, res, next)=>{
    if(req.session.userEmail){
        console.log(req.session.userEmail);
        next();
    }
    else{
        console.log("No session email found");
        res.redirect("/login");
    }
}