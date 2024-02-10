import { Brands } from "../../../utils/helpers";
import { Carousel } from "../../components/carousel";
import "./HeadFilter.css";

export const HeadFilter = ({selectedBrands, handleFilterChange}) => {
  const brands = [...Brands];

  const onBrandSelect = (brand) => {
    const isSelected = selectedBrands.find((b) => b === brand);

    if (isSelected) {
      handleFilterChange(selectedBrands.filter((b) => b !== brand));
    } else {
      handleFilterChange([...selectedBrands, brand]);
    }
  };

  return (
    <div className="head-filter-container">
      <div className="brands-filter">
        <Carousel items={brands} selectedItems={selectedBrands} onItemSelect={onBrandSelect} />
      </div>
    </div>
  );
};