import { useState } from "react"
import { adminCategoriesServices } from "../../../../services/admin/categories-services";
import { Button, Form, Input, message } from "antd"
import { getError } from "../../../../utils/helpers";

export const AddCategory = () => {
  const [ form ] = Form.useForm();
  const [initialValues, setInitialValues] = useState({
    category: '',
    subCategory: '',
    image_url: '',
    withSubCategory: false,
  });

  const onFinish = async (values) => {
    try {
      await adminCategoriesServices.addCategory(values);
      message.success('added');
      form.resetFields();
    } catch (err) {
      message.error(getError(err.message));
    }
  };

  const formProps = {
    form: form,
    initialValues: initialValues,
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
        <Input type="text" onChange={(val) => setInitialValues({...initialValues, category: val.target.value})} />
      </Form.Item>

      <Form.Item label="Image Url" name={'image_url'} rules={[{ required: true, message: 'Image url is missing'  }]}>
        <Input type="text" onChange={(val) => setInitialValues({...initialValues, image_url: val.target.value})} />
      </Form.Item>

      {/* <Form.Item label={'Would you like to add sub-category'} name={'withSubCategory'} required>
        <Radio.Group
          name="new_sub_category"
          value={withSubCategory}
          onChange={(val) => setWithSubCategory(val.target.value)}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>

      {withSubCategory &&
        <Form.Item label="Sub-category" name={'subCategory'}>
          <Input type="text" onChange={(val) => setInitialValues({...initialValues, subCategory: val.target.value})} />
        </Form.Item>
      } */}

      <Button htmlType="submit">Add</Button>
    </Form>
  );
};