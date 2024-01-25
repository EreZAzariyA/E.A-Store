import { Col, Row, Select } from "antd"
import { useState } from "react";
import { useSelector } from "react-redux";


export const SearchInput = () => {
  const products = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = (newValue) => {
    if (!newValue || newValue.length === 0) setData([]);
    const pro = [...products || []].filter((p) => p.name.toLowerCase().startsWith(newValue.toLowerCase()));
    const mappedProducts = pro.map((product) => ({
      value: product.name,
      text: product.name,
      ...product
    }))
    setData(mappedProducts);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      allowClear
      value={value}
      placeholder={'Search Products By Name Or ID'}
      defaultActiveFirstOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
    >
      {data.map((d) => (
        <Select.Option key={d.value}>
          <Row justify={'space-between'} align={'middle'}>
            <Col span={20}>
              {d.text}
            </Col>
            <Col span={4}>
              <img src={d.image_url} alt="" width={50} height={50} />
            </Col>
          </Row>
        </Select.Option>
      ))}
    </Select>
  );
};