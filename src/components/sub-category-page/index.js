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
    products = [...products].filter((p) => filterState.selectedBrands.includes(p.brand_id))
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
      <div className="sub-category-page-main-container">
        {/* Hero Section */}
        <section className="sub-category-hero-section">
          <div className="sub-category-hero-content">
            <h1 className="sub-category-hero-title">
              {subCategory?.name || "Sub-Category"}
            </h1>
            <p className="sub-category-hero-subtitle">
              Browse our {subCategory?.name?.toLowerCase()} collection
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="sub-category-page">
          <div className="sub-category-section-header">
            <h2 className="sub-category-section-title">Products & Filters</h2>
            <p className="sub-category-section-subtitle">
              Find exactly what you're looking for
            </p>
          </div>

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

          <div className="sub-category-page-content">
            <aside>
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

          {/* Stats Section */}
          <div className="sub-category-stats-section">
            <div className="sub-category-stats-container">
              <div className="sub-category-stat-item">
                <div className="sub-category-stat-number">{products.length}</div>
                <div className="sub-category-stat-label">Products Found</div>
              </div>
              <div className="sub-category-stat-item">
                <div className="sub-category-stat-number">{subCategory.brands?.length || 0}</div>
                <div className="sub-category-stat-label">Brands</div>
              </div>
              <div className="sub-category-stat-item">
                <div className="sub-category-stat-number">24/7</div>
                <div className="sub-category-stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } return <Spin />
};