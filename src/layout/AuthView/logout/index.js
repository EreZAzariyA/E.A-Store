import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { AuthActions } from "../../../redux/actions";


export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.logout());
  }, [dispatch]);
}