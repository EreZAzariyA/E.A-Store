import { ProductCard } from "../../components/cards/product-card";
import "./NewsProducts.css";
import { useEffect, useState } from "react";
import { storeServices } from "../../../services/store-services";
import { Spin } from "antd";
import { isArrayAndNotEmpty } from "../../../utils/helpers";

export const NewsProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewestProducts = async () => {
      const res = await storeServices.fetchNewestProducts();
      if (res && isArrayAndNotEmpty(res)) {
        setProducts(res);
      }
      setIsLoading(false);
    };

    fetchNewestProducts();
  }, []);

  return (
    <div className="products-list">
      {isLoading ? <Spin /> : products.map((product, index) => (
        <ProductCard product={product} key={index || product._id} />
      ))}
    </div>
  );
};