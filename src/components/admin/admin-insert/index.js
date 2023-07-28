import { Button, Divider, Form, Input, InputNumber, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AdminInsert = ({ component, onBack, onFinish }) => {
  const [ form ] = Form.useForm();
  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);
  const [filteredSubCategories, setFilteredSubCategories ] = useState([]);
  const [category_id, setCategory_id] = useState(null);
  const [subCategory_id, setSubCategory_id] = useState('');
  const isProducts = component === 'products';
  const isCategories = component === 'categories';
  const isSubCategories = component === 'sub-categories';

  const componentName = isCategories ? 'category' : isSubCategories ? 'sub-category' : 'product';

  useEffect(() => {
    const filteredSubCategories = [...subCategories].filter((subCategory) => {
      return subCategory.category_id === category_id;
    });
    setFilteredSubCategories(filteredSubCategories);
  }, [category_id, subCategories]);

  const cancel = () => {
    onBack();
    form.resetFields();
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
        </>
      )}

      {isCategories && (
        <>
          <Form.Item label={'Category'} name={'category'}  rules={[{ required: true, message: 'Category name is missing' }]}>
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Image Url" name={'image_url'} rules={[{ required: true, message: 'Image url is missing'  }]}>
            <Input type="text" />
          </Form.Item>
        </>
      )}

      {isSubCategories && (
        <>
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
        </>
      )}

      <Button htmlType="submit">Add {componentName}</Button>
    </Form>
  );
};