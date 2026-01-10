import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed in connected to DB");
    process.exit(1);
  }
};
