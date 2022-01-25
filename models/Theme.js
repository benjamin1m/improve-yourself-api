const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let themeSchema = new Schema(
    { name: String, color: String}
);

let Theme = mongoose.model("themes", themeSchema);

module.exports = Theme;