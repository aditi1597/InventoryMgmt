export default function validateRequest(req, res, next){
console.log(req);

const {name, price} = req.body;
        let errors=[];

        if(!name || name.trim()==""){
            errors.push("Inavlid name");
        }
        
        if(price<0 || price.trim()==""){
            errors.push("Price cannot be less than zero");
        }

       try{
        const validUrl = req.file.filename;
       }
       catch(err){
        errors.push("Choose an image file");
       }

    console.log(errors);

       if(errors.length>0){
        return res.render("new-products", {errorMessage : errors[0]});
       }


       next();
    }
