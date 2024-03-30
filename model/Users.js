const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  googleId: String,
});

module.exports = mongoose.model("User", userSchema);
