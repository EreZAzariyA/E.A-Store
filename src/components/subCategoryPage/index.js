import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();
  const [ products, setProducts ] = useState([]);

  const fetchSubCategoryProducts = async (subCategory_id) => {
    const products = await productsServices.fetchProductsBySubCategoryId(subCategory_id);
    setProducts(products);
  };

  useEffect(() => {
    fetchSubCategoryProducts(subCategoryId);
  }, [subCategoryId]);

  return (
    <div className="sub-category-page">
      {products?.map((product) => (
        <p key={product._id}>{product.name}</p>
      ))}
    </div>
  )
};