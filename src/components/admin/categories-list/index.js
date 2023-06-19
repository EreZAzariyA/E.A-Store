import { useEffect, useState } from "react"
import { productsServices } from "../../../services/productsServices";
import { EditTable } from "../components/EditTable";

export const CategoriesList = () => {
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const categories = await productsServices.fetchAllCategories();
      setCategories(categories);
    };
    fetchAllCategories();
  }, []);
  
  const columns = [
    {
      key: '_id',
      title: 'ID',
      dataIndex: '_id',
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category'
    },
  ];

  return (
    <EditTable columns={columns} dataSource={categories} rowKey={'_id'} />
  );
};