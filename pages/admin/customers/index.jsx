import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import Table from "../../../components/Admin/Table";
import Empty from "../../../components/Bag/Empty";
import Layout from "../../../components/Layout/Layout";
import PageTitle from "../../../components/PageTitle";
import Logout from "../../../components/Profile/Logout";
import TopContactUs from "../../../components/TopContactUs";
import { getError } from "../../../utils/error";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, customers: action.payload, error: "" };
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

const allCustomers = () => {
  const [{ loading, error, customers }, dispatch] = useReducer(reducer, {
    loading: true,
    customers: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/customers");
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
    <Layout title="Customers" bgColor={`bg-[#f5f5f5]`}>
      {!isMobile && <TopContactUs />}
      <PageTitle title="Customers" />
      <Logout />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : customers.length === 0 ? (
        <Empty title="No Records Found." text="No customers available yet" />
      ) : (
        <div className={style.tableContainer}>
          <Table customers={customers} />
        </div>
      )}
      <div className={style.mobileSeparator}></div>
      {isMobile && <TopContactUs isMobile />}
    </Layout>
  );
};

allCustomers.auth = true;

export default allCustomers;
