import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Orders/Table";
import PageTitle from "../../components/PageTitle";
import Logout from "../../components/Profile/Logout";
import TopContactUs from "../../components/TopContactUs";
import { getError } from "../../utils/error";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const style = {
  wbContainer: `flex justify-center mb-16 text-sm`,
  wbDivider: `px-2`,
  link: `text-[#212121] hover:text-[#515151] underline`,
  tableContainer: `flex justify-center`,
  mobileSeparator: `md:hidden mb-20`,
};

const orderHistory = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/orders/history");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    fetchOrders();
  }, []);

  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout title="Order History" bgColor={`bg-[#f5f5f5]`}>
      {!isMobile && <TopContactUs />}
      <PageTitle title="Order History" />
      <Logout />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : orders.length === 0 ? (
        <div>We have no order records for this account.</div>
      ) : (
        <div className={style.tableContainer}>
          <Table orders={orders} />
        </div>
      )}
      <div className={style.mobileSeparator}></div>
      {isMobile && <TopContactUs isMobile />}
    </Layout>
  );
};

orderHistory.auth = true;

export default orderHistory;
