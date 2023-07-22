import { useSelector } from "react-redux";
import { adminCategoriesServices } from "../../../../services/admin/categories-services";
import { Button, Form, Input, Select, message } from "antd"
import { getError } from "../../../../utils/helpers";

export const AddSubCategory = () => {
  const [ form ] = Form.useForm();
  const categories = useSelector((state) => state.categories);

  const onFinish = async (values) => {
    try {
      const addedSubCategory = await adminCategoriesServices.addSubCategory(values);
      message.success(`Sub-Category '${addedSubCategory.subCategory}' with id: '${addedSubCategory._id}' added successfully`);
      form.resetFields();
    } catch (error) {
      message.error(getError(error.message));
    }
  };

  const formProps = {
    form: form,
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
      <Form.Item initialValue={''} label={'Category'} name={'category_id'} rules={[{ required: true, message: 'Category id is missing' }]}>
        <Select>
          <Select.Option disabled value=''>Select category</Select.Option>
          {categories?.map((category) => (
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
        <Input type="text" />
      </Form.Item>

      <Form.Item label="Image Url" name={'image_url'} rules={[{ required: true, message: 'Image url is missing' }]}>
        <Input type="text" />
      </Form.Item>

      <Button htmlType="submit">Add</Button>
    </Form>
  );
};