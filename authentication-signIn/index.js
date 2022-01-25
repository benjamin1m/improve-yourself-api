const User = require("../models/User");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require("../config");

const dbUrl = config.dbUrl;

let options = {
    keepAlive: 1,
    connectTimeoutMS: 3000000000,
    useUnifiedTopology: true,
};

module.exports = async function (context, req) {
    
    mongoose.connect(dbUrl, options, (err) => {
        if (err) {
            context.res = {
                body: err,
                status: 500
            };
            return;
        };
    });

    const email = (req.query.email || (req.body && req.body.email));
    const password = (req.query.password || (req.body && req.body.password));
    const user = await User.findOne({email: email});

    if(!user) {
        context.res = {
            status: 401,
            body: "Authentication failed. No user found."
        };
        return;
    }

    if (!user || !user.comparePassword(password)) {
        context.res = {
            status: 401,
            body: "Authentication failed. Invalid user or password."
        };
        return;
    }

    const token = jwt.sign({ username: user.username, email: user.email, _id: user._id}, 'RESTFULAPIs');
    
    context.res = {
        status: 200, 
        body: token
    };
}