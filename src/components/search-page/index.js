import { Input, Space } from "antd";
import { useState } from "react";
import { ProductCard } from "../components/cards/product-card";
import { useSelector } from "react-redux";


export const SearchPage = () => {
  const [valueToSearch, setValueToSearch] = useState();
  let products = useSelector((state) => state.products);

  if (valueToSearch) {
    products = [...products].filter((p) => String(p.name).toLowerCase().includes(String(valueToSearch).toLowerCase()))
  }

  return (
    <Space direction="vertical" className="w-100">
      <Input
        type="text"
        placeholder="Search product"
        onChange={(val) => setValueToSearch(val.target.value)}
      />

      <div className="products-list">
        {[...products].map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Space>
  );
};