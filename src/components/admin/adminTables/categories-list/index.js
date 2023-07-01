import { useSelector } from "react-redux";
import { Input, Space } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditTable } from "../../components/EditTable";

export const CategoriesList = () => {
  const { pathname } = useLocation();
  const categories = useSelector((state) => (state.categories));
  const [filteredCategories, setFilteredCategories] = useState([]);
  const products = useSelector((state) => (state.products));
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [filterState, setFilterState] = useState({
    category: ''
  });

  useEffect(() => {
    const locationArray = pathname.split('/');
    if (locationArray[3]) {
      setSelectedCategoryId(locationArray[3]);
    };
  }, [pathname]);

  useEffect(() => {
    if (filterState.category) {
      setFilteredCategories([...categories]?.filter((c) => {
        return c.category.toLowerCase().startsWith(filterState.category.toLowerCase()) || c._id.toLowerCase().startsWith(filterState.category.toLowerCase())
      }));
    } else setFilteredCategories(categories)
  }, [filterState.category, categories]);

  const columns = [
    {
      key: '_id',
      title: 'ID',
      dataIndex: '_id',
      editable: true,
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => (a.category.localeCompare(b.category)),
      editable: true,
    },
    {
      key: 'products',
      title: 'Products',
      shouldUpdate: false,
      editable: true,
      render: (_,record) => {
        const productsLength = products?.length > 0 ? [...products].filter((p) => (p.category_id === record._id)).length : 0;
        return <p>{ productsLength ?? 0}</p>
      },
      sorter: (a, b) => {
        const aLength = [...products].filter((p) => (p.category_id === a._id)).length;
        const bLength = [...products].filter((p) => (p.category_id === b._id)).length;
        
        if (aLength < bLength) {
          return -1;
        } else if (aLength > bLength) {
          return 1;
        } else {
          return 0;
        }
      }

    },
  ];

  return (
    <Space direction="vertical" style={{width: '99%'}} className="mt-10">
      <Space className="mt-10" align="center" wrap>
        <Input type="text" placeholder='Search category' onChange={(val) => setFilterState({...filterState, category: val.target.value})} />

      </Space>

      <EditTable
        rowKey={'_id'}
        columns={columns}
        dataSource={filteredCategories}
        isCategoriesList
      />
    </Space>
  );
};