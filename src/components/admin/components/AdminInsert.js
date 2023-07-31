import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Form, Input, InputNumber, Select } from "antd"
import TextArea from "antd/es/input/TextArea";

export const AdminInsert = ({ component, onBack, onFinish, record }) => {
  const [ form ] = Form.useForm();
  const categories = useSelector((state) => state.categories);
  const allSubCategories = useSelector((state) => state.subCategories);
  const [subCategories, setSubCategories] = useState([]);

  const [initialValue, setInitialValue] = useState({
    name: record?.subCategory || record?.category || '',
    description: '',
    category_id: record?._id || '',
    subCategories: record?.subCategories || [],
    subCategory_id: '',
    image_url: record?.image_url || '',
    price: 0.00,
    stock: 0,
  });

  const isProducts = component === 'products';
  const isCategories = component === 'categories';
  const isSubCategories = component === 'sub-categories';
  const componentName = isCategories ? 'category' : isSubCategories ? 'sub-category' : 'product';

  useEffect(() => {
    if (initialValue.category_id) {
      const category = categories.find((c) => c._id === initialValue.category_id);

      if (category && category.subCategories) {
        const newSubCategoriesList = [];
        for (const subCategoryId of category.subCategories) {
          const fullSubCategory = allSubCategories.find((subC) => subC._id === subCategoryId);
          newSubCategoriesList.push(fullSubCategory);
        };
        setSubCategories(newSubCategoriesList);
      };
    };
  }, [allSubCategories, categories, initialValue]);

  const cancel = () => {
    onBack();
    form.resetFields();
  };

  const handleChange = (name, value) => {
    setInitialValue({...initialValue, [name]: value });
    if (name === 'category_id') {
      form.setFieldValue('subCategory_id', '');
    };
  };

  const getDefaultValueList = (values = []) => {
    const newList = [...values].map((v) => {
      return v
    });
    return newList;
  };

  const formProps = {
    form: form,
    onFinish: onFinish,
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
            initialValue={initialValue.name}
            rules={[{ required: true, message: 'Product name is missing' }]}
          >
            <Input
              type="text"
              placeholder="Product name"
            />
          </Form.Item>

          <Form.Item
            label={'Category'}
            name={'category_id'}
            initialValue={initialValue.category_id}
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
            initialValue={initialValue.subCategory_id}
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
            initialValue={initialValue.description}
            rules={[{ required: true, message: 'Description is missing' }]}
          >
            <TextArea placeholder="Describe the product"/>
          </Form.Item>

          <Form.Item
            label={'Image url'}
            name={'image_url'}
            initialValue={initialValue.image_url}
            rules={[{ required: true, message: 'Image url is missing' }]}
          >
            <Input placeholder="https://www.image_url"/>
          </Form.Item>

          <Form.Item
            label={'Stock'}
            name={'stock'}
            initialValue={initialValue.stock}
            rules={[{ required: true, message: 'Stock is missing' }]}
          >
            <InputNumber placeholder="0" min={0} />
          </Form.Item>

          <Form.Item
            label={'Price'}
            name={'price'}
            initialValue={initialValue.price}
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
            initialValue={initialValue.name}
            rules={[{ required: true, message: 'Category name is missing' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label={'Sub-categories'}
            name={'subCategories'}
            initialValue={getDefaultValueList(initialValue.subCategories)}
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
            initialValue={initialValue.image_url}
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
            initialValue={initialValue.name}
            rules={[{ required: true, message: 'Sub-Category name is missing' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Image Url"
            name={'image_url'}
            initialValue={initialValue.image_url}
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