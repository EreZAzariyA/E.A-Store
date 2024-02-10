import { Slider } from "antd";
import "./SideFilter.css";

export const SideFilter = ({ products, ranges, handleFilterChange }) => {
  const maxPrice = [...products || []].reduce((a, b) => {
    return a.price > b.price ? a : b;
  }, 0);
  const minPrice = [...products || []].reduce((a, b) => {
    return a.price < b.price ? a : b;
  }, 0);

  return (
    <div className="side-filter-container">

      <div className="filter price-range">
        <div className="filter-title">
          <span>Price Range</span>
        </div>
        <Slider
          range
          min={minPrice.price}
          max={maxPrice.price}
          value={ranges.length ? ranges : [minPrice.price, maxPrice.price]}
          onChange={(values) => handleFilterChange(values)}
        />
      </div>
      <div className="filter"></div>
    </div>
  );
};