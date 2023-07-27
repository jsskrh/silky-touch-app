import { Menu } from "@headlessui/react";
import MiniBagItem from "./MiniBagItem";

const style = {
  table: `w-full`,
  tableHead: `hidden`,
};

const MiniBagTable = ({ cartItems }) => {
  return (
    <table className={style.table}>
      <thead className={style.tableHead}>
        <tr>
          <th>Image</th>
          <th>Details</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <Menu.Item key={item._id}>
            <MiniBagItem item={item} parent="header" />
          </Menu.Item>
        ))}
      </tbody>
    </table>
  );
};

export default MiniBagTable;
