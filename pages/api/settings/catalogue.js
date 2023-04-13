import Category from "../../../models/category";
import db from "../../../utils/db";

const handler = async (req, res) => {
  try {
    await db.connect();
    const categories = await Category.find({ type: "subcategory" })
      .populate({
        path: "subcategories",
      })
      .lean();

    return res.status(201).send(categories);
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
