import { Tabs } from "antd"
import { AddProduct } from "./add-product";
import { AddCategory } from "./add-category";


export const AdminInsert = () => {

  const items = [
    {
      label: 'Add-Product' ,
      key: 'add-product',
      children: <AddProduct />
    },
    {
      label: 'Add-Category' ,
      key: 'add-category',
      children: <AddCategory />
    },
  ];

  return (
    <Tabs items={items} />
  );
};