import { getSession } from "next-auth/react";
import Product from "../../../../models/product";
import db from "../../../../utils/db";
import { generateSKU, slugify } from "../../../../utils/helpers";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Sign in required");
  }
  const { user } = session;
  if (!user.isAdmin) {
    return res.status(401).send({ message: "Not authoorized" });
  }
  await db.connect();
  const newProduct = new Product({ ...req.body });
  newProduct.slug = slugify(newProduct.name);
  newProduct.sku = generateSKU(
    newProduct.brand,
    "men",
    newProduct.subcategory,
    newProduct.subSubcategory
  );
  const product = await newProduct.save();
  res.status(201).send(product);
};

export default handler;
