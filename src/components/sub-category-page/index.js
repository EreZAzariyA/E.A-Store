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
  const allProductsBySubCategory = allProducts.filter((product) => (
    product.subCategory_id === subCategoryId
  ));

  const [filterState, setFilterState] = useState({
    selectedBrands: [],
    ranges: [],
  });

  let products = [...allProductsBySubCategory];

  if (filterState.selectedBrands.length) {
    products = [...products].filter((p) => filterState.selectedBrands.includes(p.brand))
  }
  if (filterState.ranges.length || filterState.ranges.length === 2) {
    products = [...products].filter((p) => p.price >= filterState.ranges[0] && p.price <= filterState.ranges[1]);
  }

  const handleFilterChange = (name, value) => {
    setFilterState({ ...filterState, [name]: value });
  };

  return (
    <div className="sub-category-page mt-10">
      <header>
        <HeadFilter
          selectedBrands={filterState.selectedBrands}
          handleFilterChange={(values) => handleFilterChange('selectedBrands', values)}
        />
      </header>
      <aside>
        <SideFilter
          products={allProductsBySubCategory}
          ranges={filterState.ranges}
          handleFilterChange={(values) => handleFilterChange('ranges', values)}
        />
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