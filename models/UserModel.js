const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Blog-App");
}

const UserSchema = mongoose.Schema({
  user_firstName: {
    type: String,
    required: true,
  },
  user_lastName: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_type: {
    enum: [],
  },
});
