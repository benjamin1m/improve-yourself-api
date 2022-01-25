const Theme = require("../models/Theme");
const mongoose = require("mongoose");

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
    
    
    try {
        let themes = await Theme.find();
        
        context.res = {
            // status: 200, /* Defaults to 200 *
            body: themes,
            contentType: 'application/json'
        };
    } catch (err) {
        context.res = {
            body: err,
            status: 400
        };
    }
}