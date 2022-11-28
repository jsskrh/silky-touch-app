import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Signin required");
  }
  res.send(process.env.PAYSTACK_PUBLIC_KEY || "sb");
};

export default handler;
