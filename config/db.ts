import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let isConnected: boolean; // Track the connection status

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};
