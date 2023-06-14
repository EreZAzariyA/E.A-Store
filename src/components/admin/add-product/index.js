import { Button, Form, Input, InputNumber, Select } from "antd"
import { useEffect, useState } from "react";
import { productsServices } from "../../../services/productsServices";
import TextArea from "antd/es/input/TextArea";
import { adminServices } from "../../../services/admin-services";


export const AddProduct = () => {
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    category_id: '',
    subCategory_id: '',
    description: '',
    price: '',
    img: ''
  });

  useEffect(() => {
    productsServices.fetchAllCategories().then((categories) => {
      const mappedCategories = categories.map((category) => ({
        key: category._id,
        value: category._id,
        label: category.category,
      }));
      setCategoriesOptions(mappedCategories);
    })
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      productsServices.fetchSubCategoriesByCategoryId(selectedCategory).then((subCategories) => {
        const mappedSubCategories = subCategories.map((subCategory) => ({
          key: subCategory._id,
          value: subCategory._id,
          label: subCategory.subCategory,
        }));
        setSubCategoriesOptions(mappedSubCategories);
      });
    };
  }, [selectedCategory]);

  const onFinish = async (values) => {
    const uploaded = await adminServices.addProduct(values);
    console.log(uploaded);
  }

  return (
    <Form onFinish={onFinish} style={{width: '50%', margin: 'auto'}} initialValues={initialValues}>
      <Form.Item label={'Product name'} name={'name'}>
        <Input type="text" />
      </Form.Item>

      <Form.Item label={'Category id'} name={'category_id'}>
        <Select options={categoriesOptions} placeholder="Select category" onSelect={(val) => setSelectedCategory(val)} />
      </Form.Item>

      <Form.Item label={'Sub-category id'} name={'subCategory_id'}>
        <Select disabled={!selectedCategory} options={subCategoriesOptions} placeholder="Select sub-category" />
      </Form.Item>

      <Form.Item label={'Description'} name={'description'}>
        <TextArea />
      </Form.Item>
      
      <Form.Item label={'Price'} name={'price'}>
        <InputNumber min={0} />
      </Form.Item>

      {/* <Form.Item label={'Image'} name={'img'}>
        <Input type="file" />
      </Form.Item> */}

      <Button type="primary" htmlType="submit">
        Upload
      </Button>
    </Form>
  )
}