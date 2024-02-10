import { Brands } from "../../../utils/helpers";
import { Carousel } from "../../components/carousel";
import "./HeadFilter.css";

export const HeadFilter = ({filterState, handleFilterChange}) => {
  const brands = [...Brands];

  const onBrandSelect = (brand) => {
    const isSelected = filterState.selectedBrands.find((b) => b === brand);
    if (isSelected) {
      handleFilterChange('selectedBrands', filterState.selectedBrands.filter((b) => b !== brand))
    } else {
      handleFilterChange('selectedBrands', [...filterState.selectedBrands, brand]);
    }
  };

  return (
    <div className="head-filter-container">
      <div className="brands-filter">
        <Carousel items={brands} selectedItems={filterState.selectedBrands} onItemSelect={onBrandSelect} />
      </div>
    </div>
  );
};