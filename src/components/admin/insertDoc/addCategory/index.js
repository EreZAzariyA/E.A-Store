import { adminCategoriesServices } from "../../../../services/admin/categories-services";
import { Button, Form, Input, message } from "antd"
import { getError } from "../../../../utils/helpers";

export const AddCategory = () => {
  const [ form ] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const addedCategory = await adminCategoriesServices.addCategory(values);
      message.success(`Category '${addedCategory.category}' with id: '${addedCategory._id}' added successfully`);
      form.resetFields();
    } catch (err) {
      message.error(getError(err.message));
    }
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
      <Form.Item label={'Category'} name={'category'}  rules={[{ required: true, message: 'Category name is missing' }]}>
        <Input type="text" />
      </Form.Item>

      <Form.Item label="Image Url" name={'image_url'} rules={[{ required: true, message: 'Image url is missing'  }]}>
        <Input type="text" />
      </Form.Item>
      <Button htmlType="submit">Add</Button>
    </Form>
  );
};