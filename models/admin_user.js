const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

userSchema.methods.comparePassword = function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
};
  
module.exports = mongoose.model('User_admin', userSchema);