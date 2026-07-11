const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("Mongo URI:", uri);

    if (!uri) {
      throw new Error("MONGO_URI is not set in environment (.env)");
    }

    await mongoose.connect(uri);

    console.log("Connected Database:", mongoose.connection.name);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;

