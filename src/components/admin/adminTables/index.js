import { Tabs } from "antd";
import { ProductsList } from "./products-list";
import { CategoriesList } from "./categories-list";


export const AdminTables = () => {

  const tabsItems = [
    {
      label: 'Products',
      key: 'products',
      children: <ProductsList />
    },
    {
      label: 'Categories',
      key: 'categories',
      children: <CategoriesList />
    },
    {
      label: 'Sub-Categories',
      key: 'sub-categories',
      children: <CategoriesList />
    },
  ]

  return (
    <Tabs items={tabsItems} />
  );
};