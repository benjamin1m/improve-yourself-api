let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

/**
 * User Schema
 */
let userSchema = new Schema(
    { username: String, email: String, hash_password: String, created: Date }
);

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

let User = mongoose.model('users', userSchema);

module.exports = User;