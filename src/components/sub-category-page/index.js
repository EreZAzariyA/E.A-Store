import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductCard } from "../components/cards/product-card";
import "./subCategoryPage.css";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();

  const products = useSelector((state) => state.products);
  const productsBySubCategoryId = products?.filter((product) => (
    product.subCategory_id === subCategoryId
  ));

  return (
    <div className="sub-category-page mt-10">
      <header>head</header>
      <aside>aside</aside>
      <main>
        <div className="products-list">
          {[...productsBySubCategoryId, ...productsBySubCategoryId].map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </main>
    </div>
  )
};