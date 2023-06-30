import { useEffect, useState } from "react"
import { adminServices } from "../../../../services/admin-services";
import { categoriesServices } from "../../../../services/categoriesServices";
import { getError } from "../../../../utils/helpers";
import { Button, Form, Input, Select, message } from "antd"

export const AddSubCategory = () => {
  const [ form ] = Form.useForm();
  const [ categories, setCategories ] = useState([]);
  const [ initialValues, setInitialValues] = useState({
    category_id: '',
    subCategory: '',
    image_url: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await categoriesServices.fetchAllCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    try {
      await adminServices.addSubCategory(values);
      message.success('added');
      form.resetFields();
    } catch (error) {
      message.error(getError(error.message));
    }
  };

  const formProps = {
    form: form,
    initialValues: initialValues,
    onFinish: onFinish,
    className: "insert-form add-sub-category",
    layout: "horizontal",
    labelAlign: 'left',
    labelCol: {
      md: { span: 8 },
      lg: { span: 7 },
      xl: { span: 6 },
      xxl: { span: 4 },
    },
    wrapperCol: {span: 24},
  };

  return (
    <Form {...formProps}>
      <Form.Item label={'Category'} name={'category_id'} rules={[{ required: true, message: 'Category id is missing' }]}>
        <Select onSelect={(val) => setInitialValues({...initialValues, category_id: val})}>
          <Select.Option key={''} disabled value=''>Select category</Select.Option>
          {categories?.map((category)=>(
            <Select.Option
              key={category._id}
              value={category._id}
            >
              {category.category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label={'Sub-Category'} name={'subCategory'} rules={[{ required: true, message: 'Sub-Category name is missing' }]}>
        <Input type="text" onChange={(val) => setInitialValues({...initialValues, subCategory: val.target.value})} />
      </Form.Item>

      <Form.Item label="Image Url" name={'image_url'} rules={[{ required: true, message: 'Image url is missing' }]}>
        <Input type="text" onChange={(val) => setInitialValues({...initialValues, subCategory: val.target.value})} />
      </Form.Item>

      <Button htmlType="submit">Add</Button>
    </Form>
  );
};