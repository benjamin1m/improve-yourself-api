const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let objSchema = new Schema(
    { name: String, description: String, isDone: Boolean}
);

let Objectif = mongoose.model("objectifs", objSchema);

module.exports = Objectif;