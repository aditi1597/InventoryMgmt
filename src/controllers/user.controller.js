import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController{

    getRegister(req, res){
        res.render("register", {errorMessage: null});
    }

    getLogin(req, res){
        res.render("login", {errorMessage: null});
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
        res.render("login", {errorMessage: null});
    }

    loginUser(req, res, next){
        const {email, password} = req.body;
        let correctCredential = UserModel.login(email, password);

        if(correctCredential){
            let product = ProductModel.get();
            res.render("products", {products: product})
        }
        else{
            res.render("login" , {errorMessage: "Invalid Credentials"})
        }

    }
}