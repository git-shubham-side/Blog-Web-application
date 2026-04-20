import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Blog-App");
}

const WriterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    //This will create new guestID as per new Document Creation
    default: () => "guest" + Date.now(),
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "guest",
  },
});

const WriterUser = mongoose.model("WriterUser", WriterSchema);

export default { WriterUser };
