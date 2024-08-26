const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  document: {
    type: Buffer,
    required: true,
  },
  ContentType: {
    type: String,
    required: true,
  },
  docName: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.model("User", userModel);
module.exports = userSchema;
