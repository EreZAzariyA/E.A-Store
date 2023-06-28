import { useEffect, useState } from "react";
import { Input, Select, Space } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditTable } from "../components/EditTable";

export const ProductsList = () => {
  const products = useSelector((state) => (state.productsReducer?.products));
  const categories = useSelector((state) => (state.categoriesReducer?.categories));
  const subCategories = useSelector((state) => (state.categoriesReducer?.subCategories));
  const [ filteredProducts, setFilteredProducts] = useState([]);

  const [ filterState, setFilterState ] = useState({
    name: '',
    category_id: '',
    subCategory_id: ''
  });

  const filtering = () => {

    let filteredProducts = products;

    if (filterState.name) {
      filteredProducts = filteredProducts?.filter((p) => p.name.startsWith(filterState.name))
    };
    if (filterState.category_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.category_id === filterState.category_id))
    }
    if (filterState.subCategory_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.subCategory_id === filterState.subCategory_id))
    };

    return filteredProducts;
  };
  
  useEffect(() => {
    const f = filtering();
    setFilteredProducts(f);
  }, [filterState, products]);


  const columns = [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
      fixed: 'left',
      editable: true,
      width: 150,
      sorter: (a, b) => (a.name.localeCompare(b.name))
    },
    {
      title: 'Category',
      key: 'category_id',
      dataIndex: 'category_id',
      editable: true,
      render: (value, record) => {
        const category = categories?.find((c) => (c._id === value));
        return (
          <Link to={`/admin/all-categories/${category?._id}`}>{category?.category}</Link>
        )
      },
      sorter: (a, b) => (a.category_id > b.category_id)
    },
    {
      title: 'Sub-Category',
      key: 'subCategory_id',
      dataIndex: 'subCategory_id',
      // width: 300,
      editable: true,
      render: (value, record) => {
        const subCategory = subCategories?.find((subC) => (subC._id === value));
        return (
          <p>{subCategory?.subCategory}</p>
        )
      },
      sorter: (a, b) => (a.subCategory_id.localeCompare(b.subCategory_id)),
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      editable: true,
      sorter: (a, b) => (a.price > b.price)
    },
  ];

  return (
    <Space direction="vertical" style={{width: '99%'}}>
      <Space className="mt-10" align="center" wrap>
        <Input
          allowClear
          type="text"
          placeholder="Search product"
          onChange={(val) => setFilterState({...filterState, name: val.target.value})}
        />

        <Select
          allowClear
          onClear={() => setFilterState({...filterState, category_id: ''})}
          style={{width: '200px'}}
          value={filterState.category_id}
          onSelect={(val) => setFilterState({...filterState, category_id: val })}
        >
          <Select.Option key={''} disabled>Select category</Select.Option>
          {categories?.map((category) => (
            <Select.Option key={category._id}>{category.category}</Select.Option>
          ))}
        </Select>
  
        <Select
          allowClear
          onClear={() => setFilterState({...filterState, subCategory_id: ''})}
          style={{width: '200px'}}
          value={filterState.subCategory_id}
          onSelect={(val) => setFilterState({...filterState, subCategory_id: val })}
        >
          <Select.Option key={''} disabled>Select sub-category</Select.Option>
          {subCategories?.map((subCategory) => (
            <Select.Option key={subCategory._id}>{subCategory.subCategory}</Select.Option>
          ))}
        </Select>
      </Space>

      <EditTable
        rowKey={'_id'}
        dataSource={filteredProducts}
        columns={columns}
      />
    </Space>
  );
};