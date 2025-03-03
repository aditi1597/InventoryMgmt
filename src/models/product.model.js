export default class ProductModel{
    constructor(id, name, desc, price, url)
    {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.url = url;
    }

    static get(){
        // console.log("Get by Product models: ", products);
        return products;
    }

    static add(name, desc, price, imageUrl){
        let newProduct = new ProductModel(
            products.length+1, 
            name, 
            desc, 
            price, 
            imageUrl);

        products.push(newProduct);
    }

    static getById(id){
        return products.find((product)=> product.id == id);
    }

    static update(id, name, desc, price, imageUrl){

        const index = products.findIndex((p) => p.id == id);
        const productObj = new ProductModel(id, name, desc, price, imageUrl);
       products[index] = productObj;

    }

    static delete(id){
        const index = products.findIndex((p) => p.id == id);
        products.splice(index,1);
    }

}


var products = [
    new ProductModel(1, "Atomic Habits", "A sepremely practical and useful book", "300", "https://m.media-amazon.com/images/I/81F90H7hnML._SL1500_.jpg"),
    new ProductModel(2, "Men are From Mars", "The book says number of things that can help in making a relationship healthy.", "280", "https://m.media-amazon.com/images/I/81RfW9mFkEL.jpg")
]
