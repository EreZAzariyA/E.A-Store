import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();
  const products = useSelector((state) => state.products);
  const productsBySubCategoryId = [...products].filter((product) => (
    product.subCategory_id === subCategoryId
  ));

  return (
    <div className="sub-category-page">
      {productsBySubCategoryId.map((product) => (
        <p key={product._id}>{product.name}</p>
      ))}
    </div>
  )
};