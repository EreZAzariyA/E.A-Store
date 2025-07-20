import { Col, Input, Row, Select } from "antd"
import { useSelector } from "react-redux";


export const Filters = ({
  product = false,
  categorySelect = false,
  subCategorySelect = false,
  category = false,
  subCategory = false,
  brand = false,
  handleFilterChange
}) => {
  const categories = useSelector((state) => (state.categories));
  const subCategories = useSelector((state) => (state.subCategories));

  const props = {
    style: { width: '100%' },
    allowClear: true
  };

  return (
    <Row gutter={[10, 10]}>
      {product && (
        <Col xs={{ span: 12 }}>
          <Input
            {...props}
            type="text"
            placeholder="Search product"
            onChange={(val) => handleFilterChange('name', val.target.value)}
          />
        </Col>
      )}
      {categorySelect && (
        <Col xs={{ span: 12 }}>
          <Select
            {...props}
            onClear={() => handleFilterChange('category_id', null)}
            onSelect={(val) => handleFilterChange('category_id', val)}
            placeholder={"Select category"}
            options={categories?.map((category) => ({label: category.category, value: category._id}))}
          />
        </Col>
      )}
      {subCategorySelect && (
        <Col xs={{ span: 12 }}>
          <Select
            {...props}
            onClear={() => handleFilterChange('subCategory_id', null)}
            onSelect={(val) => handleFilterChange('subCategory_id', val)}
            placeholder="Select sub-category"
            options={subCategories?.map((subCategory) => ({ label: subCategory.subCategory, value: subCategory._id }))}
          />
        </Col>
      )}
      {category && (
        <Col xs={{ span: 12 }}>
          <Input
            type="text"
            placeholder='Search category'
            allowClear
            onChange={(val) => handleFilterChange(val.target.value)}
          />
        </Col>
      )}
      {subCategory && (
        <Col xs={{ span: 12 }}>
          <Input
            allowClear
            type="text"
            placeholder='Search sub-category'
            onChange={(val) => handleFilterChange(val.target.value)}
          />
        </Col>
      )}
      {brand && (
        <Col xs={{ span: 12 }}>
          <Input
            type="text"
            placeholder='Search brand'
            allowClear
            onChange={(val) => handleFilterChange(val.target.value)}
          />
        </Col>
      )}
    </Row>
  );
};