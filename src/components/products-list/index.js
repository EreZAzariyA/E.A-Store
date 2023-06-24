import { ProductCard } from "../productCard";
import { Space } from "antd";
import { useSelector } from "react-redux";

export const ProductsList = () => {
  const products = useSelector((state) => (state.productsReducer?.products));

  return (
    <div className="products-list-main-container">
      <div className="products-list-inner-container">
        <div className="products-list">
          <Space direction="horizontal">
            {products?.map((product) => (
              <Space key={product?._id}>
                <ProductCard product={product} />
              </Space>
            ))}
          </Space>
        </div>
      </div>
    </div>
  );
};