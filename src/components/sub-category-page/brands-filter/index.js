import { CustomCarousel } from "../../components/carousel";
import "./BrandsFilter.css";

export const BrandsFilter = ({withBrandsFilter, withSecondaryBrandsFilter, brands, secondaryBrands, selectedBrands, selectedSecondaryBrands, handleFilterChange, isVertical}) => {
  const onBrandSelect = (brand) => {
    const isSelected = selectedBrands.find((b) => b === brand.name);

    if (isSelected) {
      handleFilterChange('selectedBrands', selectedBrands.filter((b) => b !== brand.name));
    } else {
      handleFilterChange('selectedBrands', [...selectedBrands, brand.name]);
    }
  };

  const onSecondaryBrandSelect = (secondaryBrand) => {
    const isSelected = selectedSecondaryBrands.find((b) => b === secondaryBrand._id);

    if (isSelected) {
      handleFilterChange('selectedSecondaryBrands', selectedSecondaryBrands.filter((b) => b !== secondaryBrand._id));
    } else {
      handleFilterChange('selectedSecondaryBrands', [...selectedSecondaryBrands, secondaryBrand._id]);
    }
  };

  return (
    <div className="brands-filter-container">
      {withBrandsFilter && (
        <div className="brands-filter">
          <CustomCarousel
            items={brands}
            selectedItems={selectedBrands}
            onItemSelect={onBrandSelect}
            isVertical={isVertical}
          />
        </div>
      )}

      {withSecondaryBrandsFilter && (
        <div className="secondary-brands-filter">
          <CustomCarousel
            items={secondaryBrands}
            selectedItems={selectedSecondaryBrands}
            onItemSelect={onSecondaryBrandSelect}
            isVertical={isVertical}
          />
        </div>
      )}

    </div>
  );
};