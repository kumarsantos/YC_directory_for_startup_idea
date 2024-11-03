import { Schema, model, models } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
  },
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
  imageUrl: {
    type: String,
    default: "https://testing.png",
  },
  bio: {
    type: String,
    required: [true, "Bio is mandatory"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Authors = models.Authors || model("Authors", authorSchema);

export default Authors;
