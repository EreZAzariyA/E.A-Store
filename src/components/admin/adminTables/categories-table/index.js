import { useSelector } from "react-redux";
import { Input, Space } from "antd";
import { useEffect, useState } from "react";
import { EditTable } from "../../components/EditTable";

export const CategoriesTable = () => {
  const products = useSelector((state) => (state.products));
  const categories = useSelector((state) => (state.categories));
  const subCategories = useSelector((state) => (state.subCategories));
  const [ filteredCategories, setFilteredCategories ] = useState([]);

  const [filterState, setFilterState] = useState({
    category: ''
  });

  useEffect(() => {
    if (filterState.category) {
      setFilteredCategories([...categories]?.filter((c) => {
        return c.category.toLowerCase().startsWith(filterState.category.toLowerCase())
      }));
    } else {
      setFilteredCategories(categories);
    };
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
      key: 'subCategories',
      title: 'Sub-Categories',
      render: (_,record) => {
        const subCategoriesLength = [...subCategories].filter((subC) => (subC.category_id === record._id)).length;
        return <p>{ subCategoriesLength ?? 0}</p>
      },
      sorter: (a, b) => {
        const aLength = [...subCategories].filter((subC) => (subC.category_id === a._id)).length;
        const bLength = [...subCategories].filter((subC) => (subC.category_id === b._id)).length;
        
        if (aLength < bLength) {
          return -1;
        } else if (aLength > bLength) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    {
      key: 'products',
      title: 'Products',
      shouldUpdate: false,
      render: (_,record) => {
        const productsLength = [...products].filter((p) => (p.category_id === record._id)).length;
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
    <Space direction="vertical" style={{width: '99%'}}>
      <Space align="center" wrap>
        <Input
          type="text"
          placeholder='Search category'
          onChange={(val) => setFilterState({...filterState, category: val.target.value})}
        />
      </Space>

      <EditTable
        loading={!categories}
        rowKey={'_id'}
        columns={columns}
        dataSource={filteredCategories}
        isCategoriesList
      />
    </Space>
  );
};