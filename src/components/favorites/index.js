import { useSelector } from "react-redux";
import "./favorites.css";

export const Favorites = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  console.log(shoppingCart?.favorites);

  return (
    <p>favorites</p>
  );
};