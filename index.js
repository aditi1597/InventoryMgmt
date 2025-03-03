import ProductController from "./src/controllers/product.controller.js"
import express from "express";
import ejsLayouts from 'express-ejs-layouts';
import validateRequest from "./src/middlewares/validatingForm.js"
import {uploadFile} from './src/middlewares/file-upload.js';
import path from "path";
import UserController from "./src/controllers/user.controller.js";

// const express = require("express");
//create server
const server = express();

//public
server.use(express.static('public'));

//parse form data
server.use(express.urlencoded({extended: true}));

//set viewengine

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(),"src", "views"));

//ejh layout
server.use(ejsLayouts);

//create productController instance
const productController = new ProductController();
const userController = new UserController();
server.get("/register", userController.getRegister);

server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.get('/update-product/:id', productController.getUpdateProductView);
server.post('/delete-product/:id', productController.deleteProduct);

server.post("/",  uploadFile.single("url") ,validateRequest, productController.addNewProduct);
server.post('/update-product', uploadFile.single("url") , productController.updateProduct, productController.getProducts);


server.use(express.static("src/views"));

server.listen(3200, ()=>{
    console.log("Server is running on 3200")
});