import { ProductCard } from "../../components/cards/product-card";
import "./NewsProducts.css";
import { useEffect, useState } from "react";
import { storeServices } from "../../../services/store-services";
import { Spin } from "antd";
import { isArrayAndNotEmpty } from "../../../utils/helpers";

export const NewsProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    storeServices.fetchNewestProducts().then((res) => {
      if (res && isArrayAndNotEmpty(res)) {
        setProducts(res);
      }
      setIsLoading(false);
    });
  }, []);

  if (!isLoading) {
    return (
      <div className="news-products-main-container">
        <div className="news-products-inner-container">

          <h3 className="page-title">
            <span>New</span>
          </h3>

          <div className="products-list">
            {products.map((product, index) => (
              <ProductCard product={product} key={index || product._id} />
            ))}
          </div>
        </div>
      </div>
    );
  } return <Spin />
};