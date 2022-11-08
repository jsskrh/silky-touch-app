import mongoose from "mongoose";

const connection = {};
const uri = process.env.MONGODB_URI;
const localURI = "mongodb://localhost:27017/luxury-store-app";

const connect = async () => {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(uri);
  console.log("New Connection");
  connection.isConnected = db.connections[0].readyState;
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("Not disconnected");
    }
  }
};

const db = { connect, disconnect };

export default db;
