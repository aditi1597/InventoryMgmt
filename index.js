import ProductController from "./src/controllers/product.controller.js"
import express from "express";
import ejsLayouts from 'express-ejs-layouts';
import validateRequest from "./src/middlewares/validatingForm.js"
import {uploadFile} from './src/middlewares/file-upload.js';
import path from "path";
import UserController from "./src/controllers/user.controller.js";
import userValidation from "./src/middlewares/userValidation.js";
import session from 'express-session';
import { auth } from "./src/middlewares/auth.middleware.js";

// const express = require("express");
//create server
const server = express();

//public
server.use(express.static('public'));

//parse form data
server.use(express.urlencoded({extended: true}));
server.use(session({
    secret: "SecreyKey",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}, 
}))

//set viewengine

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(),"src", "views"));

//ejh layout
server.use(ejsLayouts);

//create productController instance
const productController = new ProductController();
const userController = new UserController();
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);

server.get("/logout", userController.logoutUser);

server.get("/", auth, productController.getProducts);
server.get("/new", auth, productController.getAddForm);
server.get('/update-product/:id', auth, productController.getUpdateProductView);
server.post('/delete-product/:id', auth, productController.deleteProduct);

server.post("/", auth, uploadFile.single("url") ,validateRequest, productController.addNewProduct);
server.post('/update-product', auth, uploadFile.single("url") , productController.updateProduct, productController.getProducts);
server.post("/register", userValidation, userController.registerUser);
server.post("/login", userController.loginUser);


server.use(express.static("src/views"));

server.listen(3200, ()=>{
    console.log("Server is running on 3200")
});