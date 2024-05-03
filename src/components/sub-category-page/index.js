import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductCard } from "../components/cards/product-card";
import { BrandsFilter } from "./brands-filter";
import { SideFilter } from "./side-filter";
import { useState } from "react";
import { isArrayAndNotEmpty } from "../../utils/helpers";
import { Empty, Spin } from "antd";
import "./subCategoryPage.css";

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
        <header className="brands-filter filter">
          {isArrayAndNotEmpty(subCategory.brands) && (
            <BrandsFilter
              withBrandsFilter={isArrayAndNotEmpty(subCategory.brands)}
              withSecondaryBrandsFilter={isArrayAndNotEmpty(subCategory.secondaryBrands)}
              brands={subCategory.brands}
              selectedBrands={filterState.selectedBrands}
              secondaryBrands={subCategory.secondaryBrands}
              selectedSecondaryBrands={filterState.selectedSecondaryBrands}
              handleFilterChange={handleFilterChange}
            />
          )}
        </header>
        <aside className="brands-filter filter">
          <SideFilter
            products={allProductsBySubCategory}
            ranges={filterState.ranges}
            handleFilterChange={(values) => handleFilterChange('ranges', values)}
            brandsFilter={<BrandsFilter
              withBrandsFilter={isArrayAndNotEmpty(subCategory.brands)}
              withSecondaryBrandsFilter={isArrayAndNotEmpty(subCategory.secondaryBrands)}
              brands={subCategory.brands}
              selectedBrands={filterState.selectedBrands}
              secondaryBrands={subCategory.secondaryBrands}
              selectedSecondaryBrands={filterState.selectedSecondaryBrands}
              handleFilterChange={handleFilterChange}
              isVertical={true}
            />}
          />
        </aside>
        <main>
          <div className="products-list">
            {isArrayAndNotEmpty(products)
            ?
              [...products].map((product, index) => (
                <ProductCard product={product} key={index || product._id} />
              ))
            :
              <Empty />
            }
          </div>
        </main>
      </div>
    );
  } return <Spin />
};