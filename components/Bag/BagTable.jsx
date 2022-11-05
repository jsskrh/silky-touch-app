import TableRow from "./TableRow";

const style = {
  table: `p-1 border-t border-[#dcdcdc] w-full`,
  tableHead: `hidden`,
};

const BagTable = ({ cartItems }) => {
  return (
    <table className={style.table}>
      <thead className={style.tableHead}>
        <tr>
          <th>Image</th>
          <th>Details</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <TableRow item={item} key={item.sku} />
        ))}
      </tbody>
    </table>
  );
};

export default BagTable;
