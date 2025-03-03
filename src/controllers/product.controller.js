import path from "path";
import productModel from '../models/product.model.js';
import ProductModel from "../models/product.model.js";

export default class ProductController{
    getProducts(req, res){
        let product = productModel.get();
        console.log(product);
        
        res.render("products", {products: product})
    }

    getAddForm(req, res){
       return res.render("new-products", {errorMessage : null});
    }

    addNewProduct(req,res){
        //access data from form
        const imageUrl = "images/" + req.file.filename;
        const {name, desc, price} = req.body;
        productModel.add(name, desc, price, imageUrl);
        let product = productModel.get();
        return res.render("products", {products: product})
    }

    getUpdateProductView(req, res, next){
        const id = req.params.id;
        let productFound = ProductModel.getById(id);
        if(productFound){
            return res.render("update-product", {product: productFound, errorMessage : null});
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
        return res.render("products", {products: products});
    }
}