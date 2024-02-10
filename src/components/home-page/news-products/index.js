import { useSelector } from "react-redux";
import { ProductCard } from "../../components/cards/product-card";
import "./NewsProducts.css";

export const NewsProducts = () => {
  const products = useSelector((state) => state.products);
  const newsProducts = [...products].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  });
  const tenNewestProducts = [...newsProducts].slice(0, 10);


  return (
    <div className="news-products-main-container">
      <div className="news-products-inner-container">

        <h3 className="page-title">
          <span>New</span>
        </h3>

        <div className="products-list">
          {[...tenNewestProducts].map((product, index) => (
            <ProductCard product={product} key={index || product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};