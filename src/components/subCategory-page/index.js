import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import socketServices from "../../services/socket-services";
import { addProduct, removeProduct, updateProduct } from "../../redux/slicers/products-slicer";
import { ProductCard } from "../product-card";
import "./subCategoryPage.css";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();
  const socket = socketServices.socketIo;
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const productsBySubCategoryId = [...products].filter((product) => (
    product.subCategory_id === subCategoryId
  ));

  useEffect(() => {
    socket.on('admin.add.product', (product) => {
      dispatch(addProduct(product));
    });
    socket.on('admin.update.product', (product) => {
      dispatch(updateProduct(product));
      console.log(product);
    });
    socket.on('admin.remove.product', (product_id) => {
      dispatch(removeProduct(product_id));
    });
  
    return () => {
      socket.off('admin.add.product');
      socket.off('admin.update.product');
      socket.off('admin.remove.product');
    };
  }, [socket]);

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