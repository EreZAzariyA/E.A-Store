import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { adminProductsServices } from "../../../../services/admin/products-services";
import TextArea from "antd/es/input/TextArea";
import { Button, Form, Input, InputNumber, Select, message } from "antd"
import { getError } from "../../../../utils/helpers";

export const AddProduct = () => {
  const [ form ] = Form.useForm();
  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);
  const [filteredSubCategories, setFilteredSubCategories ] = useState([]);
  const [category_id, setCategory_id] = useState(null);
  const [subCategory_id, setSubCategory_id] = useState('');

  useEffect(() => {
    const filteredSubCategories = [...subCategories].filter((subCategory) => {
      return subCategory.category_id === category_id;
    });
    setFilteredSubCategories(filteredSubCategories);
  }, [category_id, subCategories]);

  const onFinish = async (values) => {
    try {
      const addedProduct = await adminProductsServices.addProduct(values);
      message.success(`Sub-Category '${addedProduct.name}' with id: '${addedProduct._id}' added successfully`);
      console.log(addedProduct);
      form.resetFields();
    } catch (err) {
      message.error(getError(err));
    }
  };

  const formProps = {
    form: form,
    onFinish: onFinish,
    className: "insert-form add-product",
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
    <Form {...formProps}>

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
        label={'Category'}
        name={'category_id'}
        initialValue={''}
        rules={[{ required: true, message: 'Category id is missing' }]}
      >
        <Select onSelect={(val) => {setCategory_id(val); setSubCategory_id('');}}>
          <Select.Option key={''} disabled>Select category</Select.Option>
          {categories.map((category) => (
            <Select.Option key={category._id}>{category.category}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={'Sub-category'}
        name={'subCategory_id'}
        initialValue={subCategory_id}
        rules={[{ required: true, message: 'Sub-Category id is missing' }]}
      >
        <Select
          disabled={!category_id}
          onChange={(val) => setSubCategory_id(val)}
        >
          <Select.Option key={''} disabled>Select sub category</Select.Option>
          {filteredSubCategories?.map((subC) => (
            <Select.Option key={subC._id}>{subC.subCategory}</Select.Option>
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

      <Button type="primary" htmlType="submit">
        Upload
      </Button>
    </Form>
  );
};