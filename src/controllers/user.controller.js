import UserModel from "../models/user.model";

export default class UserController{

    getRegister(req, res){
        res.render("register");
    }

    getUserbyEmail(req, res){
        const {email} = req.body;
        let user = UserModel.getbyEmail(email);
        if(!user){

        }
        else{
             
        }
    }

    registerUser(req, res, next){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render("register");
    }
}