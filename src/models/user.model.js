export default class UserModel{

    constructor(name, email, password){
        this.id = users.length+1,
        this.name=name,
        this.email = email,
        this.password = password
    }

    static get(){
        return users;
    }

    static getbyEmail(email){
        return users.find((user)=> user.email == email.toLowerCase());
    }

    static add(name, email, password){
        let user = new UserModel(name, email, password);
        users.push(user);
        console.log(users);
    }

    static login(email, password){
        let user = users.find((user)=> user.email == email && user.password == password);
        return user;
    }

}

var users =[ 

];