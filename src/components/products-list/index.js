import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";
import { ProductCard } from "../productCard";
import { Space } from "antd";
import { useDispatch } from "react-redux";
import { ProductsActions } from "../../redux/actions";

export const ProductsList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsServices.fetchAllProducts().then((products) => {
      setProducts(products);
      dispatch(ProductsActions.fetchProducts(products));
    });
  }, []);

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