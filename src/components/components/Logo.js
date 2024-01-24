import { useNavigate } from "react-router";


export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo" onClick={() => navigate('/')}>
      <span>E.A-Store</span>
    </div>
  );
};