import { Schema, model, models } from "mongoose";

const startupSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.ObjectId,
    ref: "authors",
    required: [true, "Author is mandatory"],
  },
  views: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    default: "testing",
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  pitch: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Startups = models.Startups || model("Startups", startupSchema);

export default Startups;
