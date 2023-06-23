import { useSelector } from "react-redux";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const CategoriesList = () => {
  const { pathname } = useLocation();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const categories = useSelector((state) => (state.categoriesReducer?.categories));
  const products = useSelector((state) => (state.productsReducer?.products));

  useEffect(() => {
    const locationArray = pathname.split('/');
    if (locationArray[3]) {
      setSelectedCategoryId(locationArray[3]);
    };
  }, [pathname]);

  console.log(selectedCategoryId);

  const columns = [
    {
      key: '_id',
      title: 'ID',
      dataIndex: '_id',
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => (a.category.localeCompare(b.category)),
    },
    {
      key: 'products',
      title: 'Products',
      shouldUpdate: false,
      sortOrder: 'descend',
      render: (_,record) => {
        const productsLength = products?.length > 0 ? [...products].filter((p) => (p.category_id === record._id)).length : null;
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
    <Table
      bordered
      rowKey={'_id'}
      columns={columns}
      dataSource={categories}
      loading={!categories?.length}
    />
  );
};