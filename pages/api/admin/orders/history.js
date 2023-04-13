import { getSession } from "next-auth/react";
import Order from "../../../../models/order";
import User from "../../../../models/user";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "Sign in required" });
  }

  const { user } = session;
  if (!user.isAdmin) {
    return res.status(401).send({ message: "Sign in required" });
  }

  await db.connect();
  const orders = await Order.find();
  const populatedOrders = await Promise.all(
    orders.map(async (order) => {
      const user = await User.findById(order.user);
      return {
        ...order.toJSON(),
        user: user.name,
      };
    })
  );
  await db.disconnect();
  res.send(populatedOrders);
};

export default handler;
