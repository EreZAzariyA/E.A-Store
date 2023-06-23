import { Tabs } from "antd"
import { AddProduct } from "./addProduct";
import { AddCategory } from "./addCategory";
import { AddSubCategory } from "./addSubCategory";
import "./insertDoc.css";

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
    {
      label: 'Add Sub-Category' ,
      key: 'add-sub-category',
      children: <AddSubCategory />
    },
  ];

  return (
    <Tabs items={items} className="admin-insert-tabs" />
  );
};