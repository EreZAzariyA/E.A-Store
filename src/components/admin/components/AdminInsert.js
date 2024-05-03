import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {ComponentsTypes, isArrayAndNotEmpty } from "../../../utils/helpers";
import TextArea from "antd/es/input/TextArea";
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography } from "antd"

export const AdminInsert = ({ type, onFinish, onBack, record }) => {
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const allSubCategories = useSelector((state) => state.subCategories);
  const [form] = Form.useForm();
  const [subCategories, setSubCategories] = useState([]);
  const isProducts = type === ComponentsTypes.PRODUCTS;
  const isCategories = type === ComponentsTypes.CATEGORIES;
  const isSubCategories = type === ComponentsTypes.SUB_CATEGORIES;
  const isBrands = type === ComponentsTypes.BRANDS;
  const componentName = isCategories ? 'category' : isSubCategories ? 'sub-category' : isBrands ? 'brand' : 'product';

  const [initialValue, setInitialValue] = useState({
    name: record?.name || '',
    brand: record?.brand || '',
    brands: record?.brands ? record.brands.map((b) => (b._id)) : [],
    secondaryBrands: record?.secondaryBrands ? record.secondaryBrands.map((b) => (b._id)) : [],
    description: record?.description || '',
    category_id: record?.category_id || '',
    subCategory_id: record?.subCategory_id || '',
    image_url: record?.image_url || '',
    price: record?.price || '',
    stock: record?.stock || '',
    category: record?.category || '',
    subCategories: record?.subCategories || [],
    subCategory: record?.subCategory || '',
  });

  useEffect(() => {
    if (initialValue.category_id) {
      const selectedCategory = categories.find((c) => c._id === initialValue.category_id);

      if (selectedCategory && selectedCategory.subCategories) {
        const newSubCategoriesList = [];
        for (const subCategoryId of selectedCategory.subCategories) {
          const fullSubCategory = allSubCategories.find((subC) => subC._id === subCategoryId);
          newSubCategoriesList.push(fullSubCategory);
        }
        setSubCategories(newSubCategoriesList);
      }
    }
  }, [allSubCategories, categories, initialValue.category_id]);

  const fetchBrandsBySubCategory_id = (subCategory_id) => {
    let fullBrandsList = [];
    if (isProducts) {
      const selectedSubCategory = subCategories.find((subC) => subC._id === subCategory_id);

      if (selectedSubCategory) {
        const brands = selectedSubCategory.brands;
        console.log(brands);

        fullBrandsList = [...brands].map((b) => {
          const fullBrand = [...brands].find((brand) => brand._id === b._id);
          return fullBrand;
        });
      }
      return fullBrandsList;
    }

    return [];
  };
  const brandsBySubCategory = fetchBrandsBySubCategory_id(initialValue.subCategory_id);

  const cancel = () => {
    onBack();
    form.resetFields();
  };

  const handleChange = (name, value) => {
    setInitialValue({...initialValue, [name]: value });
    if (name === 'category_id') {
      form.setFieldValue('subCategory_id', '');
      form.setFieldValue('brand', '');
    }
  };

  const formProps = {
    form: form,
    onFinish: onFinish,
    initialValues: initialValue,
    className: "insert-form add-category",
    layout: "horizontal",
  };

  return (
    <Form {...formProps} labelWrap>
      <h3>{record ? 'Update' : 'Add'} {componentName}</h3>

      <Typography.Link onClick={cancel}>Go Back</Typography.Link>
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
            rules={[{ required: true, message: 'Category id is missing' }]}
          >
            <Select onChange={(val) => handleChange('category_id', val)}>
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
              disabled={!initialValue.category_id}
              onChange={(val) => handleChange('subCategory_id', val)}
              value={initialValue.subCategory_id}
            >
              <Select.Option key={''} value={''} disabled>Select sub category</Select.Option>
              {subCategories.map((subC) => (
                <Select.Option key={subC._id}>{subC.subCategory}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={'Brand'}
            name={'brand'}
            rules={[{ required: true, message: 'Brand is missing' }]}
          >
            <Select
              disabled={!initialValue.subCategory_id}
              onChange={(val) => handleChange('brand', val)}
            >
              <Select.Option key={''} disabled>Select brand</Select.Option>
              {isArrayAndNotEmpty(brandsBySubCategory) && brandsBySubCategory.map((brand) => (
                <Select.Option key={brand?.name}>
                  <Row align={"stretch"} justify={"center"}>
                    <Col span={2}>
                      {brand?.name}
                    </Col>
                    <Col span={2}>
                      <img src={brand?.image_url} width={30} alt={brand?.name + ' brand image'} />
                    </Col>
                  </Row>
                </Select.Option>
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
          <Form.Item
            label={'Category'}
            name={'category'}
            rules={[{ required: true, message: 'Category name is missing' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label={'Sub-categories'}
            name={'subCategories'}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Select sub categories"
              onChange={(val) => handleChange('subCategories', val)}
            >
              {[...allSubCategories].map((subCategory) => {
                return <Select.Option key={subCategory._id}>{subCategory.subCategory}</Select.Option>
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Image Url"
            name={'image_url'}
            rules={[{ required: true, message: 'Image url is missing' }]}
          >
            <Input type="text" />
          </Form.Item>
        </>
      )}
      {isSubCategories && (
        <>
          <Form.Item
            label={'Sub-Category'}
            name={'subCategory'}
            rules={[{ required: true, message: 'Sub-Category name is missing' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label={'Brands'}
            name={'brands'}
            rules={[{ required: true, message: 'Brands are missing' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              onChange={(val) => handleChange('brands', val)}
            >
              <Select.Option key={''} disabled>Select brands</Select.Option>
              {brands.map((brand) => {
                return (
                  <Select.Option key={brand._id}>
                    <Row align={"stretch"}>
                      <Col>
                        {brand.name}
                      </Col>
                      <Col>
                        <img src={brand.image_url} style={{ objectFit: 'contain' }} height={25} width={50} alt={brand.name + ' brand image'} />
                      </Col>
                    </Row>
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label={'Secondary Brands'}
            name={'secondaryBrands'}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              onChange={(val) => handleChange('secondaryBrands', val)}

            >
              <Select.Option key={''} disabled>Select secondary brands</Select.Option>
              {[...brands, ...allSubCategories]
                .map((item) => ({name: item.name || item.subCategory, ...item}))
                .map((item) => (
                <Select.Option key={item._id}>
                  <Row align={"stretch"}>
                    <Col>
                      {item.name}
                    </Col>
                    <Col>
                      <img src={item.image_url} style={{ objectFit: 'contain' }} height={25} width={50} alt={item.name + ' brand image'} />
                    </Col>
                  </Row>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Image Url"
            name={'image_url'}
            rules={[{ required: true, message: 'Image url is missing' }]}
          >
            <Input type="text" />
          </Form.Item>
        </>
      )}
      {isBrands && (
        <>
          <Form.Item
            label={'Brand'}
            name={'name'}
            rules={[{ required: true, message: 'Brand name is missing' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Image Url"
            name={'image_url'}
            rules={[{ required: true, message: 'Image url is missing' }]}
          >
            <Input type="text" />
          </Form.Item>
        </>
      )}

      <Button htmlType="submit">{record ? 'Update' : 'Add'} {componentName}</Button>
    </Form>
  );
};