import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  username: String,
  password: String,
  isVerifyed: { type: Boolean, default: false },
  location: { type: String, default: "India" },
  imageUrl: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3LtPpyEGxYGWK-cFpXK3bvjQajWfoXXwnhTXY5X-xrQ&s",
  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
