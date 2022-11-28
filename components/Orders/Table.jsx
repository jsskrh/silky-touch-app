import { useRouter } from "next/router";

const style = {
  table: `w-full md:w-[85%] table-fixed`,
  tableHead: `font-bold border-b border-[#dbdcdc] uppercase text-xs`,
  headCell: `py-6`,
  tableBody: `text-sm`,
  tableRow: `border-b border-[#dbdcdc] hover:font-bold transition-all cursor-pointer`,
  tableCell: `py-6 text-center`,
  status: `font-bold uppercase text-xs`,
  //   button: `w-fit border px-[10px] py-[10px] text-xs font-bold uppercase bg-[#212121] border-[#212121] text-[#ededed] align-center`,
};

const Table = ({ orders }) => {
  const router = useRouter();

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
      var ampm = hours <= 12 ? "AM" : "PM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var minCont = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minCont + " " + ampm;
      return strTime;
    };
    return gbDate + " at " + convertTime(date);
  };

  const formatCurrency = (number) => {
    const price = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "USD",
    }).format(number);
    return price;
  };

  return (
    <table className={style.table}>
      <thead className={style.tableHead}>
        <tr>
          <th className={style.headCell}>ID</th>
          <th className={style.headCell}>Date</th>
          <th className={style.headCell}>Total</th>
          <th className={style.headCell}>Status</th>
        </tr>
      </thead>
      <tbody className={style.tableBody}>
        {orders
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .map((order) => (
            <tr
              key={order._id}
              className={style.tableRow}
              onClick={() => router.push(`/orders/${order._id}`)}
            >
              <td className={style.tableCell}>{order._id.slice(19, 24)}</td>
              <td className={style.tableCell}>
                {convertDate(order.createdAt)}
              </td>
              <td className={style.tableCell}>
                {formatCurrency(order.totalPrice)}
              </td>
              <td className={`${style.tableCell} ${style.status}`}>
                {order.isPaid
                  ? order.isDelivered
                    ? " Delivered"
                    : "Paid"
                  : "Not Paid"}
              </td>
              {/* <td className={style.tableCell}>
                      {order.isPaid ? (
                        order.isDelivered ? (
                          <div className={style.button}>Delivered</div>
                        ) : (
                          <div className={style.button}>Paid</div>
                        )
                      ) : (
                        <div className={style.button}>Not Paid</div>
                      )}
                    </td> */}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
