import { Button, Form, Input, InputNumber, Select, message } from "antd"
import { useEffect, useState } from "react";
import { productsServices } from "../../../../services/productsServices";
import TextArea from "antd/es/input/TextArea";
import { adminServices } from "../../../../services/admin-services";
import { getError } from "../../../../utils/helpers";

export const AddProduct = () => {
  const [ form ] = Form.useForm();
  const [ categories, setCategories ] = useState([]);
  const [ subCategories, setSubCategories ] = useState([]);
  const [ initialValues, setInitialValues ] = useState({
    name: '',
    category_id: '',
    subCategory_id: '',
    description: '',
    price: '',
  });

  const fetchCategories = async () => {
    const categories = await productsServices.fetchAllCategories();
    setCategories(categories);
  };

  const fetchSubCategories = async (category_id) => {
    const subCategories = await productsServices.fetchSubCategoriesByCategoryId(category_id);
    setSubCategories(subCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialValues.category_id) {
      fetchSubCategories(initialValues.category_id);
    };
  }, [initialValues.category_id]);

  const onFinish = async (values) => {
    try {
      await adminServices.addProduct(values);
      message.success('Added');
    } catch (err) {
      message.error(getError(err));
    }
  };

  const formProps = {
    form: form,
    initialValues: initialValues,
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

      <Form.Item label={'Product'} name={'name'} rules={[{ required: true, message: 'Product name is missing' }]}>
        <Input
          type="text"
          onChange={(val) => {
            setInitialValues({...initialValues, name: val.target.value})
            console.log(val.target.value);
          }
        }
        />
      </Form.Item>

      <Form.Item label={'Category'} name={'category_id'} rules={[{ required: true, message: 'Category id is missing' }]}>
        <Select
          onSelect={(val) => {
            setInitialValues({...initialValues, category_id: val, subCategory_id: ''});
            console.log(subCategories);
          }}
        >
          <Select.Option key={''} disabled>Select category</Select.Option>
          {categories?.map((category) => (
            <Select.Option key={category._id}>{category.category}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label={'Sub-category'} name={'subCategory_id'} rules={[{ required: true, message: 'Sub-Category id is missing' }]}>
        <Select
          disabled={!initialValues.category_id}
          onSelect={(val) => {
            setInitialValues({...initialValues, subCategory_id: val});
          }}
        >
          <Select.Option key={''} disabled>Select sub category</Select.Option>
          {subCategories?.map((subC) => (
            <Select.Option key={subC._id}>{subC.subCategory}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label={'Description'} name={'description'} rules={[{ required: true, message: 'Description is missing' }]}>
        <TextArea />
      </Form.Item>
      
      <Form.Item label={'Price'} name={'price'} rules={[{ required: true, message: 'Price is missing' }]}>
        <InputNumber min={0} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Upload
      </Button>
    </Form>
  );
};