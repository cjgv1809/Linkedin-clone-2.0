import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@linkedin-clone-1809.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

if (!connectionString) {
  throw new Error("Please define a valid connection string value");
}

const connectDB = async () => {
  // verify if the connection is already open
  if (mongoose.connection?.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    console.log("----Connecting to MongoDB----");
    await mongoose.connect(connectionString);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;
