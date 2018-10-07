const auth = require("./auth.js"),
mongoose   = require('mongoose'),
bcrypt      = require('bcrypt-nodejs'),
User        = mongoose.model('user');
jwt         = require("jsonwebtoken");

exports.signIn = function({username, password}, next){
    
        var username = username;
        var password = password;

        if(!username || !password){ throw new Error('please provide credentials');}
        return User.findOne({username})
        .then(existingUser => {
            if(!existingUser){ throw new Error("invalid credentials");}
            
            const hash = existingUser.password;
            bcrypt.compare(password, hash, function(err, response){
                if(response === false){ throw new Error("incorrect password"); }
        })
            const token =  auth.signToken(existingUser._id);
            existingUser.token = token;
            
            return existingUser;           
        })        
} 

exports.signUp = ({username, password}, next) => {
    const user = new User({username, password});
    if(!username || !password){ throw new Error('please provide credentials');}

    return User.findOne({username})
    .then(existingUser => {
        if(existingUser){ throw new Error("user already exists");}
        return user.save();
    })
    .then(user => {
        return user;
    })

}

exports.getAllUsers = () => {
    return User.find().then(data => {
        if(!data) throw new Error("can't find users");
        console.log(data);
        return data;
    }, (err) => { throw err;})
}

exports.getOneUser = (id) => {
    return User.findById(id).then(data =>{
        if(!data){ throw new Error("can't find user")};
        return data;
        
    }, (err) => { throw err;})
}