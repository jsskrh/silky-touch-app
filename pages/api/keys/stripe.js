import { loadStripe } from "@stripe/stripe-js/pure";
import { getSession } from "next-auth/react";

// let stripePromise;

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Signin required");
  }
  res.send(process.env.STRIPE_PUBLISHABLE_KEY || "sb");
};

export default handler;
