import { useNavigate } from "react-router-dom";
import logoLight from "../../../assets/logo/logo-light.png";
import "./Logo.css";


export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo">
      <img src={logoLight} alt="light-logo" onClick={() => navigate('/home')} />
    </div>
  );
}