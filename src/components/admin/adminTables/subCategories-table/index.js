import { useSelector } from "react-redux";
import { Input, Space } from "antd";
import { useEffect, useState } from "react";
import { EditTable } from "../../components/EditTable";

export const SubCategoriesTable = () => {
  const products = useSelector((state) => (state.products));
  const subCategories = useSelector((state) => (state.subCategories));
  const [ filteredSubCategories, setFilteredSubCategories ] = useState([]);

  const [ filterState, setFilterState ] = useState({
    subCategory: '',
  });

  useEffect(() => {
    if (filterState.subCategory) {
      const subCategoryToSearch = filterState.subCategory.toLowerCase();
      const filteredSubCategories = [...subCategories].filter((subC) => { 
        return subC.subCategory.toLowerCase().startsWith(subCategoryToSearch)
      });
      setFilteredSubCategories(filteredSubCategories);
    } else {
      setFilteredSubCategories(subCategories);
    }
  }, [filterState.subCategory, subCategories]);


  const columns = [
    {
      key: '_id',
      title: 'ID',
      dataIndex: '_id',
      editable: true,
    },
    {
      key: 'subCategory',
      title: 'Sub-Category',
      dataIndex: 'subCategory',
      sorter: (a, b) => (a.subCategory.localeCompare(b.subCategory)),
      editable: true,
    },
    {
      key: 'products',
      title: 'Products',
      shouldUpdate: false,
      render: (_,record) => {
        const productsLength = [...products].filter((p) => (p.subCategory_id === record._id)).length;
        return <p>{ productsLength ?? 0}</p>
      },
      sorter: (a, b) => {
        const aLength = [...products].filter((p) => (p.subCategory_id === a._id)).length;
        const bLength = [...products].filter((p) => (p.subCategory_id === b._id)).length;
        
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
          allowClear
          type="text"
          placeholder='Search sub-category'
          onChange={(val) => setFilterState({...filterState, subCategory: val.target.value})}
        />
      </Space>

      <EditTable
        loading={!subCategories}
        rowKey={'_id'}
        columns={columns}
        dataSource={filteredSubCategories}
        isSubCategoriesList
      />
    </Space>
  );
};