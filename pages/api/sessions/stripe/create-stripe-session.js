import { getSession } from "next-auth/react";
import Stripe from "stripe";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Signin required");
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const params = {
      submit_type: "pay",
      payment_method_types: ["card"],
      line_items: [
        {
          name: "Complete Purchase",
          amount: req.body.amount,
          currency: "USD",
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/confirm-order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
    };
    const checkoutSession = await stripe.checkout.sessions.create(params);
    res.status(200).send(checkoutSession);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
