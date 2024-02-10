import { Slider } from "antd";
import "./SideFilter.css";

export const SideFilter = ({products, filterState, handleFilterChange }) => {
  const maxPrice = [...products || []].reduce((a, b) => {
    return a.price > b.price ? a : b;
  }, 0);
  const minPrice = [...products || []].reduce((a, b) => {
    return a.price < b.price ? a : b;
  }, 0);

  console.log(minPrice.price, maxPrice.price);

  return (
    <div className="side-filter-container">
      <div className="price-range">
        <Slider
          range
          min={minPrice.price}
          max={maxPrice.price}
          onChange={(values) => handleFilterChange('ranges', {from: values[0], to: values[1]})}
        />

      </div>
    </div>
  );
};