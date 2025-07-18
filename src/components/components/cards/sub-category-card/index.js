import { UnifiedCard } from "../unified-card";

export const SubCategoryCard = (props) => {
  const { subCategory } = props;

  return (
    <UnifiedCard
      item={subCategory}
      type="sub-category"
    />
  );
};