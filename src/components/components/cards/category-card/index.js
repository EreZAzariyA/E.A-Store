import { UnifiedCard } from "../unified-card";

export const CategoryCard = (props) => {
  const { category } = props;

  return (
    <UnifiedCard
      item={category}
      type="category"
    />
  );
};
