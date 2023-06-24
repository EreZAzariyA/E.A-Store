import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { AuthActions } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";


export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(AuthActions.logout());
    navigate('/', {replace: true})
  }, [dispatch]);
}