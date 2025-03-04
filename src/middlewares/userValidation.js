import {body, validationResult} from "express-validator"

export default async function userValidation(req, res, next) {
    
    await Promise.all([

        body("name").notEmpty().withMessage("Name should not be Empty!!").run(req),
        body("email").isEmail().withMessage("Invalid Email").run(req),
        body("password").notEmpty().withMessage("Please enter a Password").run(req),
        body("password").isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage("Please choose a strong Password").run(req)
    ])

    const errors = validationResult(req);
    const msgArray = errors.errors;

    msgArray.forEach(err => {
        console.log(err.msg);
    });

    if(!errors.isEmpty()){
        return res.render("register", {errorMessage: msgArray});
    }

    next();
}