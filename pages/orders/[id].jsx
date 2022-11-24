import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { getError } from "../../utils/error";
import OrderSummary from "../../components/OrderSummary";
import ShippingSummary from "../../components/Payment/ShippingSummary";
import PaymentMethod from "../../components/Confirmation/PaymentMethod";
import PageNavigation from "../../components/ProductPage/PageNavigation";

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
  header: `py-5`,
  pageTitle: `font-bold uppercase text-lg capitalize`,
  createdAt: `text-xs`,
  pageContent: `grid grid-cols-1 md:grid-cols-4`,
  leftSection: `md:col-span-3 md:mr-10`,
  statusSummary: `mb-[22px] px-[22px] py-[27px] bg-[#f5f5f5] text-[0.80rem]`,
  statusHeader: `mb-[30px] flex justify-between`,
  statusTitle: `uppercase font-bold`,
  detail: `mb-1`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
};

const OrderPage = () => {
  const { query } = useRouter();
  const router = useRouter();

  const orderId = query.id;
  const path = router.asPath;

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

  const convertDate = (zuluDate) => {
    var date = new Date(zuluDate);
    var gbDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const convertTime = (date) => {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "AM" : "PM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var minCont = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minCont + " " + ampm;
      return strTime;
    };
    return gbDate + " at " + convertTime(date);
  };

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
    createdAt,
  } = order;

  return (
    <Layout title={`Order ${orderId}`}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <PageNavigation path={path} />

          <div className={style.header}>
            <h1 className={style.pageTitle}>Order ID: {orderId}</h1>
            <span className={style.createdAt}>{convertDate(createdAt)}</span>
          </div>

          <div className={style.pageContent}>
            <div className={style.leftSection}>
              <OrderSummary confirmation orderItems={orderItems} />
            </div>
            <div className={style.rightSection}>
              <OrderSummary
                confirmation
                orderSummary
                subtotal={subtotal}
                shippingPrice={shippingPrice}
                totalPrice={totalPrice}
                tax={tax}
              />
              <ShippingSummary
                orderShippingAddress={shippingAddress}
                isDelivered={isDelivered}
                deliveredAt={deliveredAt}
                convertDate={convertDate}
              />
              <PaymentMethod
                orderPaymentMethod={paymentMethod}
                isPaid={isPaid}
                paidAt={paidAt}
                convertDate={convertDate}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

OrderPage.auth = true;
export default OrderPage;
