import Product from "../../../models/product";
import db from "../../../utils/db";

const handler = async (req, res) => {
  await db.connect();

  const { query } = req.query;
  const queryObj = {
    $or: [
      { name: { $regex: query, $options: "i" } }, // Search for query in the name field (case-insensitive)
      { brand: { $regex: query, $options: "i" } }, // Search for query in the brand field (case-insensitive)
      { category: { $regex: query, $options: "i" } }, // Search for query in the category field (case-insensitive)
      { subcategory: { $regex: query, $options: "i" } }, // Search for query in the subcategory field (case-insensitive)
      { subSubcategory: { $regex: query, $options: "i" } }, // Search for query in the subSubcategory field (case-insensitive)
      //   { colors: { $regex: query, $options: "i" } }, // Search for query in the colors array (case-insensitive)
    ],
  };

  const product = await Product.find(queryObj).limit(4);
  await db.disconnect();

  res.send(product);
};

export default handler;
