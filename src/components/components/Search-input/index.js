import { useState } from "react";
import { storeServices } from "../../../services/store-services";
import { isArrayAndNotEmpty, validateString, Colors } from "../../../utils/helpers";
import { Col, Row, Select, Typography } from "antd"

export const SearchInput = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = async (searchValue) => {
    if (searchValue && !validateString(searchValue)) {
      try {
        const pro = await storeServices.searchProducts(searchValue);

        if (pro && isArrayAndNotEmpty(pro)) {
          const mappedProducts = pro.map((product) => ({
            value: product.name,
            text: product.name,
            ...product
          }));

          setData(mappedProducts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Select
      showSearch
      allowClear
      value={value}
      placeholder={'Search Products By Name Or ID'}
      defaultActiveFirstOption={false}
      onSearch={handleSearch}
      onChange={(val) => setValue(val)}
      size="large"
      dropdownStyle={{
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: `1px solid ${Colors.BORDER}`
      }}
    >
      {data.map((d) => (
        <Select.Option key={d.value}>
          <Row justify={'start'} align={'middle'} style={{
            textAlign: 'left',
            padding: '8px 4px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}>
            <Col span={18}>
              <Typography.Text ellipsis={{ rows: 1 }}><strong>{d.text}</strong></Typography.Text>
            </Col>
            <Col span={6}>
              <img
                src={d.image_url}
                alt=""
                width={60}
                height={60}
                style={{
                  borderRadius: '8px',
                  objectFit: 'contain',
                  border: `1px solid ${Colors.BORDER}`
                }}
              />
            </Col>
          </Row>
        </Select.Option>
      ))}
    </Select>
  );
};