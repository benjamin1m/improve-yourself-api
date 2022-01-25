const Objectif = require("../models/Objectif");
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
        let objectifs = await Objectif.find();
        
        context.res = {
            // status: 200, /* Defaults to 200 *
            body: objectifs,
            contentType: 'application/json'
        };
    } catch (err) {
        context.res = {
            body: err,
            status: 400
        };
    }
}