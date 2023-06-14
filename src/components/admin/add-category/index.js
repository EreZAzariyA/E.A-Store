import { Button, Col, Form, Input, Radio, Row } from "antd"
import { useState } from "react"
import { adminServices } from "../../../services/admin-services";


const STEPS = {
  ADD_SUB_CATEGORY: "ADD_SUB_CATEGORY"
}


export const AddCategory = () => {
  const [ withSubCategory, setWithSubCategory ] = useState(false);
  
  const [initialValues, setInitialValues] = useState({
    category: '',
    withSubCategory: false,
    subCategory: ''
  });

  const onFinish = async (values) => {
    const addedCategory = await adminServices.addCategory(values);
    console.log(addedCategory);
  }


  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Form.Item label={'Category name'} name={'category'}>
        <Input type="text" />
      </Form.Item>

      <Form.Item label={'Would you like to add sub-category'} name={'withSubCategory'}>
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
          <Input type="text" />
        </Form.Item>
      }

      <Button htmlType="submit">Add</Button>
    </Form>
  )
}