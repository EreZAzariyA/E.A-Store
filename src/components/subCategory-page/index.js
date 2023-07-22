import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductCard } from "../product-card";
import "./subCategoryPage.css";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();

  const products = useSelector((state) => state.products);
  const productsBySubCategoryId = products?.filter((product) => (
    product.subCategory_id === subCategoryId
  ));

  return (
    <div className="sub-category-page mt-10">

      <div className="products-list">
        {productsBySubCategoryId.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  )
};