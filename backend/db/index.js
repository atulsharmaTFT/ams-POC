const mongoose = require("mongoose");
const { MAIN_DB_NAME } = require("../constants.js");

// export let db = undefined;

const connectDB = (DB_NAME = MAIN_DB_NAME) => {
  try {
    const connectionInstance = mongoose.createConnection(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\nMongoDB Connected! Db: ${DB_NAME}\n`);
    return connectionInstance;
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
