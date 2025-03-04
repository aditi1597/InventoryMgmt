import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController{
    getProducts(req, res){
        let product = ProductModel.get();
        console.log(product);
        
        res.render("products", {products: product, userEmail: req.session.userEmail})
    }

    getAddForm(req, res){
       return res.render("new-products", {errorMessage : null, userEmail: req.session.userEmail});
    }

    addNewProduct(req,res){
        //access data from form
        const imageUrl = "images/" + req.file.filename;
        const {name, desc, price} = req.body;
        ProductModel.add(name, desc, price, imageUrl);
        let product = ProductModel.get();
        return res.render("products", {products: product, userEmail: req.session.userEmail})
    }

    getUpdateProductView(req, res, next){
        const id = req.params.id;
        let productFound = ProductModel.getById(id);
        if(productFound){
            return res.render("update-product", {product: productFound, errorMessage : null, userEmail: req.session.userEmail});
        }
        else{
            res.status(401).send("Product not Found!!");
        }
    }

    updateProduct(req, res, next){
        console.log(req);

        const imageUrl = "images/" + req.file.filename;
        // const id = req.body;
        const {id, name, desc, price} = req.body;
        ProductModel.update(id, name, desc, price, imageUrl);
        // let products = ProductModel.get();
        // return res.render("products", {products: products});
        next();
    }
    
    deleteProduct(req,res, next){

        const id = req.params.id;
        console.log(id);
        ProductModel.delete(id);
        console.log("deleted from controller");
        let products = ProductModel.get();
        return res.render("products", {products: products, userEmail: req.session.userEmail});
    }
}