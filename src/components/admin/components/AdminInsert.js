import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Brands, ComponentsTypes } from "../../../utils/helpers";
import TextArea from "antd/es/input/TextArea";
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select } from "antd"

export const AdminInsert = ({ type, onFinish, onBack, record }) => {
  const categories = useSelector((state) => state.categories);
  const allSubCategories = useSelector((state) => state.subCategories);
  const [form] = Form.useForm();
  const [subCategories, setSubCategories] = useState([]);

  const isProducts = type === ComponentsTypes.PRODUCTS;
  const isCategories = type === ComponentsTypes.CATEGORIES;
  const isSubCategories = type === ComponentsTypes.SUB_CATEGORIES;
  const componentName = isCategories ? 'category' : isSubCategories ? 'sub-category' : 'product';

  const [initialValue, setInitialValue] = useState(isProducts ? {
    name: record?.name || '',
    brand: record?.brand || '',
    description: record?.description || '',
    category_id: record?.category_id || '',
    subCategory_id: record?.subCategory_id || '',
    image_url: record?.image_url || '',
    price: record?.price || '',
    stock: record?.stock || '',
    } : isCategories ? {
      category: record?.category || '',
      subCategories: record?.subCategories || [],
      image_url: record?.image_url || '',
    } : isSubCategories ? {
      subCategory: record?.subCategory || '',
      image_url: record?.image_url || ''
    } : {}
  );

  useEffect(() => {
    if (initialValue.category_id) {
      const selectedCategory = categories.find((c) => c._id === initialValue.category_id);

      if (selectedCategory && selectedCategory.subCategories) {
        const newSubCategoriesList = [];
        for (const subCategoryId of selectedCategory.subCategories) {
          const fullSubCategory = allSubCategories.find((subC) => subC._id === subCategoryId);
          newSubCategoriesList.push(fullSubCategory);
        }
        setSubCategories(newSubCategoriesList);
      }
    }
  }, [allSubCategories, categories, initialValue.category_id]);

  const cancel = () => {
    onBack();
    form.resetFields();
  };

  const handleChange = (name, value) => {
    setInitialValue({...initialValue, [name]: value });
    if (name === 'category_id') {
      form.setFieldValue('subCategory_id', '');
    }
  };

  const formProps = {
    form: form,
    onFinish: onFinish,
    initialValues: initialValue,
    className: "insert-form add-category",
    layout: "horizontal",
    labelAlign: 'left',
    labelCol: {
      md: { span: 8 },
      lg: { span: 7 },
      xl: { span: 5 },
      xxl: { span: 4 },
    },
    wrapperCol: {span: 24},
  };

  return (
    <Form {...formProps} labelWrap>
      <h3>Add {componentName}</h3>

      <Button type="link" onClick={cancel}>Go back</Button>
      <Divider />

      {isProducts && (
        <>
          <Form.Item
            label={'Product'}
            name={'name'}
            rules={[{ required: true, message: 'Product name is missing' }]}
          >
            <Input
              type="text"
              placeholder="Product name"
            />
          </Form.Item>

          <Form.Item
            label={'Brand'}
            name={'brand'}
            rules={[{ required: true, message: 'Brand is missing' }]}
          >
            <Select onChange={(val) => handleChange('brand', val)}>
              <Select.Option key={''} disabled>Select brand</Select.Option>
              {Brands.map((brand) => (
                <Select.Option key={brand.name}>
                  <Row align={"stretch"} justify={"center"}>
                    <Col span={2}>
                      {brand.name}
                    </Col>
                    <Col span={2}>
                      <img src={brand.image_url} width={30} alt={brand.name + ' brand image'} />
                    </Col>
                  </Row>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={'Category'}
            name={'category_id'}
            rules={[{ required: true, message: 'Category id is missing' }]}
          >
            <Select onChange={(val) => handleChange('category_id', val)}>
              <Select.Option key={''} disabled>Select category</Select.Option>
              {categories.map((category) => (
                <Select.Option key={category._id}>{category.category}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={'Sub-category'}
            name={'subCategory_id'}
            rules={[{ required: true, message: 'Sub-Category id is missing' }]}
          >
            <Select
              disabled={!initialValue.category_id}
              onChange={(val) => handleChange('subCategory_id', val)}
              value={initialValue.subCategory_id}
            >
              <Select.Option key={''} value={''} disabled>Select sub category</Select.Option>
              {subCategories?.map((subC) => (
                <Select.Option key={subC?._id}>{subC?.subCategory}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={'Description'}
            name={'description'}
            rules={[{ required: true, message: 'Description is missing' }]}
          >
            <TextArea placeholder="Describe the product"/>
          </Form.Item>

          <Form.Item
            label={'Image url'}
            name={'image_url'}
            rules={[{ required: true, message: 'Image url is missing' }]}
          >
            <Input placeholder="https://www.image_url"/>
          </Form.Item>

          <Form.Item
            label={'Stock'}
            name={'stock'}
            rules={[{ required: true, message: 'Stock is missing' }]}
          >
            <InputNumber placeholder="0" min={0} />
          </Form.Item>

          <Form.Item
            label={'Price'}
            name={'price'}
            rules={[{ required: true, message: 'Price is missing' }]}
          >
            <InputNumber
              style={{ width: 'auto' }}
              placeholder="0.00"
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>
        </>
      )}
      {isCategories && (
        <>
          <Form.Item
            label={'Category'}
            name={'category'}
            rules={[{ required: true, message: 'Category name is missing' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label={'Sub-categories'}
            name={'subCategories'}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Select sub categories"
              onChange={(val) => handleChange('subCategories', val)}
            >
              {[...allSubCategories].map((subCategory) => {
                return <Select.Option key={subCategory._id}>{subCategory.subCategory}</Select.Option>
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Image Url"
            name={'image_url'}
            rules={[{ required: true, message: 'Image url is missing' }]}
          >
            <Input type="text" />
          </Form.Item>
        </>
      )}
      {isSubCategories && (
        <>
          <Form.Item
            label={'Sub-Category'}
            name={'subCategory'}
            rules={[{ required: true, message: 'Sub-Category name is missing' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Image Url"
            name={'image_url'}
            rules={[{ required: true, message: 'Image url is missing' }]}
          >
            <Input type="text" />
          </Form.Item>
        </>
      )}

      <Button htmlType="submit">{record ? 'Update' : 'Add'} {componentName}</Button>
    </Form>
  );
};