import { getSession } from "next-auth/react";
import Order from "../../../../models/order";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Error: Signin required");
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: "Error: Order is already paid" });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = order.save();
    db.disconnect();

    res.send({ message: "Order paid successfully", order: paidOrder });
  } else {
    db.disconnect();
    res.status(404).send({ message: "Error: Order not found" });
  }
};

export default handler;
