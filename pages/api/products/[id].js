import Product from "../../../models/product";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  // Handle GET request
  if (req.method === "GET") {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();

    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
    return;
  }

  // Handle DELETE request
  if (req.method === "DELETE") {
    // Check if user is authenticated and is an admin
    if (!session || !session.user.isAdmin) {
      return res.status(401).send({ message: "Admin authentication required" });
    }

    await db.connect();

    const product = await Product.findById(req.query.id);
    if (product) {
      await product.remove();
      await db.disconnect();
      res.status(200).send({ message: "Product deleted successfully" });
    } else {
      await db.disconnect();
      res.status(404).send({ message: "Product not found" });
    }
    return;
  }

  // Return error for unsupported methods
  res.status(405).send({ message: `Method ${req.method} not allowed` });
};

export default handler;
