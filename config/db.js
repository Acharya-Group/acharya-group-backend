import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to database");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); 
  }
};

export default ConnectDb;
