import { getSession } from "next-auth/react";
import Category from "../../../../../models/category";
import db from "../../../../../utils/db";
import { slugify } from "../../../../../utils/helpers";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Sign in required");
  }
  const { user } = session;
  if (!user.isAdmin) {
    return res.status(401).send({ message: "Not authorized" });
  }
  try {
    await db.connect();
    const { parentId, ...details } = req.body;
    const newCategory = new Category(details);
    newCategory.slug = slugify(newCategory.name);

    if (parentId) {
      await Category.findByIdAndUpdate(parentId, {
        $addToSet: { subcategories: newCategory._id },
      });
    }

    const category = await newCategory.save();
    return res.status(201).send(category);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export default handler;
