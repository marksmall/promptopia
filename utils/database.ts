import mongoose from "mongoose";

let isConnected = false;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw Error("MONGODB URL Environment Variable must be set for this app to work");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompts",
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Problem connecting to MongoDB: ", error);
    throw error;
  }
};
