import { useState } from "react";
import { storeServices } from "../../../services/store-services";
import { isArrayAndNotEmpty, validateString } from "../../../utils/helpers";
import { Col, Row, Select } from "antd"

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
      style={{ width: '100%' }}
      showSearch
      allowClear
      value={value}
      placeholder={'Search Products By Name Or ID'}
      defaultActiveFirstOption={false}
      onSearch={handleSearch}
      onChange={(val) => setValue(val)}
    >
      {data.map((d) => (
        <Select.Option key={d.value}>
          <Row justify={'start'} align={'middle'} style={{ textAlign: 'left'}}>
            <Col span={18}>
              {d.text}
            </Col>
            <Col span={6}>
              <img src={d.image_url} alt="" width={70} height={70} />
            </Col>
          </Row>
        </Select.Option>
      ))}
    </Select>
  );
};