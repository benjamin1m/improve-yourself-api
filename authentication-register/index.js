const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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

    const username = (req.query.username || (req.body && req.body.username));
    const email = (req.query.email || (req.body && req.body.email));
    const password = (req.query.password || (req.body && req.body.password));
    const date = Date.now();

    let user = new User({username: username, email: email, hash_password: password, created: date});
    user.hash_password = bcrypt.hashSync(password, 10);

    try {
        let result = await user.save();

        context.res = {
            // status: 200, /* Defaults to 200 *
            body: result,
            contentType: 'application/json'
        };
    } catch (err) {
        context.res = {
            body: err,
            status: 400
        };
    }
}