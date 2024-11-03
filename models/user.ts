import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is mandatory"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
  profilePic: {
    type: String,
    default: "https://user.png",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
