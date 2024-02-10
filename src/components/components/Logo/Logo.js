import "./Logo.css";
import logoLight from "../../../assets/logo/logo-light.png";
import { useNavigate } from "react-router-dom";


export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo" onClick={() => navigate('/')}>
      <img src={logoLight} alt="light-logo" />
    </div>
  );
}