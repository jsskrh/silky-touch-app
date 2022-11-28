import { getSession } from "next-auth/react";
import Stripe from "stripe";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Signin required");
  }

  try {
    setLoading(true);
    successInit();
    const data = async () => {
      try {
        const { data } = await axios.post(
          `/api/sessions/stripe/${router.query.session_id}`
        );
        const paymentResult = {
          id: data.id,
          email_address: data.customer_details.email,
          status: data.payment_intent.status,
        };
        saveOrder(paymentResult);
      } catch (err) {
        handleError();
      }
    };
    data();
    setLoading(false);
    res.status(200).send(checkoutSession);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
