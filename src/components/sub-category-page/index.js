import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductCard } from "../components/cards/product-card";
import { BrandsFilter } from "./brands-filter";
import { SideFilter } from "./side-filter";
import { useState } from "react";
import { isArrayAndNotEmpty } from "../../utils/helpers";
import "./subCategoryPage.css";
import { Spin } from "antd";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();

  const subCategories = useSelector((state) => state.subCategories);
  const subCategory = [...subCategories].find((subC) => subC._id === subCategoryId);

  const allProducts = useSelector((state) => state.products);
  const allProductsBySubCategory = allProducts.filter((product) => (
    product.subCategory_id === subCategoryId
  ));

  const [filterState, setFilterState] = useState({
    selectedBrands: [],
    selectedSecondaryBrands: [],
    ranges: [],
  });

  let products = [...allProductsBySubCategory];
  console.log(filterState);

  if (filterState.selectedBrands.length) {
    products = [...products].filter((p) => filterState.selectedBrands.includes(p.brand))
  }
  if (filterState.selectedSecondaryBrands.length) {
    products = [...products].filter((p) => filterState.selectedSecondaryBrands.includes(p.brand))
  }
  if (filterState.ranges.length || filterState.ranges.length === 2) {
    products = [...products].filter((p) => p.price >= filterState.ranges[0] && p.price <= filterState.ranges[1]);
  }

  const handleFilterChange = (name, value) => {
    setFilterState({ ...filterState, [name]: value });
  };

  if (subCategory) {
    return (
      <div className="sub-category-page mt-10">
        <header>
          <BrandsFilter
            withBrandsFilter={isArrayAndNotEmpty(subCategory.brands)}
            withSecondaryBrandsFilter={isArrayAndNotEmpty(subCategory.secondaryBrands)}
            brands={subCategory.brands}
            selectedBrands={filterState.selectedBrands}
            secondaryBrands={subCategory.secondaryBrands}
            selectedSecondaryBrands={filterState.selectedSecondaryBrands}
            handleFilterChange={handleFilterChange}
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
    );
  } return <Spin />
};