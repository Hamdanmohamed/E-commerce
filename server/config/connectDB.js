import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected sucessfully");
  } catch (error) {
    console.log("connecting to MongoDB failed");
    process.exit(1);
  }
};
