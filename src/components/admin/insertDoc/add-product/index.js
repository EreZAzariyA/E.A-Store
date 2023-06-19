import { Button, Form, Input, InputNumber, Select } from "antd"
import { useEffect, useState } from "react";
import { productsServices } from "../../../../services/productsServices";
import TextArea from "antd/es/input/TextArea";
import { adminServices } from "../../../../services/admin-services";

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

  const fetchCategories = async () => {
    const categories = await productsServices.fetchAllCategories();
    const mappedCategories = categories.map((category) => ({
      key: category._id,
      value: category._id,
      label: category.category,
    }));
    setCategoriesOptions(mappedCategories);
  };

  const fetchSubCategories = async (selectedCategory) => {
    if (selectedCategory) {
      const subCategories = await productsServices.fetchSubCategoriesByCategoryId(selectedCategory);
      console.log(subCategories, selectedCategory);
      const mappedSubCategories = subCategories?.map((subCategory) => ({
        key: subCategory._id,
        value: subCategory._id,
        label: subCategory.subCategory,
      }));
      setSubCategoriesOptions(mappedSubCategories);
    };
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories(selectedCategory);
  }, [selectedCategory]);

  const onFinish = async (values) => {
    const uploaded = await adminServices.addProduct(values);
    console.log(uploaded);
  }

  return (
    <Form onFinish={onFinish} style={{width: '50%', margin: 'auto'}} initialValues={initialValues}>

      <Form.Item label={'Product name'} name={'name'}>
        <Input
          type="text"
          onChange={(val) => {
            setInitialValues({...initialValues, name: val.target.value})
            console.log(val.target.value);
          }
        }
        />
      </Form.Item>

      <Form.Item label={'Category id'} name={'category_id'}>
        <Select
          options={categoriesOptions}
          placeholder="Select category"
          onChange={(val) => {
              setSelectedCategory(val);
              setInitialValues({...initialValues, category_id: val, subCategory_id: ''})
              console.log(val, initialValues);
            }
          }
        />
      </Form.Item>

      <Form.Item label={'Sub-category id'} name={'subCategory_id'}>
        <Select
          disabled={!selectedCategory}
          options={subCategoriesOptions}
          placeholder="Select sub-category"
          value={initialValues.subCategory_id}
          onSelect={(val) => {setInitialValues({...initialValues, subCategory_id: val}); console.log(val);}}
        />
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