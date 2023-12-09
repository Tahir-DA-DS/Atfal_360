const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  FullName:{ type: String},
  Age: {type: Number},
  Region: {type: String},
  State: {type: String},
  Dila: {type: String},
  Muqam: {type: String}
});




module.exports = mongoose.model('User_atfal', userSchema);