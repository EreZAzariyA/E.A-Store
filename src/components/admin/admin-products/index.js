import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditTable } from "../components/EditTable";
import { AdminInsert } from "../components/AdminInsert";
import { adminProductsServices } from "../../../services/admin/products-services";
import { ComponentsTypes } from "../../../utils/helpers";
import { Input, Select, Space, message } from "antd";

const Steps = {
  ADD_PRODUCT: "ADD_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
};

export const ProductsTable = () => {
  const products = useSelector((state) => (state.products));
  const categories = useSelector((state) => (state.categories));
  const subCategories = useSelector((state) => (state.subCategories));

  const [product, setProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [step, setStep] = useState(null);

  const [ filterState, setFilterState ] = useState({
    name: '',
    category_id: '',
    subCategory_id: ''
  });

  useEffect(() => {
    const f = filtering();
    setFilteredProducts(f);
  }, [filterState, products]);

  useEffect(() => {
    if (step && step === Steps.ADD_PRODUCT) {
      setProduct(null);
    }
  }, [step]);

  const filtering = () => {
    let filteredProducts = [...products];

    if (filterState.name) {
      filteredProducts = filteredProducts?.filter((p) => p.name.startsWith(filterState.name))
    }
    if (filterState.category_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.category_id === filterState.category_id))
    }
    if (filterState.subCategory_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.subCategory_id === filterState.subCategory_id))
    }

    return filteredProducts;
  };

  const handleEditMode = (record) => {
    setStep(Steps.UPDATE_PRODUCT);
    setProduct(record);
  };

  const onFinish = async (values) => {
    let newValue = '';
    let successMessage = '';
    try {
      if (product) {
        newValue = await adminProductsServices.updateProduct({...values, _id: product?._id});
        successMessage = `Product '${newValue?.name}' with id: '${newValue?._id}' updated successfully`;
      } else {
        newValue = await adminProductsServices.addProduct(values);
        successMessage = `Product '${newValue?.name}' with id: '${newValue?._id}' added successfully`;
      }
      if (newValue) {
        message.success(successMessage);
        setStep(null);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      width: 150,
      fixed: 'left',
      sorter: (a, b) => (a.name.localeCompare(b.name))
    },
    {
      title: 'Category',
      key: 'category_id',
      dataIndex: 'category_id',
      width: 200,
      render: (value) => {
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
      render: (value) => {
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
      render: (text) => (
        <p className="long-text-field">{text}</p>
      ),
    },
    {
      title: 'Image URL',
      key: 'image_url',
      dataIndex: 'image_url',
      render: (text) => (
        <p className="long-text-field">{text}</p>
      ),
    },
    {
      title: 'Stock',
      key: 'stock',
      dataIndex: 'stock',
      width: 100,
      inputType: 'number'
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      width: 100,
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
            handleAdd={() => setStep(Steps.ADD_PRODUCT)}
            type={ComponentsTypes.PRODUCTS}
            onEditMode={handleEditMode}
          />
        </>
      )}

      {(step && step === Steps.ADD_PRODUCT) && (
        <AdminInsert
          type={ComponentsTypes.PRODUCTS}
          onBack={() => setStep(null)}
          onFinish={onFinish}
        />
      )}
      {(step && step === Steps.UPDATE_PRODUCT) && (
        <AdminInsert
          type={ComponentsTypes.PRODUCTS}
          onBack={() => setStep(null)}
          onFinish={onFinish}
          record={product}
        />
      )}
    </Space>
  );
};