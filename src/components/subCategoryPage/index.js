import { useParams } from "react-router-dom";

export const SubCategoryPage = () => {
  const { subCategoryId } = useParams();

  return (
    <p>{subCategoryId}</p>
  )
};