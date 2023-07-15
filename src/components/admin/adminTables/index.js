import { Tabs } from "antd";
import { ProductsTable } from "./products-table";
import { CategoriesTable } from "./categories-table";
import { SubCategoriesTable } from "./subCategories-table";
import { useEffect } from "react";
import socketServices from "../../../services/socket-services";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct, updateProduct } from "../../../redux/slicers/products-slicer";


export const AdminTables = () => {
  const dispatch = useDispatch();
  const socket = socketServices.socketIo;

  useEffect(() => {
    socket.on('admin.add.product', (product) => {
      dispatch(addProduct(product));
    });
    socket.on('admin.update.product', (product) => {
      dispatch(updateProduct(product));
      console.log(product);
    });
    socket.on('admin.remove.product', (product_id) => {
      dispatch(removeProduct(product_id));
    });
  
    return () => {
      socket.off('admin.add.product');
      socket.off('admin.update.product');
      socket.off('admin.remove.product');
    };
  }, [socket]);

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