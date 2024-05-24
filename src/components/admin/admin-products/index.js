import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditTable } from "../components/EditTable";
import { AdminInsert } from "../components/AdminInsert";
import { adminProductsServices } from "../../../services/admin/products-services";
import { ComponentsTypes, toLowerCase } from "../../../utils/helpers";
import { Col, Input, Row, Select, Space, message } from "antd";

const Steps = {
  ADD_PRODUCT: "ADD_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
};

export const ProductsTable = () => {
  const allProducts = useSelector((state) => (state.products));
  const categories = useSelector((state) => (state.categories));
  const subCategories = useSelector((state) => (state.subCategories));

  const [product, setProduct] = useState(null);
  const [step, setStep] = useState(null);
  const [filterState, setFilterState] = useState({
    name: null,
    category_id: null,
    subCategory_id: null
  });

  const filtering = () => {
    let filteredProducts = [...allProducts];

    if (filterState.name) {
      filteredProducts = filteredProducts?.filter((p) => p.name.startsWith(filterState.name) || p._id.startsWith(filterState.name))
    }
    if (filterState.category_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.category_id === filterState.category_id))
    }
    if (filterState.subCategory_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.subCategory_id === filterState.subCategory_id))
    }

    filteredProducts.sort((a, b) => (
      new Date(b.updatedAt) - new Date(a.updatedAt)
    ));
    return filteredProducts;
  };
  const products = filtering();

  const handleEditMode = (record) => {
    setStep(Steps.UPDATE_PRODUCT);
    setProduct(record);
  };

  const removeHandler = async (product_id) => {
    try {
      await adminProductsServices.removeProduct(product_id);
      message.info('Product removed successfully...');
    } catch (err) {
      message.error(err);
    }
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
      width: 200,
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
          <Link to={`/admin/categories/#${toLowerCase(category?.category)}`}>{category?.category}</Link>
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
          <span>{subCategory?.subCategory}</span>
        )
      },
      sorter: (a, b) => (a.subCategory_id.localeCompare(b.subCategory_id)),
    },
    {
      title: 'Image URL',
      key: 'image_url',
      dataIndex: 'image_url',
      width: 220,
      render: (text) => (
        <span className="long-text-field">{text}</span>
      ),
    },
    {
      title: 'Stock',
      key: 'stock',
      dataIndex: 'stock',
      width: 80,
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
    <Space direction="vertical" className="w-100">
      {!step && (
        <>
          <Row align={'middle'} justify={'start'} gutter={[20, 10]}>
            <Col>
              <Input
                allowClear
                type="text"
                placeholder="Search product"
                onChange={(val) => setFilterState({...filterState, name: val.target.value})}
              />
            </Col>
            <Col>
              <Select
                allowClear
                onClear={() => setFilterState({...filterState, category_id: ''})}
                style={{width: '200px'}}
                value={filterState.category_id}
                onSelect={(val) => setFilterState({...filterState, category_id: val })}
                placeholder={"Select category"}
                options={categories?.map((category) => ({label: category.category, key: category._id}))}
              />
            </Col>
            <Col>
              <Select
                allowClear
                onClear={() => setFilterState({...filterState, subCategory_id: ''})}
                style={{ width: '200px' }}
                value={filterState.subCategory_id}
                placeholder="Select sub-category"
                onSelect={(val) => setFilterState({...filterState, subCategory_id: val })}
                options={subCategories?.map((subCategory) => ({ label: subCategory.subCategory, key: subCategory._id }))}
              />
            </Col>
          </Row>

          <EditTable
            rowKey={'_id'}
            loading={!products}
            dataSource={products}
            columns={columns}
            handleAdd={() => setStep(Steps.ADD_PRODUCT)}
            type={ComponentsTypes.PRODUCTS}
            onEditMode={handleEditMode}
            removeHandler={removeHandler}
            scroll={{ x: 1300 }}
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