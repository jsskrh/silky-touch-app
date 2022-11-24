import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { getError } from "../../utils/error";
import OrderSummary from "../../components/OrderSummary";
import ShippingSummary from "../../components/Payment/ShippingSummary";
import PaymentMethod from "../../components/Confirmation/PaymentMethod";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
      break;

    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
      break;

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
      break;

    default:
      state;
  }
}

const style = {
  pageContent: `grid grid-cols-1 md:grid-cols-4`,
  leftSection: `md:col-span-3 md:mr-10`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
};

const OrderPage = () => {
  const { query } = useRouter();
  const orderId = query.id;

  const [
    { loading, error, order /* successPay, loadingDeliver, successDeliver */ },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    subtotal,
    tax,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Order ${orderId}`}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>Order ID: {orderId}</h1>
          <div className={style.pageContent}>
            <div className={style.leftSection}>
              <OrderSummary
                confirmation
                orderItems={orderItems}
                subtotal={subtotal}
                shippingPrice={shippingPrice}
                totalPrice={totalPrice}
                tax={tax}
              />
            </div>
            <div className={style.rightSection}>
              <ShippingSummary orderShippingAddress={shippingAddress} />
              <PaymentMethod orderPaymentMethod={paymentMethod} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

OrderPage.auth = true;
export default OrderPage;
