const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let moduleSchema = new Schema(
    { name: String, content: String, logo: String, excerpt: String, idTheme: mongoose.Types.ObjectId}
);

let Module = mongoose.model("modules", moduleSchema);

module.exports = Module;