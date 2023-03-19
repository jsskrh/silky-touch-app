import { useRouter } from "next/router";
import { formatCurrency } from "../../utils/currency";

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

const Table = ({ customers }) => {
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

  return (
    <table className={style.table}>
      <thead className={style.tableHead}>
        <tr>
          <th className={style.headCell}>ID</th>
          <th className={style.headCell}>Name</th>
          <th className={style.headCell}>Email</th>
          <th className={style.headCell}>Date Joined</th>
          <th className={style.headCell}>Administrator</th>
        </tr>
      </thead>
      <tbody className={style.tableBody}>
        {customers
          // .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .map((customer) => (
            <tr
              key={customer._id}
              className={style.tableRow}
              onClick={() => router.push(`/admin/customers/${customer._id}`)}
            >
              <td className={style.tableCell}>{customer._id.slice(19, 24)}</td>
              <td className={style.tableCell}>{customer.name}</td>
              <td className={style.tableCell}>{customer.email}</td>
              <td className={style.tableCell}>
                {convertDate(customer.createdAt)}
              </td>
              <td className={style.tableCell}>
                {customer.isAdmin ? "Yes" : "No"}
              </td>
              {/* <td className={`${style.tableCell} ${style.status}`}>
                {order.isPaid
                  ? order.isDelivered
                    ? " Delivered"
                    : "Paid"
                  : "Not Paid"}
              </td> */}
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
