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
  const [ filteredSubCategories, setFilteredSubCategories ] = useState([]);
  const [ initialValues, setInitialValues ] = useState({
    name: '',
    category_id: '',
    subCategory_id: '',
    description: '',
    price: '',
    image_url: ''
  });

  useEffect(() => {
    const filteredSubCategories = [...subCategories].filter((subCategory) => {
      return subCategory.category_id === initialValues.category_id;
    });
    setFilteredSubCategories(filteredSubCategories);
  }, [initialValues, subCategories]);

  const onFinish = async (values) => {
    try {
      await adminProductsServices.addProduct(values);
      message.success('Added');
    } catch (err) {
      message.error(getError(err));
    }
  };

  const formProps = {
    form: form,
    initialValues,
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
          onChange={(val) => {
            setInitialValues({...initialValues, name: val.target.value});
          }}
        />
      </Form.Item>

      <Form.Item
        label={'Category'}
        name={'category_id'}
        rules={[{ required: true, message: 'Category id is missing' }]}
      >
        <Select
          onSelect={(val) => {
            setInitialValues({...initialValues, category_id: val, subCategory_id: ''});
          }}
        >
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
          value={initialValues.subCategory_id}
          disabled={!initialValues.category_id}
          onSelect={(val) => {
            setInitialValues({...initialValues, subCategory_id: val });
          }}
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
        <TextArea onChange={(val) => {
          setInitialValues({...initialValues, description: val.target.value});
        }}/>
      </Form.Item>
      
      <Form.Item
        label={'Image url'}
        name={'image_url'}
        rules={[{ required: true, message: 'Image url is missing' }]}
      >
        <Input onChange={(val) => {
          setInitialValues({...initialValues, image_url: val.target.value})
        }}/>
      </Form.Item>

      <Form.Item
        label={'Price'}
        name={'price'}
        rules={[{ required: true, message: 'Price is missing' }]}
      >
        <InputNumber min={0} onChange={(val) => {
          setInitialValues({ ...initialValues, price: val });
        }}/>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Upload
      </Button>
    </Form>
  );
};