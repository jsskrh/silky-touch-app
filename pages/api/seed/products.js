import Product from "../../../models/product";
import data from "../../../utils/data";
import db from "../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "Seeded successfully" });
};

export default handler;
