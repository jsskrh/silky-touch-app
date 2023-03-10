import { getSession } from "next-auth/react";
import Order from "../../../models/order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Sign in required");
  }
  const { user } = session;
  await db.connect();
  const newOrder = new Order({ ...req.body, user: user._id });
  if (
    newOrder.paymentResult.status === "COMPLETED" ||
    newOrder.paymentResult.status === "success" ||
    newOrder.paymentResult.status === "succeeded"
  ) {
    newOrder.isPaid = true;
    newOrder.paidAt = Date.now();
  }
  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;
