import { useEffect, useState } from "react";
import { Input, Select, Space, message } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditTable } from "../components/EditTable";
import { AdminInsert } from "../admin-insert";
import { adminProductsServices } from "../../../services/admin/products-services";
import { getError } from "../../../utils/helpers";

const Steps = {
  NEW_ROW: "NEW ROW",
};

export const ProductsTable = () => {
  const products = useSelector((state) => (state.products));
  const categories = useSelector((state) => (state.categories));
  const subCategories = useSelector((state) => (state.subCategories));
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const [step, setStep] = useState(null);

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

  const onFinish = async (values) => {
    try {
      const addedProduct = await adminProductsServices.addProduct(values);
      message.success(`Sub-Category '${addedProduct.name}' with id: '${addedProduct._id}' added successfully`);
      setStep(null);
    } catch (err) {
      message.error(getError(err));
    }
  };

  const handleAdd = () => {
    setStep(Steps.NEW_ROW);
  };

  const columns = [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
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
      width: 200,
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
      render: (text) => (
        <p className="long-text-field">{text}</p>
      ),
    },
    {
      title: 'Image URL',
      key: 'image_url',
      dataIndex: 'image_url',
      editable: true,
      width: 200,
      render: (text) => (
        <p className="long-text-field">{text}</p>
      ),
    },
    {
      title: 'Stock',
      key: 'stock',
      dataIndex: 'stock',
      editable: true,
      width: 100,
      inputType: 'number'
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      editable: true,
      width: 120,
      inputType: 'number',
      sorter: (a, b) => (a.price > b.price),
    },
  ];

  return (
    <Space direction="vertical" style={{width: '99%'}}>
      {!step && (
        <>
          <Space align="center" wrap>
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
            component={'products'}
            handleAdd={handleAdd}
          />
        </>
      )}

      {(step && step === Steps.NEW_ROW) && (
        <AdminInsert
          component={'products'}
          onBack={() => setStep(null)}
          onFinish={onFinish}
        />
      )}
    </Space>
  );
};