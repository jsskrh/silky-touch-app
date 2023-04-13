import mongoose from "mongoose";

const connection = {};
const uri = process.env.MONGODB_URI;
const localURI = "mongodb://127.0.0.1:27017/luxury_store_app";

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

const convertDocsToObj = (doc) => {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt ? doc.createdAt.toString() : null;
  doc.updatedAt = doc.updatedAt ? doc.createdAt.toString() : null;
  return doc;
};

const stringifyProducts = (product) => {
  const imagesStringified = product.images.map((image) => {
    return {
      ...image,
      _id: image._id.toString(),
    };
  });

  return {
    ...product,
    images: imagesStringified,
  };
};

const stringifyCategories = (category) => {
  const subcategoriesStringified = category.subcategories.map((subcategory) => {
    return subcategory.toString();
  });

  return {
    ...category,
    subcategories: subcategoriesStringified,
  };
};

const db = {
  connect,
  disconnect,
  convertDocsToObj,
  stringifyProducts,
  stringifyCategories,
};

export default db;
