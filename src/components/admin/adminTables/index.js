import { Tabs } from "antd";
import { ProductsTable } from "./products-table";
import { CategoriesTable } from "./categories-table";
import { SubCategoriesTable } from "./subCategories-table";


export const AdminTables = () => {

  const tabsItems = [
    {
      label: 'Products',
      key: 'products',
      children: <ProductsTable />
    },
    {
      label: 'Categories',
      key: 'categories',
      children: <CategoriesTable />
    },
    {
      label: 'Sub-Categories',
      key: 'sub-categories',
      children: <SubCategoriesTable/>
    },
  ];

  return (
    <Tabs items={tabsItems} />
  );
};