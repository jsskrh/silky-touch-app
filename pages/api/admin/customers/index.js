import { getSession } from "next-auth/react";
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
  const users = await User.find();
  await db.disconnect();
  res.send(users);
};

export default handler;
