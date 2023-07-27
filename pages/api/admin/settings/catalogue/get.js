import { getSession } from "next-auth/react";
import Category from "../../../../../models/category";
import User from "../../../../../models/user";
import db from "../../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "Sign in required" });
  }

  const { user } = session;
  if (!user.isAdmin) {
    return res.status(401).send({ message: "Sign in required" });
  }

  console.log(req.body.category);

  await db.connect();
  const subcategory = await Category.findOne({ name: req.body.category })
    .populate({ path: "subcategories" })
    .lean();
  //   const populatedOrders = await Promise.all(
  //     orders.map(async (order) => {
  //       const user = await User.findById(order.user);
  //       return {
  //         ...order.toJSON(),
  //         user: user.name,
  //       };
  //     })
  //   );
  await db.disconnect();
  res.send(subcategory);
};

export default handler;
