const express = require('express');
const app = express();
const session = require('express-session');
const pbkdf2 = require('pbkdf2'); //encryption
const models = require('./models');

require('dotenv').config();//initialize dotenv to use environment variables


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//encryption middleware function
function encryptPassword(req, res, next){
    if(req.body.password){
    var key = pbkdf2.pbkdf2Sync(
        req.body.password, process.env.PASSWORD_SALT, 3600, 256, 'sha256'
    );

    var hash = key.toString('hex');
    req.body.password = hash;
    next();
    }else{
        res.send('Please add password');
    }
}


app.get('/', function(req, res){
    res.send(process.env.HELLO_MESSAGE);
});

app.post('/sign-up', encryptPassword, function(req, res){
    models.user.create({ username: req.body.username, password: req.body.password})
    .then(function (user){
        console.log('new user created: ', user);
        res.send(user);
    })
});

app.listen(process.env.PORT, function(){
    console.log(`My API is listening to port ${process.env.PORT}`)
});