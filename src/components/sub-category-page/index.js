import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductCard } from "../components/cards/product-card";
import "./subCategoryPage.css";
import { HeadFilter } from "./head-filter";
import { SideFilter } from "./side-filter";
import { useState } from "react";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();
  const allProducts = useSelector((state) => state.products);
  const [filterState, setFilterState] = useState({
    selectedBrands: [],
    ranges: {
      from: 0,
      to: 0
    },
  });

  const allProductsBySubCategory = allProducts?.filter((product) => (
    product.subCategory_id === subCategoryId
  ));
  let products = [...allProductsBySubCategory];

  if (filterState.selectedBrands.length) {
    products = [...products].filter((p) => filterState.selectedBrands.includes(p.brand))
  }
  if (filterState.ranges.from || filterState.ranges.to) {
    products = [...products].filter((p) => p.price >= filterState.ranges.from && p.price <= filterState.ranges.to);
  }

  const handleFilterChange = (name, value) => {
    setFilterState({ ...filterState, [name]: value });
  };

  return (
    <div className="sub-category-page mt-10">
      <header>
        <HeadFilter filterState={filterState} handleFilterChange={handleFilterChange} />
      </header>
      <aside>
        <SideFilter products={allProductsBySubCategory} filterState={filterState} handleFilterChange={handleFilterChange} />
      </aside>
      <main>
        <div className="products-list">
          {[...products].map((product, index) => (
            <ProductCard product={product} key={index || product._id} />
          ))}
        </div>
      </main>
    </div>
  )
};